(()=>{"use strict";var e,t={5221:(e,t,s)=>{var n=s(341),a=s(6229),l=s(2502);const o={class:"main"},i=(0,a._)("h3",{style:{"margin-top":"0"}},"QQ Robot Tester",-1),r={class:"input-container"},c=(0,a._)("span",{class:"label"},"账号：",-1),d={class:"input-container"},g=(0,a._)("span",{class:"label"},"用户名：",-1),u=(0,a.Uk)(" 连接 "),m=(0,a.Uk)(" 断开 "),p={class:"margin-top"},h={class:"margin-top",style:{display:"flex"}},b=(0,a._)("div",{class:"label",style:{"white-space":"nowrap"}},"当前在线：",-1),f={key:0,class:"label"},w={style:{display:"flex"}},k={class:"label online-user"},v=(0,a.Uk)("   ");const y=e=>((0,a.dD)("data-v-8bf0bafa"),e=e(),(0,a.Cn)(),e),_={class:"right"},M={class:"label"},W={class:"content"},D=y((()=>(0,a._)("div",{class:"triangle-containter"},[(0,a._)("div",{class:"triangle"}),(0,a._)("div",{class:"triangle-cover"})],-1))),q=y((()=>(0,a._)("div",{class:"triangle-cover2"},null,-1)));const x={name:"OppositeMessage",props:{name:""}};var T=s(6021);const $=(0,T.Z)(x,[["render",function(e,t,s,n,o,i){const r=(0,a.up)("el-avatar");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a.Wm)(r,{class:"avatar",shape:"circle",src:"./static/avatar.png"}),(0,a._)("div",_,[(0,a._)("span",M,(0,l.zw)(s.name),1),(0,a._)("div",W,[(0,a.WI)(e.$slots,"default",{},void 0,!0)]),D,q])])}],["__scopeId","data-v-8bf0bafa"]]),O={style:{"text-align":"right"}},S={class:"left"},C={class:"label"},I={class:"content"},j=(e=>((0,a.dD)("data-v-972b6514"),e=e(),(0,a.Cn)(),e))((()=>(0,a._)("div",{class:"triangle-containter"},[(0,a._)("div",{class:"triangle"})],-1)));const A={name:"MyMessage",props:{name:""}},H=(0,T.Z)(A,[["render",function(e,t,s,n,o,i){const r=(0,a.up)("el-avatar");return(0,a.wg)(),(0,a.iD)("div",O,[(0,a._)("div",S,[(0,a._)("span",C,(0,l.zw)(s.name),1),(0,a._)("div",I,[(0,a.WI)(e.$slots,"default",{},void 0,!0)]),j]),(0,a.Wm)(r,{class:"avatar",shape:"circle",src:"./static/avatar.png"})])}],["__scopeId","data-v-972b6514"]]);var L=s(4284);const U={alert(e,t){(0,L.z8)({message:e,type:t})},success(e){this.alert(e,"success")},error(e){this.alert(e,"error")},info(e){this.alert(e,void 0)}},K={style:{"text-align":"center"}},V={class:"info"};const P={name:"SystemInfo"},z=(0,T.Z)(P,[["render",function(e,t,s,n,l,o){return(0,a.wg)(),(0,a.iD)("div",K,[(0,a._)("span",V,[(0,a.WI)(e.$slots,"default",{},void 0,!0)])])}],["__scopeId","data-v-c7d6fb90"]]);var E=s(2343);const Z="login",F="user_logout",N="new_user_login",Q="query_online",Y="group_message",J="private_message",R={class:"label"},B={class:"message-container"},G={class:"message-list-content",ref:"message-list-content"},X={class:"message"},ee={key:0,class:"message-part"},te=["innerHTML"],se={key:1},ne={key:0,class:"message-part"},ae=["innerHTML"],le={key:1},oe=["innerHTML"],ie={class:"message-footer"},re=(0,a.Uk)(" 发送 ");const ce="text",de="at";const ge={name:"MessageContainer",components:{MyMessage:H,OppositeMessage:$,SystemInfo:z,IconPicture:s(8103).tap},props:{label:null,messageType:null,name:null,websocket:null,connected:!1,sendWebSocketMessage:null,online:null},data:()=>({input:null,sending:!1,messageList:(0,E.qj)([]),noEndWrapFormatter:e=>e.replace(/\n$/g,"")}),methods:{scrollToEnd(){setTimeout((()=>{let e=this.$refs["message-list"],t=this.$refs["message-list-content"];e.setScrollTop(t.scrollHeight+100)}),100)},sendMessage(){let e=this.input;if(null==e||""===e)return;if(null==this.websocket)return;this.sending=!0;let t=[],s=/@[^@\s]+\s/g,n=e.split(s),a=e.match(s);for(let e=0;e<n.length;e++)if(null!=n[e]&&""!==n[e]&&t.push({type:ce,content:n[e]}),null!=a&&e<a.length){let s=this.findInOnline(a[e].substring(1,a[e].length-1)).data.qq;t.push({type:de,content:a[e],extras:{qq:s}})}this.sendWebSocketMessage({type:this.messageType,data:{content:t}},(e=>{!0===e.data.status&&(this.sending=!1,this.input="",this.messageListAppend({name:this.name,content:t}))}),(()=>{this.sending=!1}))},messageListAppend(e){e.name===this.name?e.isMine=!0:null!=e.name&&(e.isMine=!1),this.messageList.push(e),this.scrollToEnd()},translateToHtml:e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/ /g,"&nbsp;").replace(/\n/g,"<br />"),getImagePath:e=>"./image?name="+e,findInOnline(e){for(let t of this.online)if(t.name===e)return t;return null}}},ue={isEmptyObject(e){let t=0;for(let s in e)t++;return 0===t},getAbsoluteUrl(e){let t=document.createElement("a");return t.href=e,t.href},getWebsocketAbsoluteUrl(e){return(e=this.getAbsoluteUrl(e)).replace(/https?:\/\//g,"ws://")}},me={name:"index",components:{MessageContainer:(0,T.Z)(ge,[["render",function(e,t,s,o,i,r){const c=(0,a.up)("el-image"),d=(0,a.up)("my-message"),g=(0,a.up)("opposite-message"),u=(0,a.up)("system-info"),m=(0,a.up)("el-scrollbar"),p=(0,a.up)("el-input"),h=(0,a.up)("el-button");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("span",R,(0,l.zw)(s.label),1),(0,a._)("div",B,[(0,a.Wm)(m,{class:"message-list",ref:"message-list"},{default:(0,a.w5)((()=>[(0,a._)("div",G,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.messageList,(e=>((0,a.wg)(),(0,a.iD)("div",X,[!0===e.isMine?((0,a.wg)(),(0,a.j4)(d,{key:0,name:e.name},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.content,(e=>((0,a.wg)(),(0,a.iD)("span",null,["\n"!==e.content?((0,a.wg)(),(0,a.iD)("div",ee,["image"===e.type?((0,a.wg)(),(0,a.j4)(c,{key:0,src:r.getImagePath(e.content),"preview-src-list":[r.getImagePath(e.content)],fit:"scale-down"},null,8,["src","preview-src-list"])):((0,a.wg)(),(0,a.iD)("span",{key:1,innerHTML:r.translateToHtml(e.content)},null,8,te))])):((0,a.wg)(),(0,a.iD)("br",se))])))),256))])),_:2},1032,["name"])):!1===e.isMine?((0,a.wg)(),(0,a.j4)(g,{key:1,name:e.name},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.content,(e=>((0,a.wg)(),(0,a.iD)("span",null,["\n"!==e.content?((0,a.wg)(),(0,a.iD)("div",ne,["image"===e.type?((0,a.wg)(),(0,a.j4)(c,{key:0,src:r.getImagePath(e.content),"preview-src-list":[r.getImagePath(e.content)],fit:"scale-down"},null,8,["src","preview-src-list"])):((0,a.wg)(),(0,a.iD)("span",{key:1,innerHTML:r.translateToHtml(e.content)},null,8,ae))])):((0,a.wg)(),(0,a.iD)("br",le))])))),256))])),_:2},1032,["name"])):((0,a.wg)(),(0,a.j4)(u,{key:2},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.content,(e=>((0,a.wg)(),(0,a.iD)("span",{innerHTML:r.translateToHtml(e.content)},null,8,oe)))),256))])),_:2},1024))])))),256))],512)])),_:1},512),(0,a.Wm)(m,{class:"message-input"},{default:(0,a.w5)((()=>[(0,a.Wm)(p,{type:"textarea",modelValue:i.input,"onUpdate:modelValue":t[0]||(t[0]=e=>i.input=e),placeholder:"回复",autosize:{minRows:7},rows:5,formatter:i.noEndWrapFormatter,onKeydown:t[1]||(t[1]=(0,n.D2)((e=>r.sendMessage()),["enter"])),resize:"none"},null,8,["modelValue","formatter"])])),_:1}),(0,a._)("div",ie,[(0,a.Wm)(h,{onClick:t[2]||(t[2]=e=>r.sendMessage()),disabled:!s.connected||null==i.input||""===i.input,loading:i.sending},{default:(0,a.w5)((()=>[re])),_:1},8,["disabled","loading"])])])])}]]),SystemInfo:z,OppositeMessage:$,MyMessage:H},data:()=>({form:{qq:12345,name:"abcde"},status:{connected:!1,connecting:!1,disconnecting:!1},messageType:{group:Y,private:J},numberFormatter:e=>e.replace(/\D/g,""),serverUrl:"./server",websocket:null,websocketMessageCallback:{},online:(0,E.qj)([])}),methods:{connect(){if(this.checkQqAndName()){this.status.connecting=!0;try{this.createWebsoket()}catch(e){this.status.connecting=!1,U.error("连接失败"),console.error(e)}}else U.error("账号和用户名不能为空")},disconnect(){this.status.disconnecting=!0,this.websocket.close()},createWebsoket(){let e=ue.getWebsocketAbsoluteUrl(this.serverUrl);this.websocket=new WebSocket(e),this.websocket.onopen=()=>{this.login()},this.websocket.onmessage=e=>{let t=JSON.parse(e.data);console.log("WebSocket接收：",t),null!=t.id?(this.websocketMessageCallback[t.id](t),delete this.websocketMessageCallback[t.id]):this.exexuteWebSocketMessage(t)},this.websocket.onerror=e=>{console.log("WebSocket错误：",e)},this.websocket.onclose=e=>{U.info("连接已断开"),this.websocket=null,this.status.connected=!1,this.status.connecting=!1,this.status.disconnecting=!1,this.online=(0,E.qj)([]);let t=this.$refs["group-message-container"],s=this.$refs["private-message-container"];t.messageListAppend({name:null,content:[{type:"text",content:"连接已断开"}]}),t.sending=!1,s.sending=!1}},sendWebSocketMessage(e,t,s){e.id=crypto.randomUUID();try{null!=t&&(this.websocketMessageCallback[e.id]=t);let s=JSON.stringify(e);this.websocket.send(s),console.log("WebSocket发送：",e)}catch(t){console.error(t),console.error("WebSocket发送失败：",e),delete this.websocketMessageCallback[e.id],null!=s&&s()}},exexuteWebSocketMessage(e){switch(e.type){case N:e.data.name!==this.form.name&&(this.online.push(e.data),this.$refs["group-message-container"].messageListAppend({name:null,content:[{type:"text",content:`${e.data.name}(${e.data.qq})加入会话`}]}));break;case F:let t=-1;for(let s=0;s<this.online.length;s++){if(this.online[s].name===e.data.name){t=s;break}}if(-1!==t){let e=this.online[t];this.$refs["group-message-container"].messageListAppend({name:null,content:[{type:"text",content:`${e.name}(${e.data.qq})已离开`}]}),this.online.splice(t,1)}break;case Y:this.$refs["group-message-container"].messageListAppend(e.data);break;case J:this.$refs["private-message-container"].messageListAppend(e.data)}},login(){this.status.connecting=!0,this.sendWebSocketMessage({type:Z,data:this.form},(e=>{this.status.connecting=!1;let t=e.data;!0===t.status?(U.success("连接成功"),this.status.connected=!0,this.queryOnline()):U.error(t.message)}),(()=>{this.status.connecting=!1}))},queryOnline(){this.sendWebSocketMessage({type:Q},(e=>{this.online=(0,E.qj)(e.data.online)}))},appendAt(e){let t=this.$refs["group-message-container"].input;null==t?t=`@${e} `:t+=`@${e} `,this.$refs["group-message-container"].input=t},checkQqAndName(){let e=[this.form.qq,this.form.name];for(let t of e)if(null==t||""===t)return!1;return!0}}},pe=(0,T.Z)(me,[["render",function(e,t,s,y,_,M){const W=(0,a.up)("el-input"),D=(0,a.up)("el-button"),q=(0,a.up)("message-container"),x=(0,a.up)("el-col"),T=(0,a.up)("el-row"),$=(0,a.up)("el-link"),O=(0,a.up)("el-scrollbar");return(0,a.wg)(),(0,a.iD)("div",o,[i,(0,a._)("div",r,[c,(0,a.Wm)(W,{class:"input",modelValue:_.form.qq,"onUpdate:modelValue":t[0]||(t[0]=e=>_.form.qq=e),modelModifiers:{number:!0},clearable:!0,formatter:_.numberFormatter,disabled:_.status.connected,onKeydown:(0,n.D2)(M.connect,["enter"]),maxlength:"10"},null,8,["modelValue","formatter","disabled","onKeydown"])]),(0,a._)("div",d,[g,(0,a.Wm)(W,{class:"input",modelValue:_.form.name,"onUpdate:modelValue":t[1]||(t[1]=e=>_.form.name=e),clearable:!0,disabled:_.status.connected,onKeydown:(0,n.D2)(M.connect,["enter"]),maxlength:"10"},null,8,["modelValue","disabled","onKeydown"])]),(0,a.Wm)(D,{onClick:M.connect,loading:_.status.connecting,disabled:_.status.connected||!M.checkQqAndName()},{default:(0,a.w5)((()=>[u])),_:1},8,["onClick","loading","disabled"]),(0,a.Wm)(D,{onClick:M.disconnect,loading:_.status.disconnecting,disabled:!_.status.connected},{default:(0,a.w5)((()=>[m])),_:1},8,["onClick","loading","disabled"]),(0,a._)("div",p,[(0,a.Wm)(T,{gutter:12},{default:(0,a.w5)((()=>[(0,a.Wm)(x,{span:12},{default:(0,a.w5)((()=>[(0,a.Wm)(q,{ref:"group-message-container",label:"群聊消息：","message-type":_.messageType.group,name:_.form.name,websocket:_.websocket,connected:_.status.connected,online:_.online,"send-web-socket-message":M.sendWebSocketMessage},null,8,["message-type","name","websocket","connected","online","send-web-socket-message"])])),_:1}),(0,a.Wm)(x,{span:12},{default:(0,a.w5)((()=>[(0,a.Wm)(q,{ref:"private-message-container",label:"私聊消息：","message-type":_.messageType.private,name:_.form.name,websocket:_.websocket,connected:_.status.connected,online:_.online,"send-web-socket-message":M.sendWebSocketMessage},null,8,["message-type","name","websocket","connected","online","send-web-socket-message"])])),_:1})])),_:1})]),(0,a._)("div",h,[b,_.online.length<=0?((0,a.wg)(),(0,a.iD)("div",f,"无")):((0,a.wg)(),(0,a.j4)(O,{key:1,class:"online-container"},{default:(0,a.w5)((()=>[(0,a._)("div",w,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(_.online,(e=>((0,a.wg)(),(0,a.iD)("span",k,[(0,a.Wm)($,{type:"primary",onClick:t=>M.appendAt(e.name)},{default:(0,a.w5)((()=>[(0,a.Uk)((0,l.zw)(`${e.name}(${e.data.qq})`),1)])),_:2},1032,["onClick"]),v])))),256))])])),_:1}))])])}]]);var he=s(8912);s(2297);(0,n.ri)(pe).use(he.Z).mount("#app")}},s={};function n(e){var a=s[e];if(void 0!==a)return a.exports;var l=s[e]={exports:{}};return t[e].call(l.exports,l,l.exports,n),l.exports}n.m=t,e=[],n.O=(t,s,a,l)=>{if(!s){var o=1/0;for(d=0;d<e.length;d++){for(var[s,a,l]=e[d],i=!0,r=0;r<s.length;r++)(!1&l||o>=l)&&Object.keys(n.O).every((e=>n.O[e](s[r])))?s.splice(r--,1):(i=!1,l<o&&(o=l));if(i){e.splice(d--,1);var c=a();void 0!==c&&(t=c)}}return t}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[s,a,l]},n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0};n.O.j=t=>0===e[t];var t=(t,s)=>{var a,l,[o,i,r]=s,c=0;if(o.some((t=>0!==e[t]))){for(a in i)n.o(i,a)&&(n.m[a]=i[a]);if(r)var d=r(n)}for(t&&t(s);c<o.length;c++)l=o[c],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(d)},s=self.webpackChunk=self.webpackChunk||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var a=n.O(void 0,[125],(()=>n(5221)));a=n.O(a)})();