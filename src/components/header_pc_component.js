 (function() {
  let template = `
  	<div id="allHeader">
			<header class="header">
				<img src="../../img/home/logo.svg" class="logo"/>
				<div class="alsj-navbar">
					<ul>
						<li :class="actives=='1'?'navCur':''" @click="onNav('home',1)">
							首页
						</li>	
						<li :class="actives=='2'?'navCur':''" @click="onNav('loan',2)">
							优家金融
						</li>
						<li :class="actives=='3'?'navCur':''" @click="onNav('rebate',3)">
							众包返利	
						</li>		
						<li :class="actives=='4'?'navCur':''" @click="onNav('bank',4)">
							合作伙伴
						</li>
						<li :class="actives=='7'?'navCur':''" @click="onNav('cooperation',7)">
							入驻合作
						</li>						
						<li :class="actives=='5'?'navCur':''" @click="onNav('events',5)">
							关于我们
						</li>
						<li :class="actives=='6'?'navCur':''" @click="onNav('news',6)">
							私家头条
						</li>
					</ul>			
				</div>
				<div class="agent">
					<div class="agentLi" @click="toLogin('https://www.alasga.cn/portal/agent/')">
						<img src="../../img/home/login-icon.svg" class="loginIcon"/>合伙人登录
					</div>
					<div class="agentLi">
						<img src="../../img/home/phone_icon.svg" class="phoneIcon" />
					</div>
				</div>
			</header>
			<header class="mobileHeaderNav" @touchmove.prevent>
				<div class="mobileHeader">				
					<div>
						<div class="more" @click="moreNav" v-if="name=='more'">
							<img src="../../img/home/nav/more.png" />
					  </div>
					  <div class="more" v-if="name=='back'">
							<a href="javascript:history.back(-1)">
								<img src="../../img/home/nav/nav_back.png" />
							</a>
						</div>	
						<div class="more" v-if="name=='close'" @click="onClose">
							<img src="../../img/home/nav/close.png" />
						</div>	
					</div>									
					<div class="logo">
						<img src="../../img/home/nav/logo.png" />
					</div>
					<div class="tel">
						<a href="tel:4000883928">
							<img src="../../img/home/nav/tel.png" />
						</a>
					</div>
				</div>
				<div class="mobileNav">
					<img src="../../img/home/nav/nav_bg.png" class="nav_bg" />
					<div class="main">
						<ul>
							<li @click="onNav('home',1)">
								<img src="../../img/home/nav/nav_home.png" v-if="actives!='1'" />
								<img src="../../img/home/nav/nav_home_cur.png" v-if="actives=='1'" />
							</li>
							<li @click="onNav('loan',2)">
								<img src="../../img/home/nav/nav_loan.png" v-if="actives!='2'" />
								<img src="../../img/home/nav/nav_loan_cur.png" v-if="actives=='2'" />
							</li>
							<li @click="onNav('rebate',3)">
								<img src="../../img/home/nav/nav_rebate.png" v-if="actives!='3'" />
								<img src="../../img/home/nav/nav_rebate_cur.png" v-if="actives=='3'" />
							</li>
							<li @click="onNav('bank',4)">
								<img src="../../img/home/nav/nav_bank.png" v-if="actives!='4'" />
								<img src="../../img/home/nav/nav_bank_cur.png" v-if="actives=='4'" />
							</li>
							<li @click="onNav('events',5)">
								<img src="../../img/home/nav/nav_abort.png" v-if="actives!='5'" />
								<img src="../../img/home/nav/nav_abort_cur.png" v-if="actives=='5'" />
							</li>
							<li @click="onNav('news',6)">
								<img src="../../img/home/nav/nav_news.png" v-if="actives!='6'" />
								<img src="../../img/home/nav/nav_news_cur.png" v-if="actives=='6'" />
							</li>
						</ul>
						<p class="navBot">版权所有 ©2018 广州阿拉私家科技有限公司</p>
					</div>
				</div>			
			</header>  	
  	</div>
  `
let component = {
	props:['active'],
    template,
    data() {
      return {
		actives: this.active,
		name: 'more'
   	  }
    },  
    methods: {  	
    	/*点击导航*/
	 		onNav(id,index){
//	 			vm.canScroll = false;
				if(window.location.href.indexOf('pages/') > -1){
					utils.openUrl('../../../index.html',{modular:id});
				}
				var scrollTop = document.getElementById(id).offsetTop;
				if(window.innerWidth>765){
					utils.scrollTop(scrollTop - 96,1000);	
				}else{
					utils.scrollTop(scrollTop,1000);
				}
		
				this.actives = index;
				$('.mobileNav').toggleClass('moveNav');				
				this.name = 'more';
				$('.mobileNav li').each(function(){
					$(this).removeClass('liCur');
				})
				
// 				document.getElementById(id).scrollIntoView();
			},
			/*登录合伙人*/
			toLogin(url) {
				window.open(url,'_blank')
			},
			/*点击更多，弹出导航栏*/
			moreNav() {
				$('.mobileNav').toggleClass('moveNav');		
				if($('.mobileNav').hasClass('moveNav') == true){
					this.name = 'close';
					$('.mobileNav li').addClass('liCur');
				}
			},
			/*关闭按钮*/
			onClose() {
				this.name = 'more';
				$('.mobileNav').toggleClass('moveNav');	
				$('.mobileNav li').each(function(){
					$(this).removeClass('liCur');
				})
			}
    },
    mounted:function(){
    	/*获取对应的模块*/
    	var obj = utils.urlToObj();
    	var arr = {
    		'home':{'index':1},
    		'loan':{'index':2},
    		'rebate':{'index':3},
    		'bank':{'index':4},
    		'events':{'index':5},
    		'cooperation':{'index':7},
    		'news':{'index':6}
    	}
			if(obj && obj.modular){
				this.actives = arr[obj.modular].index;
			}
			if(window.location.href.indexOf('pages/') > -1){
					this.name = "back"
			}
    }
}
	Vue.component('header-component', component);
})()