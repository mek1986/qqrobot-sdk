package de.honoka.qqrobot.spring.boot.starter.framework.mirai;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sobte.cqp.jcq.message.ActionCode;
import com.sobte.cqp.jcq.message.CoolQCode;
import de.honoka.qqrobot.framework.Framework;
import de.honoka.qqrobot.framework.Robot;
import de.honoka.qqrobot.spring.boot.starter.framework.mirai.property.MiraiProperties;
import de.honoka.qqrobot.spring.boot.starter.property.RobotBasicProperties;
import de.honoka.sdk.util.file.FileUtils;
import de.honoka.sdk.util.text.TextUtils;
import lombok.SneakyThrows;
import net.mamoe.mirai.Bot;
import net.mamoe.mirai.BotFactory;
import net.mamoe.mirai.contact.Contact;
import net.mamoe.mirai.contact.Group;
import net.mamoe.mirai.event.ListenerHost;
import net.mamoe.mirai.message.MessageReceipt;
import net.mamoe.mirai.message.data.*;
import net.mamoe.mirai.utils.BotConfiguration;
import net.mamoe.mirai.utils.ExternalResource;
import org.jsoup.Jsoup;

import java.io.File;
import java.io.InputStream;
import java.nio.file.FileSystems;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static com.sobte.cqp.jcq.event.JcqApp.CC;

/**
 * 使用mirai框架中提供的接口实现基本框架
 */
public class MiraiFramework extends Framework {

    public RobotBasicProperties basicProperties;

    public MiraiProperties miraiProperties;

    public MiraiFramework(Robot robot, RobotBasicProperties basicProperties,
                          MiraiProperties miraiProperties) {
        super(robot);
        this.basicProperties = basicProperties;
        this.miraiProperties = miraiProperties;
        init();
    }

    /**
     * 提供登录账号，获取信息，发送信息等服务的对象
     */
    public Bot miraiApi;

    /**
     * 事件监听器
     */
    protected List<ListenerHost> listeners = new ArrayList<>();

    public void addListener(ListenerHost listener) {
        listeners.add(listener);
    }

    /**
     * 获取配置对象中的信息，构建框架
     */
    public void init() {
        long qq = basicProperties.getQq();
        String password = basicProperties.getPassword();
        boolean redirectLogs = miraiProperties.getRedirectLogs();
        //修改配置
        BotConfiguration conf = BotConfiguration.getDefault();
        //转移日志存放目录，设置设备信息
        //定义设备信息文件路径，与存放日志的目录路径
        String deviceInfoPath = FileSystems.getDefault().getPath(FileUtils.getClasspath(),
                miraiProperties.getWorkDirectory(), "deviceInfo.json").toString();
        String logBase = FileSystems.getDefault().getPath(FileUtils.getClasspath(),
                miraiProperties.getWorkDirectory(), "log") + File.separator;
        File botLogDir = new File(logBase + "bot");
        File networkLogDir = new File(logBase + "network");
        //检查文件与目录是否存在，不存在则创建
        //FileUtils.checkFiles(deviceInfo);
        FileUtils.checkOrMkdirs(botLogDir, networkLogDir);
        //利用这些文件和目录修改配置
        //conf.loadDeviceInfoJson(FileUtils.textFileToStr(deviceInfo));
        conf.fileBasedDeviceInfo(deviceInfoPath);
        if(redirectLogs) {
            conf.redirectBotLogToDirectory(botLogDir);
            conf.redirectNetworkLogToDirectory(networkLogDir);
        }
        //网络设置
        setProtocol(conf, miraiProperties.getProtocol());
        //conf.setHeartbeatPeriodMillis(20 * 1000);
        //构建框架
        miraiApi = BotFactory.INSTANCE.newBot(qq, password, conf);
    }

    /**
     * 为框架配置设置登录协议
     */
    public void setProtocol(BotConfiguration conf, String protocolName) {
        BotConfiguration.MiraiProtocol protocol;
        switch(protocolName) {
            case "android_pad":
                protocol = BotConfiguration.MiraiProtocol.ANDROID_PAD;
                break;
            case "android_phone":
                protocol = BotConfiguration.MiraiProtocol.ANDROID_PHONE;
                break;
            case "android_watch":
                protocol = BotConfiguration.MiraiProtocol.ANDROID_WATCH;
                break;
            case "ipad":
                protocol = BotConfiguration.MiraiProtocol.IPAD;
                break;
            case "macos":
                protocol = BotConfiguration.MiraiProtocol.MACOS;
                break;
            default:
                throw new RuntimeException("Unknown protocol: " + protocolName);
        }
        conf.setProtocol(protocol);
    }

    //以下是使用mirai平台对标准框架方法的实现

    /**
     * 启动框架，登录账号，对接消息处理的回调方法（延迟注入事件监听器）
     */
    @Override
    public void boot() {
        miraiApi.login();
        //默认监听器
        addListener(new MiraiEventListener(this));
        //设置监听
        for(ListenerHost listener : listeners) {
            miraiApi.getEventChannel().registerListenerHost(listener);
        }
        robot.onStartup();
    }

    @Override
    public void stop() {
        miraiApi.close(null);
        robot.onShutdown();
    }

    @Override
    public void reboot() {
        miraiApi.login();
    }

    /**
     * 返回值为数组，0号位为messageChain，1号位为要关闭的资源集合
     */
    @Override
    public Object transform(Long group, long qq, String str) {
        MessageChainBuilder builder = new MessageChainBuilder();
        List<String> parts = splitMessage(str);
        List<ExternalResource> externalResources = new ArrayList<>();
        for(String part : parts) {
            //判断此部分消息是否是CQ码，若不是，则直接添加
            if(!part.contains("[CQ:")) {
                builder.add(part);
                continue;
            }
            //识别CQ码，根据它的功能进行对应处理
            CoolQCode cqCode = CC.analysis(part);
            ActionCode actionCode = cqCode.get(0);
            switch(actionCode.getAction()) {
                case "at":
                    if(group == null) break;
                    long atQQ = Long.parseLong(actionCode.get("qq"));
                    //builder.add("@");
                    builder.add(new At(atQQ));
                    break;
                case "image":
                    File imgFile = new File(actionCode.get("file"));
                    if(!imgFile.exists()) break;    //文件不存在，不予添加
                    ExternalResource imgRes = ExternalResource.create(imgFile);
                    externalResources.add(imgRes);
                    //判断是否是私聊消息，以判断通过何种途径上传文件
                    Image img;
                    if(group == null) {
                        img = Objects.requireNonNull(getPrivateContact(qq))
                                .uploadImage(imgRes);
                    } else {
                        img = Objects.requireNonNull(miraiApi.getGroup(group))
                                .uploadImage(imgRes);
                    }
                    builder.add(img);
                    break;
                default:
                    //无法识别的CQ码，直接添加
                    builder.add(part);
                    break;
            }
        }
        return new Object[] { builder.build(), externalResources };
    }

    @Override
    public String transform(Object multiPartMsg) {
        MessageChain miraiMultiPartMsg = (MessageChain) multiPartMsg;
        StringBuilder str = new StringBuilder();
        for(SingleMessage sm : miraiMultiPartMsg) {
            if(sm.getClass().equals(At.class))
                str.append(CC.at(((At) sm).getTarget()));
            else
                str.append(sm.contentToString());
        }
        return str.toString();
    }

    @SuppressWarnings("unchecked")
    private void sendMessage(Contact contact, Object[] msgAndRes) {
        MessageChain msg = (MessageChain) msgAndRes[0];
        List<ExternalResource> externalResources =
                (List<ExternalResource>) msgAndRes[1];
        DateFormat dateFormat = TextUtils.getSimpleDateFormat();
        //当消息未成功发送时多次尝试
        for(int tryTimes = 0; tryTimes < 3; tryTimes++) {
            //尝试发送
            try {
                contact.sendMessage(msg);
            } catch(Exception e) {
                //未发送成功，重试
                //报告错误
                System.err.println(dateFormat.format(new Date()));
                System.err.println("消息发送失败！已尝试次数：" + (tryTimes + 1));
                System.err.println("要发送的内容：\n" + msg.contentToString());
                e.printStackTrace();
                //是否需要重发
                if(!miraiProperties.getResendOnSendFailed()) break;
                continue;
            }
            //发送成功，不再继续尝试
            //若非第一次尝试发送
            if(tryTimes > 0) {
                System.out.println(dateFormat.format(new Date()));
                System.out.println("消息重发成功：\n" + msg.contentToString());
            }
            break;
        }
        //关闭资源
        for(ExternalResource res : externalResources) {
            try {
                res.close();
            } catch(Throwable t) {
                //ignore
            }
        }
    }

    @Override
    public void sendPrivateMsg(long qq, String msg) {
        //查找此用户
        Contact contact = getPrivateContact(qq);
        //若不存在，不予发送
        if(contact == null) return;
        //发送消息
        Object[] msgAndRes = (Object[]) transform(null, qq, msg);
        sendMessage(contact, msgAndRes);
    }

    @Override
    public void sendGroupMsg(Long group, String msg) {
        //若群对象不存在，不予发送
        Group groupObj = miraiApi.getGroup(group);
        if(groupObj == null) return;
        //机器人在该群被禁言，不予发送
        if(isMuted(group)) return;
        //发送消息
        Object[] msgAndRes = (Object[]) transform(group, 0, msg);
        sendMessage(groupObj, msgAndRes);
    }

    @SneakyThrows
    @Override
    public void sendFileToGroup(Long group, String fileName,
                                InputStream inputStream) {
        //若群对象不存在，不予发送
        Group groupObj = miraiApi.getGroup(group);
        if(groupObj == null) return;
        //机器人在该群被禁言，不予发送
        if(isMuted(group)) return;
        //发送消息
        try(ExternalResource res = ExternalResource.create(inputStream)) {
            groupObj.getFiles().uploadNewFile(fileName, res);
        }
    }

    @Override
    public void reply(Long group, long qq, String msg) {
        if(group == null)
            sendPrivateMsg(qq, msg);
        else {
            msg = CC.at(qq) + "\n" + msg;
            sendGroupMsg(group, msg);
        }
    }

    /**
     * 获取一个私聊联系方式，若用户在好友列表中，则返回好友对象，在群内则
     * 返回群成员，均不在返回null
     */
    private Contact getPrivateContact(long qq) {
        //查找此用户
        //查看是否在好友列表中
        Contact contact = miraiApi.getFriends().get(qq);
        if(contact != null) return contact;
        //若不在，遍历机器人所加的每个群，查找可用的群成员
        for(Group group : miraiApi.getGroups()) {
            //群中不存在此用户，查看下一个群
            if(!group.contains(qq)) continue;
            //存在则返回
            return group.get(qq);
        }
        //所有的群都不存在，则返回null
        return null;
    }

    @Override
    public String getGroupName(Long group) {
        try {
            if(group == null)
                return "【私聊消息】";
            return Objects.requireNonNull(miraiApi.getGroup(group)).getName();
        } catch(Exception e) {
            return "未知";
        }
    }

    @Override
    public synchronized String getNickOrCard(Long group, long qq) {
        try {
            String nameCard = Objects.requireNonNull(Objects.requireNonNull(
                    miraiApi.getGroup(group)).get(qq)).getNameCard();
            //群名片为空串，代表没有设置群名片
            if(nameCard.trim().equals(""))
                nameCard = Objects.requireNonNull(Objects.requireNonNull(miraiApi
                        .getGroup(group)).get(qq)).getNick();
            return nameCard;
        } catch(Exception e) {
            return getStrangerNick(qq);
        }
    }

    /**
     * 调用第三方API，获取非好友的的昵称（可能需要随时更新此方法）
     */
    public static String getStrangerNick(long qq) {
        try {
            //定义接口URL
            String url = "https://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg" +
                    "?uins=%d";
            //获取响应文本（不得请求时间过长，否则会卡住很多操作）
            byte[] response = Jsoup.connect(String.format(url, qq))
                    .timeout(5 * 1000).execute().bodyAsBytes();
            String jsonStr = new String(response, "GB18030");
            //处理响应文本
            jsonStr = jsonStr.substring(jsonStr.indexOf("{"),
                    jsonStr.lastIndexOf("}") + 1);
            //提取为Json对象
            JsonObject json = JsonParser.parseString(jsonStr).getAsJsonObject();
            //从Json对象中提取某个属性的值
            JsonArray ja = json.get(String.valueOf(qq)).getAsJsonArray();
            return ja.get(6).getAsString();
        } catch(Exception e) {
            return String.valueOf(qq);
        }
    }

    @Override
    public boolean isMuted(Long group) {
        try {
            return Objects.requireNonNull(miraiApi.getGroup(group))
                    .getBotMuteRemaining() > 0;
        } catch(Exception e) {
            return true;    //机器人不在群中，无法发言，默认被禁言
        }
    }

    /**
     * 发送测试消息
     */
    public boolean sendTestMessageOnRelogin() {
        //未配置开发群，默认测试消息发送成功
        if(basicProperties.getDevelopingGroup() == null) return true;
        //发送测试消息
        MessageReceipt<?> receipt = null;
        try {
            receipt = Objects.requireNonNull(miraiApi.getGroup(basicProperties
                    .getDevelopingGroup()))
                    .sendMessage(new SimpleDateFormat("HH:mm:ss")
                            .format(new Date()) + "\n平台重新登录");
        } catch(Throwable ex) {
            //none
        }
        return receipt != null;
    }
}
