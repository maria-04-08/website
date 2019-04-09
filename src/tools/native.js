/**
 * ios 传参只允许传1个值，
 * 类型必须为 Number, String, Date, Array, jsonString, Null, Boolean
 */
const alsj = {
  pf: getPF(),
  native: utils.urlToObj().native, // android || ios
  ios(name, param) {
    window.webkit.messageHandlers[name].postMessage(param);
  },
  // 查看大图
  getImage(imgUrl) {
    this.pf === 'ios' ?
      window.webkit.messageHandlers.getImage.postMessage(imgUrl) :
      androidJs.getImage(imgUrl);
  },
  //调原生分享，传参数{"icon" : "图标","title" : "标题","desc" : "描述","link" : "分享链接","type" : "0:微信、1:朋友圈、2:qq"}
  getShare(obj) {
    this.pf === 'ios' ?
      window.webkit.messageHandlers.share.postMessage(obj) :
      androidJs.share(JSON.stringify(obj));
  },
  //need (0:需要返回值，1：不需要)  安卓统一调用
  //type (1:获取token; 2:显示右边按钮，回调js,如2-保存-save;3：显示右边按钮实例，打开url,如1-说明-http...；4:获取用户昵称；5：启动聊天；6：保存图片，如6-url；7：打开民生app(7-0:不做支付，7-1做支付)；)
  invoke(type, need) {
    if (need == 0) {
      return androidJs.invoke(type);
    }
    androidJs.invoke(type);
  },
  openNativePage(obj){
  	this.pf === 'ios' ? window.webkit.messageHandlers.openNativePage.postMessage(obj) : androidJs.openNativePage(JSON.stringify(obj));
  },
  /**
   * 原生返回上一页
   */
  goBack() {
    vm.$toast(this.pf)
    if (this.pf == 'ios') {
      window.webkit.messageHandlers.goBack.postMessage(1);
    }
  },
  /**
   * 调用原生聊天
   * target: 聊天目标 值为id，不传则打开客服
   */
  //
  toTalk(target) {
    if (this.native == 1) {
      let talkTarget = target ? `5-${target.toString()}` : 5;
      this.invoke(talkTarget, 1);
    } else if (this.native == 2) {
      this.contactCustom(1);
    }
  },
  /**
   * 打开新的webview
   * @param {Object} {
   *  title: '',
   *  url: ''
   * }
   * @return {[type]} [description]
   */
  // 关闭当前webview
  openWebview(params) {
    if (this.pf === 'ios') {
      window.webkit.messageHandlers.openWebview.postMessage(JSON.parse(JSON.stringify(params)));
    }
  },
  //获取原生安卓的token
  getAndroidToken() {
    return androidJs.invoke(1);
  },
  contactCustom(val){
  	window.webkit.messageHandlers.chatWithCustomerService.postMessage(val);
  },
  showShareBtn(val){
  	window.webkit.messageHandlers.isShare.postMessage(val);
  },
  showRightIcon(val){
  	window.webkit.messageHandlers.showIcon.postMessage(val);
  },
  getSysMsg(){
  	var sys = '';
  	if(this.pf === 'ios'){
  		sys = 'ios';
  	}else{
  		sys = 'andriod'
  	}
  	return sys;
  },
  andriodShare(obj,type){
  	//type是1---显示右上角分享
  	//type是2---直接显示弹窗
  	androidJs.shareNactive(obj,type);
  },
  /**
   * 初始化原生分享
   * 对于安卓，直接调用其初始化分享
   * 对于ios，调用显示分享按钮
   * @param {[Object]} params 分享参数，供安卓使用 {title, icon, desc, link}
   * @return {[type]} [description]
   */
  initNativeShare(params) {
    this.pf === 'ios' ?
      this.showShareBtn(1) :
      this.andriodShare(JSON.stringify(params), 1)
  },
  /**
   * 唤醒app，若未下载则跳转下载
   * @param  {[Number]} device [设备编号 1安卓，2ios]
   * @return {[type]}   无     [description]
   */
  rouseSellerApp(device) {
    this.pf === 'ios' ?
      window.webkit.messageHandlers.forwardMerchantApp.postMessage(1) :
      this.invoke(10);
  },
  /**
  * 原生跳转登录
  * @param  {[Number]} device [设备编号 1安卓，2ios]
  * @return {[type]}   无     [description]
   */
  reLogin() {
    this.pf === 'ios' ?
      window.webkit.messageHandlers.reLogin.postMessage(1) :
      androidJs.reLogin();
  },
  /**
   * 用于产品详情
   * 传递当前文档高度给ios
   * @param {[Number]} height 当前文档高度
   * @return {[type]}   无     [description]
   */
  sendDocumentHeightForIos(height) {
    if (this.pf === 'ios') {
      window.webkit.messageHandlers.sendDocumentHeightForIos.postMessage(height);
    } 
  },
  /**
   * 保存图片
   * @param {String} path
   */
  saveImg(path) {
    this.pf === 'ios' ?
      this.ios('savePhoto', path) :
      this.invoke(`6-${path}`, 1)
  }
}
