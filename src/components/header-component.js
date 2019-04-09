(function() {
  let template = `
    
  <header id="header">
  <img
    id="logo"
    src="../../img/news/logo.png"
  />
  <nav class="nav">
    <span>首页</span>
    <img src="../../img/common/nav.png" />
    <span>优家金融</span>
    <img src="../../img/common/nav.png" />
    <span>众包返利</span>
    <img src="../../img/common/nav.png" />
    <span>合作伙伴</span>
    <img src="../../img/common/nav.png" />
    <span>关于我们</span>
    <img src="../../img/common/nav.png" />
    <span class="active">私家头条</span>
  </nav>
  <div class="btn-group">
    <!-- 代理商登录 -->
    <div
      class="merchant-proxy"
      role="button"
    >
      <img src="../../img/common/proxy.svg" />
      <span>代理商登录</span>
    </div>

    <!-- 客服电话 -->
    <div
      class="service-tel"
      role="button"
    >
      <img src="../../img/common/tel.svg" />
    </div>
  </div>
</header>
  `

  const component = {
    template,
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }

  Vue.component('v-header', component);
})()
