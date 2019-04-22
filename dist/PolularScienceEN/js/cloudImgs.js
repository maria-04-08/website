
$(function(){ 
	
	$.parser.parse(); //对整个页面重新渲染
	var play = false, imgArray = [], dataArr = [], index = 0, timer = '', clickStatus = false,
	requestUrl = 'http://www.scsweather.com/Home/GetFy4Product?productCode=';
	
	//弹窗拖拽
	$( "#cloud-part").draggable();

	//展示卫星云图
	$('#cloud_dt').click(function(){
		$('.cloud-part').css('display','flex');
	})
	
	//hover效果
	elHover(0,$(".play-not"),'0 -50px','0 -302px','0 0','0 -252px');
	elHover(1,$(".play-rewind"),'0 -220px','0 -188px');
	elHover(1,$(".play-fastForward"),'0 -132px','0 -100px');
	
	//点击播放图标
	$(".play-not").click(function(){
		if(play){ //暂停
			$('.play-not').css('background-position','0 -302px');
			clearInterval(timer);
		}else{ //播放开始
			$('.play-not').css('background-position','0 -50px');
			if(index > 0 ){
				clearInterval(timer);
			}
			playImgs();
		}
		play = !play;
	})
	
	//点击后退图标
	$(".play-rewind").click(function(){
		clickStatus = false;
		if(index == 0 || index < 0){
			index = dataArr.length-1;
		}else{
			index = (index - 1) < 0? index : index - 1 ;
		}
		if(play){ //播放
			index = (index - 2) < 0? index : index - 2 ;
		}else{ //没有播放
			changeImgs();
		}
	})
	//点击前进图标
	$(".play-fastForward").click(function(){
		clickStatus = false;
		if(index >= dataArr.length-1){
			index = 0;
		} else{
			index = (index + 1) > dataArr.length ? 0 : index + 1;
		}
		if(play){ //播放
		
		}else{ //没有播放
			changeImgs();
		}
	})
	
	//点击关闭图标
	$('.close-cloud').click(function(){
		$('.cloud-part').css('display','none');
	})
	
	//点击展示产品列表
	$('.pro-title').click(function(){
		$('.play-bar-left ul').toggleClass('show');
		$(".pro-title span:last-child").toggleClass('glyphicon-triangle-top');
	})
	//点击产品列表中的li
	$('.play-bar-left ul').click(function(e){
		var target = $(event.target);
		$('.play-bar-left').find('.active').removeClass('active');
		if(target.is($('li'))){
			target.addClass('active');
			var productCode = target.attr('id');//产品code值
			_url = requestUrl + productCode;
			play = false;
			clickStatus = false;
			$('.pro-title .text').text(target.text());
			$('.play-not').css('background-position','0 -252px');
			getData(_url); //覆盖数据
			clearInterval(timer); //清除定时器
			index = 0; //初始化index
			showTimeList(); //滚动条滑动到指定的li
		}
	})
	//点击展示时间列表
	$('.play-title').click(function(){
		if(play || clickStatus){
		}else{
			showTimeList();
		}
		$('.play-bar-right ul').toggleClass('show');
		$(".play-title span:last-child").toggleClass('glyphicon-triangle-top');
	})
	//点击展示时间列表中的li
	$('.play-bar-right ul').click(function(e){
		var target = $(event.target);
		if(target.is($('li'))){
			clickStatus = true;
			index = target.attr('id');
			showTimeList();
			updateVal();
		}
	})
	//点击时间列表及产品列表以外的位置关闭列表
	$('#cloud-part').click(function(e){
		var target = $(event.target);
		if(target.hasClass('play-title') || target.hasClass('pro-title') || target.hasClass('text')){
		}else{
			if($('.play-bar-right ul').hasClass('show')){
				$('.play-bar-right ul').toggleClass('show');
				$(".play-title span:last-child").toggleClass('glyphicon-triangle-top');
			}
			if($('.play-bar-left ul').hasClass('show')){
				$('.play-bar-left ul').toggleClass('show');
				$(".pro-title span:last-child").toggleClass('glyphicon-triangle-top');
			}
		}
	})
	//公共的hover样式方法
	function elHover(num,el,position1,position2,position3,position4){
		el.hover(function(){
			if(num == 0){
				if(play){ //播放
					el.css('background-position',position1);
				}else{ //未播放 
					el.css('background-position',position2);
				}
			}else{
				el.css('background-position',position1);
			}
			
		},function(){
			if(num == 0){
				if(play){ //暂停
					el.css('background-position',position3);
				}else{ //播放开始
					el.css('background-position',position4);
				}
			}else{
				el.css('background-position',position2);
			}
			
		});
	}
	
	//初始化数据
	var _url = requestUrl + '58378';
	getData(_url);
	
	//选择不同产品加载数据
	$('.select-box').change(function(){ 
		var productCode =$(this).children('option:selected').val();//这就是selected的值 
		_url = requestUrl + productCode;
		play = false;
		$('.play-not').css('background-position','0 -252px');
		getData(_url);
		clearInterval(timer);
		index = 0;
	});
	function dragCloudBox(){
		var box1 = document.getElementById('cloud-header');
		var box = document.getElementById('cloud-part');
		// 鼠标按下并移动（开始拖拽）
		box1.onmousedown = function(evt){
			evt = evt || window.event;
			// 在摁下时，记录摁下的位置
			// 摁下光标位置距离事件源对象的偏移量
			// offsetX,offsetY
			var ox = evt.offsetX;
			var oy = evt.offsetY;
			document.onmousemove = function(e){
				e = e || window.event;
				// 在拖拽的过程中不断改变#box的top,left
				box.style.left = e.clientX - ox + 'px';
				box.style.top =  e.clientY - oy + 'px';
				if(e.preventDefault){
					e.preventDefault();
				}else{
					e.returnValue = false;
				}
			}
		}
		// 鼠标松开（拖拽完成）
		document.onmouseup = function(){
			document.onmousemove = null;
		}
	}
	function getData(url){
		$.get(url,function(data){
			dataArr = data;
			imgArray = [];
			index = 0;
			var liStr = '';
			// console.log('返回数据--'+JSON.stringify(data));
			for(var i=0;i<data.length;i++){
				data[i].ProductUrl = 'http://www.scsweather.com/' + data[i].ProductUrl;
				imgArray.push(data[i].ProductUrl);
				if(data[i].ProductTime){
					liStr = liStr + '<li id='+ i + '>'+data[i].ProductTime+'</li>';
				}
			}
			$('.play-bar-right ul').html(liStr);
			$('.play-bar-right ul li:first-child').addClass('active');
			updateVal();
		});
	}
	//播放图片
	function playImgs(){
		timer = setInterval(function(){
			if(index>=imgArray.length-1){
		　　　　index=0;
		　　}
		　　else{
		　　　　index++;
		　　}
			showTimeList();
		　　 updateVal();
		},1200);
	}
	//切换图片
	function changeImgs(){
		if(dataArr[index]){
			$('.play-title .text').text(dataArr[index].ProductTime);
		}
		$(".cloud-img img").attr("src",imgArray[index]);
	}
	//展示时间列表
	function showTimeList(){
		$('.play-bar-right').find('.active').removeClass('active');
		$($('.play-bar-right ul li')[index]).addClass('active');
		$('.play-bar-right ul').animate({
		    scrollTop: (index)*32 + 'px'
		}, 500);
	}
	//修改展示时间及图片的值
	function updateVal(){
		if(dataArr[index]){
			$('.play-title .text').text(dataArr[index].ProductTime);
		}
		$(".cloud-img img").attr("src",imgArray[index]);
	}
}); 