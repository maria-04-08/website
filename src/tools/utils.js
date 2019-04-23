
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
 
}
