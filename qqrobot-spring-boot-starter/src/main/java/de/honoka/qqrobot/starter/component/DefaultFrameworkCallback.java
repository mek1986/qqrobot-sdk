package de.honoka.qqrobot.starter.component;

import de.honoka.qqrobot.framework.FrameworkCallback;
import de.honoka.qqrobot.framework.model.RobotMultipartMessage;
import de.honoka.qqrobot.starter.common.ConditionalBeans;
import de.honoka.qqrobot.starter.common.RobotBeanHolder;
import de.honoka.qqrobot.starter.common.annotation.ConditionalComponent;

import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

@ConditionalComponent(ConditionalBeans.class)
public class DefaultFrameworkCallback implements FrameworkCallback {

    protected MessageExecutor messageExecutor;

    protected RobotBeanHolder robotBeanHolder;

    private final ThreadPoolExecutor threadPoolExecutor =
            (ThreadPoolExecutor) Executors.newCachedThreadPool();

    public DefaultFrameworkCallback(MessageExecutor messageExecutor,
                                    RobotBeanHolder robotBeanHolder) {
        this.messageExecutor = messageExecutor;
        this.robotBeanHolder = robotBeanHolder;
    }

    /**
     * 收到私聊消息
     */
    @Override
    public void onPrivateMsg(long qq, RobotMultipartMessage msg) {
        threadPoolExecutor.submit(() -> {
            //回复信息
            RobotMultipartMessage reply = messageExecutor.executeMsg(
                    null, qq, msg);
            if(reply != null) {
                reply.removeEmptyPart();
                if(reply.isEmpty()) return;
                robotBeanHolder.getFramework().reply(null, qq, reply);
            }
        });
    }

    /**
     * 收到群消息
     */
    @Override
    public void onGroupMsg(Long group, long qq, RobotMultipartMessage msg) {
        //若机器人被禁言，则不响应此消息
        if(robotBeanHolder.getFramework().isMuted(group)) return;
        threadPoolExecutor.submit(() -> {
            //回复信息
            RobotMultipartMessage reply = messageExecutor.executeMsg(group, qq, msg);
            if(reply != null) {
                reply.removeEmptyPart();
                if(reply.isEmpty()) return;
                robotBeanHolder.getFramework().reply(group, qq, reply);
            }
        });
    }

    /**
     * 机器人启动
     */
    @Override
    public void onStartup() {}

    /**
     * 机器人关闭
     */
    @Override
    public void onShutdown() {}
}
