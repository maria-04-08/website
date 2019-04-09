const vm = new Vue({
  el: '#app',
  data() {
    return {
			pageNum: 1,
			newList: '',
			pageList: [1,2,3,4,5,6,7,8,9,10],
			width: '',
			mobileList: [],
			type: '',
			loadingTxt: '上拉加载更多',
			loading: false,
    }
  },
  created() {
  	//私家头条
    this.getBanner();
    /*媒体查询*/
    this.width = window.innerWidth;
    document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';
    if(this.width>765){
    	this.type = 'pc';
    }else{
    	this.type = 'mobile';
    }
    var VUE = this;
		$(window).resize(function() {
		  	document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';
		  	VUE.width = window.innerWidth;
		});
		window.addEventListener('scroll', this.handleScroll);    /*监听滚动条*/
  },
  methods: {
		/*私家头条展示*/
	   getBanner (){
	   		var VUE = this;
	   		VUE.loading = true;
	   		/*兼容抖动*/
				if(VUE.mobileList.length > 0 && VUE.mobileList.length < 10){
					VUE.loadingTxt = '没有更多数据了';
					return;
				}
	   		let req = {
					pageNum: VUE.pageNum,
					pageSize:10,
					originId: 67
				}
				VUE.$http(API.listByOriginId, req, data => {		
					//console.log('数据~~~'+JSON.stringify(data))									
					if(VUE.type == 'pc'){
						VUE.newList = data.data;
					}else{
						VUE.mobileList = VUE.mobileList.concat(data.data.list);
						if(!data.data.next){
							VUE.loadingTxt = '没有更多数据了';
							VUE.loading = true;
							return;
						}
						VUE.pageNum = VUE.pageNum + 1;
					  VUE.loadingTxt = '上拉加载更多';
					  VUE.loading = false;
					}
				}, err => {
					this.$toast(err.msg);
				})
		  },
		 	/*跳转*/
			appyBtn(url,id) {
				if(id){
					utils.openUrl(url,{id:id});
					return
				}
				utils.openUrl(url);
			},
			onPage(num) {
				var VUE = this;
				VUE.pageNum = num;
				VUE.getBanner();
				//如果点到展示页数的最后一个，则更新页数数组
				if(num==VUE.pageList[VUE.pageList.length-1] && VUE.newList.pages>VUE.pageList[VUE.pageList.length-1]){		
					var new_num = [];
					var pages = Number(VUE.newList.pages) + 1;
					for(var i=VUE.pageList[VUE.pageList.length-2];i<pages;i++){
						if(new_num.length < 10){
							new_num.push(i);
						}
					}
					VUE.pageList = new_num;
				}
				//如果点击的是页码数组的第一个，则更新前面的页码
				if(num == VUE.pageList[0] && num != 1){
					num = num < 10 ? 9 : num;
					var new_num = [];
					for(var i=num-8;i<num+2;i++){
						if(new_num.length < 10){
							new_num.push(i);
						}
					}
					VUE.pageList = new_num;
				}
			},
			//回到首页
			onBefore() {
				var new_num = [];
				for(var i=1;i<11;i++){
					if(new_num.length < 10){
						new_num.push(i);
					}
				}
				this.pageList = new_num;
				this.pageNum = new_num[0];
				this.getBanner();
			},
			//去到最后一页
			onLast() {
				var new_num = [];
				var next = Number(this.newList.pages) + 1;
				var before = Number(this.newList.pages) - 9;
				for(var i=before;i<next;i++){
					if(new_num.length < 10){
						new_num.push(i);
					}
				}
				this.pageList = new_num;		
				this.pageNum = new_num[new_num.length-1];
				this.getBanner();
			},
			/*鼠标移入移出*/
			onBtn(index){
				$('.projectList li').eq(index).removeClass('btnNone');
				$('.projectList li').eq(index).addClass('btnCur');
			},
			hideBtn(index){
				$('.projectList li').eq(index).removeClass('btnCur');
				$('.projectList li').eq(index).addClass('btnNone');
			},
			//监听滚动，下拉刷新
			handleScroll() {
			   var VUE = this;
			   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			    /*监听滚动到底部*/
			    var wScrollY = window.scrollY; // 当前滚动条位置    
			    var wInnerH = window.innerHeight; // 设备窗口的高度（不会变）    
			    var bScrollH = document.body.scrollHeight; // 滚动条总高度        
			    if (wScrollY + wInnerH >= bScrollH) {    		    	
			    	  if(VUE.loading) return;
			    	  console.log(111111111)
			        VUE.getBanner();  
			    } 				
			}
  },
  watch: {
		width: function(e){
			/*更新pc端和手机端*/
			if(this.width>765 && this.type != 'pc'){
		    	this.type = 'pc';
		    	this.pageNum = 1;
		    	this.newList = '';
		    	this.pageList= [1,2,3,4,5,6,7,8,9,10];
		    	this.getBanner();
		    }else if(this.width<765 && this.type != 'mobile'){
		    	this.type = 'mobile';
		    	this.mobileList = [];
		    	this.pageNum = 1;
		    	this.getBanner();
		    }
			
		}
  }
})
