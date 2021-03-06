//swiperInit()
var bankListBrand = '';
var bankListStore = '';
var timer02 = ''; //合作品牌
var timer03 = ''; //合作门店
var timer04 = ''; //关于我们
var vm = new Vue({
	el:"#home",
	data:{
		title:['首页', '企业版', '个人版', '关于团队'],
		titleIndex:0,
		features:[
			{title:'物联网', text:'基于物联网构建起硬件设备实施的全面性监控', img:'../../img/home/icon/features01.png'},
			{title:'精细化天气', text:'基于精准的地理位置，给出最小范围的气象预报', img:'../../img/home/icon/features02.png'},
			{title:'智慧分析', text:'有针对性的提出操作管理建议与分析依据', img:'../../img/home/icon/features03.png'},
			{title:'科学数据', text:'大数据的综合运用，有效为管理者提供科学的决策', img:'../../img/home/icon/features04.png'}
		],
		services:[
			{img:'../../img/home/icon/services01.png', text:'生产批次管理'},
			{img:'../../img/home/icon/services02.png', text:'生长视频记录'},
			{img:'../../img/home/icon/services03.png', text:'农业气象旬报'},
			{img:'../../img/home/icon/services04.png', text:'精细化天气预报'},
			{img:'../../img/home/icon/services05.png', text:'农技专家服务'},
			{img:'../../img/home/icon/services06.png', text:'病虫害知识库'},
			{img:'../../img/home/icon/services07.png', text:'价格动态服务'},
			{img:'../../img/home/icon/services08.png', text:'台风实时路径'}
		],
		contact:[
			{img:'../../img/home/icon/email-logo.png', title:'电子邮箱', text:'magic-zhong@qq.com'},
			{img:'../../img/home/icon/phone.png', title:'咨询电话', text:'0898-66236818'},
		]
	},
	methods:{
		changeIndex(idx){
			this.titleIndex = idx;
		}		
	},
	mounted: function() {
		var VUE = this;
		$('#indicatorContainer1').radialIndicator({
			barColor: '#90CAF9',
			fontColor:'#333',
			fontSize:'16',
			fontWeight:'400',
			barWidth: 6,
			initValue: 0,
			roundCorner : true,
			percentage: true
		});
		var radialObj1 = $('#indicatorContainer1').data('radialIndicator');
		$('#indicatorContainer2').radialIndicator({
			barColor: '#90CAF9',
			fontColor:'#333',
			fontSize:'16',
			fontWeight:'400',
			barWidth: 6,
			initValue: 0,
			roundCorner : true,
			percentage: true
		});
		var radialObj2 = $('#indicatorContainer2').data('radialIndicator');
		$('#indicatorContainer3').radialIndicator({
			barColor: '#90CAF9',
			fontColor:'#333',
			fontSize:'16',
			fontWeight:'400',
			barWidth: 6,
			initValue: 0,
			roundCorner : true,
			percentage: true
		});
		var radialObj3 = $('#indicatorContainer3').data('radialIndicator');
        //现在,您可以使用实例来调用不同的方法
        //像这样：
		var _val = radialObj1;
		console.log(_val);
        radialObj1.animate(95);
		radialObj2.animate(90);
		radialObj3.animate(75);
// 		// 设置参数
// 		 var data = {
// 			labels: [
// 			],
// 			datasets: [
// 				{
// 					data: [90],
// 					backgroundColor: [
// 						"#36A2EB",
// 					],
// 					weight:10
// 				}]
// 		};
//         var ctx = document.getElementById("myChart").getContext("2d");
//         var myBarChart = new Chart(ctx, {
// 				type: 'doughnut',
// 				data: data,
// 				// options: options
// 		});
		
	},
	created: function(){
		
	},
	updated: function(){

	},
	watch:{
	}
})