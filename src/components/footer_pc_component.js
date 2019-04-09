(function() {
  let template = `
  	<div>
  		<div class="instructions" v-if="public" @click="public=false;">
  			<div class="main">
  				<h2 class="title">公众号</h2>
  				<p class="word">每天10分钟，给家10分爱，打开微信，搜索并关注“私家生活馆”，家居家装攻略尽在我手。</p>
  				<div class="know">我知道了</div>
  			</div>
  		</div>
  		<div class="instructions" v-if="mini" @click="mini=false;">
  			<div class="main">
  				<h2 class="title">小程序</h2>
  				<p class="word">线上联盟大平台，拓客赚钱新玩法，打开微信，搜索“私家返佣”小程序，把家装扮好，把钱赚到手。</p>
  				<div class="know">我知道了</div>
  			</div>
  		</div>
			<footer id="footer">
				<img src="http://ow.pic.alasga.cn/ow_1217_footer_bg.png" class="footerImg" />
				<div class="mainBox">
					<div class="main">
						<div class="mainConent">
							<div class="companyLeft">
								<a href="http://mail.alasga.cn/" target="_blank"><img src="../../img/home/footer/e-mail.png" class="e-mail"/></a>
								<img src="../../img/home/footer/tel.png" class="tel"/>
							</div>
							<div class="companyWord">
								<img src="../../img/home/footer/footer-img.png" class="footerTitle"/>
								<p class="address">广州市黄埔区科汇金谷一街16号601</p>
								<p class="copyright">©2018 广州阿拉私家科技有限公司 版权所有</p>
								<a href="http://www.miibeian.gov.cn" target="_blank">
									<p>粤ICP备17057802号</p>
								</a>
							</div>
							<div>
								<div class="codes">
									<img src="../../img/home/footer/public.png" class="QRcode" />
									<p class="codeWord">阿拉私家公众号</p>
								</div>
								<div class="codes">
									<a href="https://weibo.com/gzalasga" target="_blank">
										<img src="../../img/home/footer/weibo.png" class="QRcode" />
										<p class="codeWord">阿拉私家微博</p>
									</a>
								</div>
							</div>
						</div>
					</div>					
				</div>
			</footer>  	
			<footer id="footerMobile">
				<div class="footerTop" v-if="name=='index'">
					<img src="../../img/home/footer/footer_mobile_bg_new.png"/>
					<div class="footerCodes">
						 <div class="codesImg" @click="public=true;">
									<img src="../../img/home/footer/weixin.png" />
									<p>公众号</p>
								</div>
								<div class="codesImg" @click="mini=true;">
									<img src="../../img/home/footer/mini.png"/>
									<p>小程序</p>
								</div>
								<div class="codesImg">
									<a href="https://weibo.com/gzalasga" target="_blank">
										<img src="../../img/home/footer/weibo_icon.png"/>
										<p>微博</p>
									</a>
								</div>								
					</div>
				</div>
				<div class="footerBot">
					©2018 广州阿拉私家科技有限公司 版权所有<br />粤ICP备17057802号
				</div>
			</footer>
  	</div>
  `
let component = {
	props:[],
    template,
    data() {
      return {
				name: '',
				public: false,
				mini: false
   	  }
    },  
    methods: {
 			toLink(url,obj) {
 				utils.openUrl(url,obj)
 			}
    },
    mounted:function(){
    	if(window.location.href.indexOf('pages/') > -1) return;
    	this.name = 'index';
    }
}
	Vue.component('footer-component', component);
})()