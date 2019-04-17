
var vm = new Vue({
	el:"#erayic-personal",
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
		titleIndex:2,
		features:[
			{img:'../../img/erayic-personal/icon/icon01.png', title:'精细化气象预报', text:'针对某一区域范围内给出精准的气象预报信息'},
			{img:'../../img/erayic-personal/icon/icon02.png', title:'农业资讯及政策法规', text:'相关的农业资讯和最新的政策法规'},
			{img:'../../img/erayic-personal/icon/icon03.png', title:'农技专家支持', text:'24小时接收用户的在线、离线信息，并及时做出回馈'},
			{img:'../../img/erayic-personal/icon/icon04.png', title:'作物价格动态', text:'全国的平均价格趋势，及当前所在地的主要市场价格'},
			{img:'../../img/erayic-personal/icon/icon05.png', title:'作物生产履历', text:'作物生产过程中的所有农事操作的全记录'},
			{img:'../../img/erayic-personal/icon/icon06.png', title:'作物生长日志', text:'记录作物生长过程的状态，支持图片、文字、语音编辑'},
			{img:'../../img/erayic-personal/icon/icon07.png', title:'病虫害预警', text:'根据当前温度，提前给出的病虫害预警，谨防大量亏损'},
			{img:'../../img/erayic-personal/icon/icon08.png', title:'气象灾害预警', text:'与当前市区官方气象台所发布的灾害预警内容一致'},
			{img:'../../img/erayic-personal/icon/icon09.png', title:'台风实时路径', text:'实时台风路径走向，并且合理的给出对当前位置的影响'}
		],
		featuresPoint:[
			{img:''}
		],
		screenWidth:document.body.clientWidth, // 屏幕宽度
		onCode:false,
		showH5:false,
		showH5Menu:false,
		menuIndex:2,
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
			console.log(val);
			if(val>768){
				this.showH5 = false;
			}else{
				this.showH5 = true;
			}
		}
	}
})