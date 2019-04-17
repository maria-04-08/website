//swiperInit()
var vm = new Vue({
	el:"#home",
	data:{
		title:[
			{
				name:'首页',
				url:''
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
		menuIndex:0,
		onPersonalCode: false,  //个人版App二维码展示
		onEnterpriseCode:false, //企业版App二维码展示
		showMiniCode:false,
		startTime:0, //翻屏起始时间  
		endTime:0,  
		now:0,
		showH5:false,
		screenWidth: document.body.clientWidth,
		screenHeight: document.body.clientHeight,
		showH5Menu:false,
		status:false,
		chart1:'',
		chart2:'',
		chart3:'',
		proccess1:0,
		proccess2:0,
		proccess3:0,
		setStatus:false
	},
	methods:{
		changeIndex(idx, val){
			this.titleIndex = idx;
			window.location.href = val;
		},
		toPage(now){ //翻屏方法
			this.startTime = 0; //翻屏起始时间  
			this.endTime = 0;
			this.now = 0;
			if(this.status && now == 0){
				document.getElementById('msg_end').scrollIntoView(false); //初始化滚动条
			}else{
				$("#main").animate({top:(now+'px')},1000);
			}
		},
		toHref(val){ //页面跳转
			if(val == 'download'){
				val = 'https://sj.qq.com/myapp/detail.htm?apkName=com.erayic.agr2s';
			}
			window.location.href = val;
		},
		pageScroll(){ //页面滑动的处理
			if(this.status){
				return;
			}
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
				VUE.changeStyle(VUE.status);
				if(VUE.showH5){
					return;
				}
				VUE.startTime = new Date().getTime();  
				var delta = event.detail || (-event.wheelDelta);  
				if (Math.abs(main.offsetTop)> $("#page1").offset().top) {
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
				
				//判断一个元素是否在滚动的可视区域内，不在就固定到可视区域的上方。
				var windowheight = $(window).height();
				var firstheight2 = $("#page4").offset().top;
				var scrolltop = $(window).scrollTop();
				if (firstheight2 >= scrolltop && firstheight2 < (scrolltop + windowheight)) {
					if(!VUE.setStatus){
						VUE.setStatus = true;
						setTimeout(function(){
							VUE.initChart();
							var num1 = 0 , num2 = 0, num3 = 0;
							var t1 = setInterval(function(){
							   num1++;
							   VUE.proccess1 = num1;
								if(num1 == 95){
									clearInterval(t1);
								}       
							},10);
							var t2 = setInterval(function(){
							   num2++;
							   VUE.proccess2 = num2;
								if(num2 == 90){
									clearInterval(t2);
								}       
							},10);
							var t3 = setInterval(function(){
							   num3++;
							   VUE.proccess3 = num3;
								if(num3 == 75){
									clearInterval(t3);
								}       
							},8);
						},400)
					}
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
		},
		//进度条动态数字
		getProccess(name, type, max){
			var _name = name;
			var num = 0;
			var VUE = this;
			_name = setInterval(function(){
			    num++;
			    if(type == 1){
					VUE.proccess1 = num;
				}else if(type == 2){
					VUE.proccess2 = num;
				}else{
					VUE.proccess3 = num;
				}
				if(num == max){
					clearInterval(_name);
				}       
			},8);
		},
		initChart(){
			this.chart1 = echarts.init(document.getElementById("chart1"));
			this.chart2 = echarts.init(document.getElementById("chart2"));
			this.chart3 = echarts.init(document.getElementById("chart3"));
			var data =[{  name: '',value: 586},{name: '',value: 42}];
			let option1 = {
				graphic: [
				],
				series: [
					{
						name: '',       
						type: 'pie',                    // 系列类型 
						center:['50%','50%'],           // 饼图的中心（圆心）坐标
						radius: ['78%', '88%'],         // 饼图的半径，数组的第一项是内半径，第二项是外半径
						hoverAnimation: false,          // 是否开启 hover 在扇区上的放大动画效果
						color: ['#8FC7F6', '#DADADA'],  // 圆环图的颜色
						label: {                        // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等.
							normal: {
								show: false             // 是否显示标签[ default: false ]
							}
						},
						labelLine: {                    // 标签的视觉引导线样式,在 label 位置 设置为'outside'的时候会显示视觉引导线。
							normal: {
								show: false             // 是否显示视觉引导线。
							}
						},
						data: data
					}
				]
			};
			let option2 = {
				graphic: [
				],
				series: [
					{
						name: '',       
						type: 'pie',                    // 系列类型 
						center:['50%','50%'],           // 饼图的中心（圆心）坐标
						radius: ['78%', '88%'],         // 饼图的半径，数组的第一项是内半径，第二项是外半径
						hoverAnimation: false,          // 是否开启 hover 在扇区上的放大动画效果
						color: ['#8FC7F6', '#DADADA'],  // 圆环图的颜色
						label: {                        // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等.
							normal: {
								show: false             // 是否显示标签[ default: false ]
							}
						},
						labelLine: {                    // 标签的视觉引导线样式,在 label 位置 设置为'outside'的时候会显示视觉引导线。
							normal: {
								show: false             // 是否显示视觉引导线。
							}
						},
						data: [{  name: '',value: 586},{name: '',value: 68}]
					}
				]
			};
			let option3 = {
				graphic: [
				],
				series: [
					{
						name: '',       
						type: 'pie',                    // 系列类型 
						center:['50%','50%'],           // 饼图的中心（圆心）坐标
						radius: ['78%', '88%'],         // 饼图的半径，数组的第一项是内半径，第二项是外半径
						hoverAnimation: false,          // 是否开启 hover 在扇区上的放大动画效果
						color: ['#8FC7F6', '#DADADA'],  // 圆环图的颜色
						label: {                        // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等.
							normal: {
								show: false             // 是否显示标签[ default: false ]
							}
						},
						labelLine: {                    // 标签的视觉引导线样式,在 label 位置 设置为'outside'的时候会显示视觉引导线。
							normal: {
								show: false             // 是否显示视觉引导线。
							}
						},
						data: [{  name: '',value: 586},{name: '',value: 180}]
					}
				]
			};
			

			// 使用刚指定的配置项和数据显示图表
			this.chart1.setOption(option1);
			this.chart2.setOption(option2);
			this.chart3.setOption(option3);
		},
		changeStyle(status){  //当前页面不是占满整屏时，不整屏滑动
			if(status){
				$('#main').css('position','static');
				$('#wrap').removeClass('pc-box');
				$('.index-part').css('height','100%');
				$('.features-part').css('height','auto');
				$('.features-part').css('padding-bottom','30px');
				$('.core-services-part').css('height','auto');
				$('.core-services-part').css('padding-bottom','30px');
				$('.mass-target-part').css('height','auto');
			}else{
				$('#main').css('position','relative');
				$('#wrap').addClass('pc-box');
				$('.index-part').css('height','100%');
				$('.features-part').css('height','100%');
				$('.core-services-part').css('height','100%');
				$('.mass-target-part').css('height','100%');
			}
		},
		isScrollOnEle(){
			
		},
		scrollFunH5(){ //针对手机端的滑动监听
			console.log('滚动----');
			var top1 = $("#chart1").offset().top;
			var top2 = $("#chart2").offset().top;
			var windowheight = $(window).height();
			var scrolltop = $(window).scrollTop();
			if (top1 >= scrolltop && top1 < (scrolltop + windowheight)) {
				if(this.proccess1 == 95){
				}else{
					this.getProccess('t1', 1,  95);
					if(this.chart1){
					}else{
						this.initChart();
					}
					this.getProccess('t2', 2,  90);
					if(this.chart2){
					}else{
						this.initChart();
					}
					this.getProccess('t3', 3,  75);
					if(this.chart3){
					}else{
						this.initChart();
					}
				}
				
			}

		},
		refresh(){
			var VUE = this;
			this.screenWidth = document.body.clientWidth;
			this.screenHeight = document.body.clientHeight;
			var chart1 = this.chart1, chart2 = this.chart2, chart3 = this.chart3;
			if(this.screenWidth>768){ 
				if(this.screenHeight < window.screen.availHeight-98 || VUE.showH5){ //改变滑动效果，不用整屏滑动(会隐藏内容)
					VUE.status = true;
					//浏览器兼容      
					if ((navigator.userAgent.toLowerCase().indexOf("firefox")!=-1)){
						document.addEventListener("DOMMouseScroll",VUE.scrollFunH5,false);        
					}  
					else if (document.addEventListener) {  
						document.addEventListener("mousewheel",VUE.scrollFunH5,false);  
					}  
					else if (document.attachEvent) {  
						document.attachEvent("onmousewheel",VUE.scrollFunH5);   
					}  
					else{  
						document.onmousewheel = VUE.scrollFunH5;  
					}  
				}else{
					VUE.pageScroll();
					VUE.status = false;
				}
			}else{
				VUE.showH5 = true;
				VUE.status = true;
				
				var box = VUE.$refs.viewBox; // 首先通过$refs获取dom元素
				
				var top1 = $("#chart1").offset().top;
				var top2 = $("#chart2").offset().top;
				var windowheight = $(window).height();
				var scrolltop = $(window).scrollTop();
				box.addEventListener('scroll', (evt) => { // 监听scroll事件
// 					var top1 = $("#chart1").offset().top;
// 					var top2 = $("#chart2").offset().top;
// 					var windowheight = $(window).height();
// 					var scrolltop = $(window).scrollTop();
					if(VUE.$refs.viewBox.scrollTop > top1){
					// if (top1 >= scrolltop && top1 < (scrolltop + windowheight)) {
						console.log('到底');
						if(VUE.proccess1 == 95) return;
						VUE.getProccess('t1', 1,  95);
						if(VUE.chart1){
						}else{
							VUE.initChart();
						}
						VUE.getProccess('t2', 2,  90);
						if(VUE.chart2){
						}else{
							VUE.initChart();
						}
						VUE.getProccess('t3', 3,  75);
						if(VUE.chart3){
						}else{
							VUE.initChart();
						}
					}
// 					if (top1 >= scrolltop && top1 < (scrolltop + windowheight)) {
// 						console.log('监听滚动');
// 						if(this.proccess1 == 95){
// 						}else{
// 							this.getProccess('t1', 1,  95);
// 							if(this.chart1){
// 							}else{
// 								this.initChart();
// 							}
// 							this.getProccess('t2', 2,  90);
// 							if(this.chart2){
// 							}else{
// 								this.initChart();
// 							}
// 							this.getProccess('t3', 3,  75);
// 							if(this.chart3){
// 							}else{
// 								this.initChart();
// 							}
// 						}
// 						
// 					}
				}, false);
				
				//浏览器兼容      
// 				if ((navigator.userAgent.toLowerCase().indexOf("firefox")!=-1)){
// 					document.addEventListener("DOMMouseScroll",VUE.scrollFunH5,false);        
// 				}  
// 				else if (document.addEventListener) {  
// 					document.addEventListener("mousewheel",VUE.scrollFunH5,false);  
// 				}  
// 				else if (document.attachEvent) {  
// 					document.attachEvent("onmousewheel",VUE.scrollFunH5);   
// 				}  
// 				else{  
// 					document.onmousewheel = VUE.scrollFunH5;  
// 				}  
			}
			VUE.changeStyle(VUE.status);
			window.onresize = () => {
			    return (() => {
			        window.screenWidth = document.body.clientWidth;
					window.screenHeight = document.body.clientHeight;
					VUE.screenHeight = window.screenHeight;
					var width = VUE.screenWidth = window.screenWidth;
					if(width>768){
						VUE.showH5 = false;
						VUE.status = false;
						//随浏览器大小改变图表大小
						if(this.chart1){
							this.chart1.resize();
							this.chart2.resize();
							this.chart3.resize();
						}
						if(VUE.screenHeight < window.screen.availHeight-98){ //改变滑动效果，不用整屏滑动(会隐藏内容)
							VUE.changeStyle(true);
							VUE.status = true;
						}else{
							VUE.changeStyle(false);
							VUE.status = false;
							VUE.startTime = 0; //翻屏起始时间  
							VUE.endTime = 0;
							VUE.now = 0;
							$("#main").animate({top:'0px'},0);
							document.getElementById('msg_end').scrollIntoView(false); //初始化滚动条
							VUE.pageScroll();
						}
					}else{
						VUE.showH5 = true;
						VUE.status = true;
						VUE.changeStyle(true);
						window.location.reload();
					}
			    })()
			}
		}
	},
	mounted: function() {
		var VUE = this;
		VUE.refresh();
	},
	created: function(){
		
	},
	updated: function(){

	},
	watch:{
	}
})