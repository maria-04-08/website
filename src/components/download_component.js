(function() {
  let _template = `
  <div :class="{
    'download-component': true, 
    'no-fixed': noFixed
  }">
    <div class="text">
      <img src="../../img/download_logo.png" />
      <h2>定制家具，就上阿拉私家</h2>
    </div>
    <div class="down-btn" @touchend.prevent="download">
      <h3>立即下载</h3>
      <p>阿拉私家App</p>
    </div>
  </div>`

  let downloadComponent = {
    template: _template,
    props: ['noFixed'],
    data() {
      return {
      }
    },
    methods: {
      download() {
        let ua = navigator.userAgent.toLowerCase();
        let url = null;
        if (/iphone|ipad|ipod/.test(ua)) {
          url =
            'https://itunes.apple.com/cn/app/%E9%98%BF%E6%8B%89%E7%A7%81%E5%AE%B6/id1369812654?mt=8';
        } else if (/android/.test(ua)) {
          url =
            'http://android.myapp.com/myapp/detail.htm?apkName=alsj.com.EhomeCompany';
        }
        window.location.href = url;
      }
    }
  }

  Vue.component('download-component', downloadComponent);
})()