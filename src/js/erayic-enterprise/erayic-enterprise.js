
var vm = new Vue({
	el:"#erayic-enterprise",
	data:{
		title:[
			{
				name:'首页',
				url:'../../../index.html'
			},
			{
				name:'企业版',
				url:'../erayic-enterprise/erayic-enterprise.html'
			},
			{
				name:'个人版',
				url:'../erayic-personal/erayic-personal.html'
			}
		],
		titleIndex:1,
		features:[
			{img:'../../img/erayic-enterprise/logo01.png', title:'现代化生产管理', text:'有效的对某一批次的作物进行科学化的管理'},
			{img:'../../img/erayic-enterprise/logo02.png', title:'自动化远程控制', text:'可以超长度实时监控作物生长情况、调整系统设置等'},
			{img:'../../img/erayic-enterprise/logo03.png', title:'多维传感器监测', text:'对生产者进行系统化的管理并做出合理的农事安排'},
			{img:'../../img/erayic-enterprise/logo04.png', title:'强大的专家团队', text:'在线、离线状态下均支持与专家问答'},
			{img:'../../img/erayic-enterprise/logo05.png', title:'精细化气象预报预警', text:'气象预报预警精准到周边一公里的范围'},
			{img:'../../img/erayic-enterprise/logo06.png', title:'病毒害监测预警', text:'提前预知农事生产者可能会爆发的病虫害'}
		],
		featuresPoint:[
			{img:''}
		],
		screenWidth:document.body.clientWidth, // 屏幕宽度
		onCode:false,
		showH5:false,
		showH5Menu:false,
		menuIndex:1,
		contact:[
			{img:'../../img/home/icon/email-logo.png', title:'电子邮箱', text:'magic-zhong@qq.com'},
			{img:'../../img/home/icon/phone.png', title:'咨询电话', text:'0898-66236818'},
		],
	},
	methods:{
		changeIndex(idx, val){
			this.titleIndex = idx;
			utils.openUrl(val);
		},
		toHref(val){ //页面跳转
			if(val == 'download'){
				val = 'https://sj.qq.com/myapp/detail.htm?apkName=com.erayic.agr2s';
			}
			utils.openUrl(val);
		},
	},
	mounted: function() {
		var VUE = this;
		VUE.screenWidth = document.body.clientWidth;
		window.onresize = () => {
		    return (() => {
		        window.screenWidth = document.body.clientWidth;
		        VUE.screenWidth = window.screenWidth;
		    })()
		}
		if(VUE.screenWidth>768){
		}else{
			VUE.showH5 = true;
		}
	},
	watch:{
		screenWidth (val) {
			this.screenWidth = val;
			// console.log(val);
			if(val>768){
				this.showH5 = false;
			}else{
				this.showH5 = true;
			}
		}
	}
})