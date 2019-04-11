//swiperInit()
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
		],
		h5Menu:['主 页', '个人版', '企业版', '关于团队'],
		onPersonalCode: false,  //个人版App二维码展示
		onEnterpriseCode:false, //企业版App二维码展示
		showMiniCode:false,
		startTime:0, //翻屏起始时间  
		endTime:0,  
		now:0,
		showH5:false,
		screenWidth: document.body.clientWidth,
		screenHeight: document.body.clientHeight,
		menuIndex:0,
		showH5Menu:false,
		status:false
	},
	methods:{
		changeIndex(idx){
			this.titleIndex = idx;
		},
		toPage(now){
			this.startTime = 0; //翻屏起始时间  
			this.endTime = 0;
			this.now = 0;
			$("#main").animate({top:(now+'px')},1000);
		},
		pageScroll(){
			var VUE = this;
			var wrap = document.getElementById("wrap");
			var main = document.getElementById("main");
			var hei = document.body.clientHeight;
			wrap.style.height = hei + "px";
			var obj = document.getElementsByTagName("div");
			for(var i=0;i<obj.length;i++){
				if(obj[i].className == 'page'){
					 obj[i].style.height = hei + "px";
				}
			}
			//如果不加时间控制，滚动会过度灵敏，一次翻好几屏startTime、endTime、now    
			//浏览器兼容      
			if ((navigator.userAgent.toLowerCase().indexOf("firefox")!=-1)){
				document.addEventListener("DOMMouseScroll",scrollFun,false);        
			}  
			else if (document.addEventListener) {  
				document.addEventListener("mousewheel",scrollFun,false);  
			}  
			else if (document.attachEvent) {  
				document.attachEvent("onmousewheel",scrollFun);   
			}  
			else{  
				document.onmousewheel = scrollFun;  
			}  
			
			//滚动事件处理函数
			function scrollFun(event){
// 				if(VUE.status){
// 					$('#main').css('position','static');
// 					$('#wrap').removeClass('pc-box');
// 					return;
// 				}
				VUE.startTime = new Date().getTime();  
				var delta = event.detail || (-event.wheelDelta);  
				if (Math.abs(main.offsetTop)> 200) {
					//底部icon进场
				    $(".back-to-top").addClass('bottom_right_cur');
				    //hide: 二维码一进来停留3秒，且一进来不要退场的效果
				    if($(".bottom_right").hasClass('hide')){	
				    	$('.codeFix').addClass('codeFixCur');
				    	var timer01 = setTimeout(function(){
				    		$('.codeFix').removeClass('codeFixCur');
				    	},3000)
				    	$(".bottom_right").removeClass('hide');
				    }
				} else {	
					//底部icon退场
				    $(".back-to-top").addClass('hide');
				    $(".back-to-top").removeClass('bottom_right_cur');
				}
				
				//mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
				//DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动
				if ((VUE.endTime - VUE.startTime) < -1000){
					if(delta>0 && parseInt(main.offsetTop) > -(hei*3)){
						//向下滚动
						VUE.now = VUE.now - hei;
						toPage(VUE.now);
				} 
					if(delta<0 && parseInt(main.offsetTop) < 0){
						//向上滚动
							VUE.now = VUE.now + hei;
							toPage(VUE.now);
					}
					 VUE.endTime = new Date().getTime();  
				}
				else{  
					// event.preventDefault();    
				}    
			}
			function toPage(now){        
				 $("#main").animate({top:(now+'px')},1000);   
			}   
		}
	},
	mounted: function() {
		var VUE = this;
		this.screenWidth = document.body.clientWidth;
		this.screenHeight = document.body.screenHeight;
		var status = false;
		window.onresize = () => {
		    return (() => {
		        window.screenWidth = document.body.clientWidth;
				if(VUE.screenHeight !== document.body.clientHeight){
					VUE.status = true;
				}
				// VUE.screenHeight = document.body.clientHeight;
		        VUE.screenWidth = window.screenWidth;
		    })()
		}
		if(this.screenWidth>768 && !status){
			VUE.pageScroll();
		}else{
			VUE.showH5 = true;
		}
		var canvas = document.getElementById("canvas");
		    var ctx = canvas.getContext('2d');
		    var data = [
				{
					value: 1,
					color:"#90CAF9",
					
					borderWidth: 100,
					labels: {
						boxWidth:10,
						fontColor: 'rgb(255, 99, 132)',
						backgroundColor:'rgb(255, 99, 132)',
					}
				}
			];
			var options= {
				legend: {
					
					display: true,
					labels: {
						boxWidth:10,
						fontColor: 'rgb(255, 99, 132)',
						backgroundColor:'rgb(255, 99, 132)',
					}
				}
			}
			
		    var chart = new Chart(ctx);
		    chart.Doughnut(data,options);
			
// 		$('#indicatorContainer1').radialIndicator({
// 			barColor: '#90CAF9',
// 			fontColor:'#333',
// 			fontSize:'16',
// 			fontWeight:'400',
// 			barWidth: 6,
// 			initValue: 0,
// 			roundCorner : true,
// 			percentage: true
// 		});
// 		var radialObj1 = $('#indicatorContainer1').data('radialIndicator');
// 		$('#indicatorContainer2').radialIndicator({
// 			barColor: '#90CAF9',
// 			fontColor:'#333',
// 			fontSize:'16',
// 			fontWeight:'400',
// 			barWidth: 6,
// 			initValue: 0,
// 			roundCorner : true,
// 			percentage: true
// 		});
// 		var radialObj2 = $('#indicatorContainer2').data('radialIndicator');
// 		$('#indicatorContainer3').radialIndicator({
// 			barColor: '#90CAF9',
// 			fontColor:'#333',
// 			fontSize:'16',
// 			fontWeight:'400',
// 			barWidth: 6,
// 			initValue: 0,
// 			roundCorner : true,
// 			percentage: true
// 		});
// 		var radialObj3 = $('#indicatorContainer3').data('radialIndicator');
//         //现在,您可以使用实例来调用不同的方法
//         //像这样：
// 		var _val = radialObj1;
// 		console.log(_val);
//         radialObj1.animate(95);
// 		radialObj2.animate(90);
// 		radialObj3.animate(75);
	},
	created: function(){
		
	},
	updated: function(){

	},
	watch:{
		screenWidth (val) {
			this.screenWidth = val;
			if(val>768){
				this.showH5 = false;
			}else{
				this.showH5 = true;
			}
		}
	}
})