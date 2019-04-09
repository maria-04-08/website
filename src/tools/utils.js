
var utils = {
  /**
   * 格式化 Url 参数
   */
  urlToObj() {
    var _url = decodeURI(window.location.search.slice(1));
    var obj = {};

    var urlArr = _url.split('&');
    urlArr.forEach(function(item) {
      var temp = item.split('=');
      obj[temp[0]] = temp[1];
    })
    return obj;
  },
  // 附带参数跳转
  openUrl(path, params) {
    // 首页 特殊对待
    const hasBaseTag = document.querySelector('base');
    let link = '';

    if (!params && !hasBaseTag) return window.location.href = path;

    if (hasBaseTag) {
      const catalog = hasBaseTag.href.split('/home')[0];
      link = path.replace(/^(\.\.\/){1,2}/, '');
      link = `${catalog}/${link}`;
    } else {
      link = path;
    }
    
    params = params || {};
    let data = '?';

    for (let attr in params) {
      data += attr + '=' + params[attr] + '&';
    }

    data = encodeURI(data.slice(0, -1));
    window.location.href = link + data;
  },
  // 复制数组
  copyArr(arr) {
    if (arr.length === 0) return [];
    var newArr = JSON.parse(JSON.stringify(arr));
    return newArr;
  },
  /**
   * 限制输入框输入
   */
  limitInput(text, type, length, regExp) {
    text = text || '';
    if (type) {
      switch (type) {
        case 'number':
          text = text.replace(/\D/g, '');
          break;
        case 'password':
          text = text.replace(/[^\da-zA-Z]/g, '');
          break;
        case 'cn':
          text = text.replace(/[^\u4E00-\u9FA5a-zA-Z\']/g, '');
          break;
        default:
          text = text.replace(regExp, '');
          break;
      }
    }

    if (length) {
      text = text.slice(0, length);
    }
    return text;
  },
  /**
   * 验证正则
   */
  regExpText(text, type, regEpx) {
    let pass = false;
    switch (type) {
      case 'mobile':
        // pass = API_ENV === _product ? /^((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])+\d{8})$/.test(text) : true;
        pass = /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(text);
        break;
      case 'password':
        pass = /^[a-zA-Z\d]{6,12}$/.test(text);
        break;
      case 'email':
      	pass = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(text);
      	break;
      default:
        pass = regEpx ? regEpx.test(text) : false;
        break;
    }
    return pass;
  },
  /**
   * 加密密码
   */
  encryption(password) {
    var key = CryptoJS.enc.Utf8.parse('alasgad980f7467f');
    var iv = CryptoJS.enc.Utf8.parse('alasgad980f7467f');
    return CryptoJS.AES.encrypt(password, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    }).toString();
  },
  /**
   * 设置用户信息
   */
  setUserInfo(data) {
    utils.clearUserInfo();
    let info = JSON.parse(JSON.stringify(data));
    window.sessionStorage.setItem('USER_TOKEN', info.token);
    window.sessionStorage.setItem('USER_INFO', JSON.stringify(info));
    window.sessionStorage.setItem('USER_INFO_EXPIRE', Date.now());
  },
  /**
   * 获取用户信息
   */
  getUserInfo() {
    let info = window.sessionStorage.getItem('USER_INFO');
    return info;
  },
  /**
   * 获取用户token
   */
  getUserToken() {
    let token = window.sessionStorage.getItem('USER_TOKEN') || '';
    return token;
  },
  /**
   * 清除用户信息
   */
  clearUserInfo() {
    window.sessionStorage.removeItem('USER_INFO');
    window.sessionStorage.removeItem('USER_TOKEN');
    window.sessionStorage.removeItem('USER_INFO_EXPIRE');
  },
  /**
   * 登录后的跳转
   */
  loginTo() {
    let from = utils.urlToObj().loginfrom;
    if (from) {
      window.location.href = (`../../pages/${ from }?` + window.location.search.slice(1));
    } else {
      window.location.href = '../../../index.html';
    }
  },
  /**
   * 判断登录状态是否过期
   */
  judgeLoginStatusExpire() {
    let expire = window.sessionStorage.getItem('USER_INFO_EXPIRE');
    let gap = Date.now() - expire * 1;
    let time = gap / (1000 * 60 * 60 * 24);
    return time > 7;
  },
  /**
   * 跳转去登录页
   */
  goLogin() {
    let {
      pathname,
      search
    } = window.location;
    let path = pathname.replace(/\/.*pages\/(.*html)/, '$1');
    let params = search ? `&${ search.slice(1) }` : '';
    window.location.href = `../../pages/login/login.html?loginfrom=${ path }${ params }`;
  },
  /**
   * 判断是否已登录
   * 传入 Vue 实例
   */
  judgeIsLogin(_this) {
    if (!utils.getUserToken()) {
      _this.$toast('您尚未登录，请登录后再试', 800)
        .then(() => {
          this.goLogin();
        })
      return false;
    } else if (this.judgeLoginStatusExpire()) {
      _this.$toast('您的登录状态已过期，请重新登录', 800)
        .then(() => {
          this.goLogin();
        })
    } else {
      return true;
    }
  },
  /**
   * 随机数
   */
  randomNum() {
    let num = parseInt(Math.random() * 10);
    return num;
  },
  /**
   * 防键盘阻挡表单元素
   */
  preventKeyboard() {
    window.addEventListener('resize', function() {
      if (
        document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA'
      ) {
        window.setTimeout(function() {
          if ('scrollIntoView' in document.activeElement) {
            document.activeElement.scrollIntoView(false);
          } else {
            document.activeElement.scrollIntoViewIfNeeded();
          }
        }, 0);
      }
    });
  },
  /**
   * 监听物理返回
   */
  listenerNativeBack(cb) {
    if (window.history && window.history.pushState) {
      window.addEventListener('popstate', () => {
        cb();
      });
      
      window.history.pushState(null, null, null);
    }
  },
  /**
   * 获取定位
   */
  locationStorageMap(cb) {
    var mapDom = document.createElement('div');
    mapDom.style.display = 'none';
    mapDom.id = 'allmap';
    document.querySelector('body').appendChild(mapDom);
    // 百度地图API功能
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 12);

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        window.localStorage.setItem('GET_CURRENT_LOCATION', JSON.stringify(r));
        cb();
      } else {
        utils.locationStorageMap();
      }
    }, {
      enableHighAccuracy: true
    })
  },
  /**
   * 获取当前定位 （无数据时返回值默认珠江新城）
   */
  getPosition() {
    let area = window.localStorage.getItem('GET_CURRENT_LOCATION');
    // 默认 珠江新城
    let position = {
      latitude: '23.1194300000',
      longitude: '113.3212200000'
    };

    if (!area) return this.locationStorageMap(this.getPosition);

    let point = JSON.parse(area).point;
    position.latitude = point.lat;
    position.longitude = point.lng

    return position;
  },
  /**
   * 获取城市相关数据 
   * cityCode
   * cityId
   * @return {Number}
   */
  getCityData(type) {
    const locationStorage = window.localStorage.getItem('GET_CURRENT_LOCATION');
    const config = {
      cityCode: 257,
      cityId: 440100
    }

    if (!locationStorage) return config[type]; // 默认广州

    let cityObj = JSON.parse(locationStorage);
    return cityObj.address[type];
  },
  /**
   * 手动创建loading
   * el: DOM
   */
  createLoading(el) {
    setTimeout(() => {
      let params = {
        renderer: 'svg',
        loop: true,
        autoplay: true,
        container: el,
        animationData: LOADING_CONFIG
      }
      lottie.loadAnimation(params);
    }, 200)
  },
  /**
   * 格式化时间
   */
  formatDate(dateNum) {
    var date = new Date(dateNum);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();

    if (month <= 9) month = "0" + month;
    if (day <= 9) day = "0" + day;
    if (hour <= 9) hour = "0" + hour;
    if (minute <= 9) minute = "0" + minute;
    if (seconds <= 9) seconds = "0" + seconds;

    var time = `${date.getFullYear()}-${ month }-${ day } ${ hour }:${ minute }:${ seconds }`;
    return time;
  },
  /**
   * 格式化时间 - 多久之前
   * 一小时内，显示为xx分钟前
   * 小于24小时，显示为xx小时前
   * 间隔超过24小时，显示：昨天xx：xx
   * 间隔超过48小时，显示：xx月xx日 xx：xx
   * 间隔超过一年，显示：xxxx年xx月xx日 xx：xx
   */
  howLongBefore(str, now) {
    if (typeof str === 'number') {
      date = str;
      str = this.formatDate(str);
    } else {
      date = Date.parse(str.replace(/\-/g, '/'));
    }

    const oneMinute = 1000 * 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    const oneMonth = oneDay * 30;
    const oneYear = oneMonth * 12;

    let gap = now - date;

    let minute = gap / oneMinute;
    let hour = gap / oneHour;
    let year = gap / oneYear;

    let res = null;

    switch (true) {
      case year >= 1:
        res = this.formatHowLongBefore(str, '$1年$2月$3日$4');
        break;
      case hour >= 48 && year < 1:
        res = this.formatHowLongBefore(str, '$2月$3日$4');
        break;
      case hour >= 24 && hour < 48:
        res = this.formatHowLongBefore(str, '昨天$4');
        break;
      case hour >= 1 && hour < 24:
        res = `${ parseInt(hour) }小时前`;
        break;
      case hour <= 1 && minute > 1:
        res = `${ parseInt(minute) }分钟前`;
        break;
      case minute <= 1:
        res = '刚刚';
        break;
      default:
        res = str;
        break;
    }

    return res;
  },
  /**
   * 格式化 多长时间前的 正则分割时间
   */
  formatHowLongBefore(str, text) {
    let res = null;
    res = str.toString().replace(/(\d{4})\-(\d{2})\-(\d{2})(.{6})(.*)/, text);
    return res;
  },
  /**
   * 跳转下载app
   */
  downloadApp(system) {
    let ua = navigator.userAgent.toLowerCase();
    let url = null;

    // 移动端
    if (/iphone|ipad|ipod|mac/i.test(ua)) {
      url = system === 'seller' ?
        'https://itunes.apple.com/cn/app/%E9%98%BF%E6%8B%89%E7%A7%81%E5%AE%B6%E5%95%86%E5%AE%B6%E7%AB%AF/id1403227465?mt=8' :
        'https://itunes.apple.com/cn/app/%E9%98%BF%E6%8B%89%E7%A7%81%E5%AE%B6/id1369812654?mt=8';
    } else if (/android/i.test(ua)) {
      url = system === 'seller' ?
        'http://sj.qq.com/myapp/detail.htm?apkName=com.cn.alasga.merchant' :
        'http://android.myapp.com/myapp/detail.htm?apkName=alsj.com.EhomeCompany';
    }

    // windows
    else if (/windows/i.test(ua)) {
      url = system === 'seller' ?
        'http://sj.qq.com/myapp/detail.htm?apkName=com.cn.alasga.merchant' :
        'http://android.myapp.com/myapp/detail.htm?apkName=alsj.com.EhomeCompany';
    }

    window.location.href = url;
  },
  /**
   * 获取设备
   */
  getUA() {
    let device = null;
    let ua = window.navigator.userAgent;

    switch (true) {
      case /micromessenger/i.test(ua):
        device = 'wx';
        break;
      case /qqbrowser/i.test(ua):
        device = 'qqBrowser';
        break;
      case /qq/i.test(ua):
        device = 'qq';
        break;
      default:
        device = 'UN_KNOW';
        break;
    }

    return device;
  },
  /*滚动动画时间*/
  scrollTop(number, time){
  		var box = $('.home-content');
	    if (!time) {
//	        document.body.scrollTop = document.documentElement.scrollTop = number;
					box.scrollTop(number);
	        return number;
	    }
	    const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
	    let spacingInex = time / spacingTime; // 计算循环的次数
//	    let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
	    let nowTop = box.scrollTop(); // 获取当前滚动条位置
	    let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
	    let scrollTimer = setInterval(() => {
		    if (spacingInex > 0) {
		        spacingInex--;
		        utils.scrollTop(nowTop += everTop);
		    } else {
		        clearInterval(scrollTimer); // 清除计时器
//		        vm.canScroll = true;
		    }
		  })
  },
  /**
   * 调用微信分享
   * params = {
   *  content: product | store | article | case | designer
   *  title: 'xxxx'
   *  link: 'index.html'
   * }
   */
  initShare(params, vue) {
    if (this.getUA() != 'wx' && this.getUA() != 'qq') return false;
    let desc = null;
    switch (params.content) {
      case 'product':
        desc = '我在阿拉私家APP发现一个不错的定制家具产品，快来看看吧。';
        break;
      case 'store':
        desc = '我在阿拉私家APP发现一个不错的定制家具店铺，快来看看吧。';
        break;
      case 'case':
        desc = '我在阿拉私家APP发现一个不错的定制家具案例，快来看看吧。';
        break;
      case 'article':
        desc = '我在阿拉私家APP发现一个不错的定制家具文章，快来看看吧。';
        break;
      case 'designer':
        desc = '我在阿拉私家APP发现一位不错的定制家具设计师，快来看看吧。';
        break;
      case 'minSheng':
        desc = '万元日手续费低至1块3，最长支持36期。';
        break;
      case 'index':
        desc = '【阿拉私家】汇集全国定制家具门店，免费上门量尺，定制可享分期。';
        break;
      case 'accessPrice':
        desc = '阿拉私家在线免费预算报价，汇聚全国家具定制门店超10000名设计师签约合同数据。';
        break;
      case 'seller':
        desc = '做定制家具生意，上阿拉私家。';
        break;
      default:
        desc = params.content;
        break;
    }

    // QQ
    this.qqShare(params, desc);

    // 微信
    this.wxShare(params, desc, vue);

  },
  /**
   * 微信分享
   */
  wxShare({
    title,
    link,
    icon
  }, desc, vue) {
    let config = {
      title,
      link: link || window.location.href,
      //    imgUrl: 'https://www.alasga.cn/h5/app/web/img/logo-300.jpg',
      imgUrl: icon || iconImg,
      desc
    }
    vue.$http(API.getWxShareData, {
      url: window.location.href
    }, data => {
      console.log('data:_____', data);
      this.onWxShare(config, data.data);
    }, err => {
      vue.$toast(err.msg);
    }, {
      token: ''
    })
  },
  /**
   * QQ分享
   */
  qqShare(params, desc) {
    let head = document.querySelector('head');
    let metaTitle = document.createElement('meta');
    let metaDesc = metaTitle.cloneNode();
    let metaLogo = metaTitle.cloneNode();

    metaTitle.content = params.title;
    metaTitle.itemprop = "name";

    //  metaLogo.content = 'https://www.alasga.cn/h5/app/web/img/logo-300.jpg';
    metaLogo.content = iconImg;
    metaLogo.itemprop = "image";

    metaDesc.content = desc;
    metaDesc.name = "description";
    metaDesc.itemprop = "description";

    head.appendChild(metaTitle);
    head.appendChild(metaLogo);
    head.appendChild(metaDesc);
  },
  /**
   * 发起微信分享
   */
  onWxShare(config, wxData) {
    console.log('config, wxData:_____', config, wxData);
    let {
      appId,
      wechatTimeStamp,
      nonceStr,
      signature
    } = wxData;
    wx.config({
      nonceStr,
      signature,
      appId,
      timestamp: wechatTimeStamp,
      debug: false,
      jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function() {
      let {
        title,
        desc,
        imgUrl,
        link
      } = config;
      // 在这里调用 API
      //分享朋友圈
      wx.onMenuShareTimeline({
        title, // 分享标题
        link, // 分享链接
        imgUrl, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      });
      //分享给朋友
      wx.onMenuShareAppMessage({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接
        imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
          // 用户确认分享后执行的回调函数
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      });
      //分享QQ
      wx.onMenuShareQQ({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接
        imgUrl, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      });
    });
  },



}
