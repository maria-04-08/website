var _devNew = 'https://test.alasga.cn/gateway/api'; //测试环境
var _pro = `${window.location.protocol}//www.alasga.cn/gateway/api`; //正式环境
var _coupon_dev = 'https://test.alasga.cn/coupon/api'; // 优惠券模块 测试环境
var _coupon_pro = `${window.location.protocol}//www.alasga.cn/coupon/api`; // 优惠券模块 正式环境

var _ROOT_PATH = `${window.location.origin}/dev/pages`
var _Lij = 'http://192.168.2.120:8080/gateway/api'; // 李璟
var _LH_Coupon = 'http://192.168.2.46:9113/api'; //罗宏
var _LH_jiaLe = 'http://192.168.2.188:8080/gateway/api'; //家乐
var API_ENV = '/api';
var COUPON_ENV = '/coupon/api'; // 优惠券相关模块
var QINIU_IMG_ROOT = 'http://test.pic.alasga.cn/'; // 七牛图片前缀
var _key = 'x18ywvqfxb3ec';
var iconImg = 'http://pic.alasga.cn/logo-300.jpg'; //统一分享的icon图标
switch (window.location.host) {
  case "www.alasga.cn":
    API_ENV = _pro;
    _key = 'x4vkb1qpxfltk';
    COUPON_ENV = _coupon_pro;
    _ROOT_PATH = `${window.location.protocol}//www.alasga.cn/h5/app/web/pages`;
    QINIU_IMG_ROOT = 'http://pic.alasga.cn/';
    break;
  case "test.alasga.cn":
    API_ENV = _devNew;
    COUPON_ENV = _coupon_dev;
    _ROOT_PATH = 'https://test.alasga.cn/pro/proxy/web/web/pages';
    break;
}
//share的链接
//var shareLink = 'https://test.alasga.cn/alasga-web/share/';   //测试环境
var shareLink = 'https://www.alasga.cn/share/'; //测试环境

var API = {
  appKey: _key, //正式，测试的appKey(x18ywvqfxb3ec)

  // 获取 登录验证码
  getLoginCaptCha: '/user/getLoginCaptcha',
  //城市合伙人申请提交
  agentApply:'/agent/apply',
	//首页banner(66：banner图，67私家头条)
  listByOriginId:'/promote/listByOriginId',
  // 广告详情
  getAdDetail: '/promote/getContent',
	//首页商家入驻
	saveMerchantWs:'/merchantWs/saveMerchantWs',
	//提交确认额度接口
	submitReckonQuota:'/reckonQuota/save',
	//获取额度接口
	getReckonQuota:'/reckonQuota/acquire',
}
