 (function() {
  let template = `
  	<div id="brand">
  		<div class="comTitle">
  			<img src="../../img/home/nav/close.png" class="closeBtn" @click="onClose"/>
  			新闻头条
  		</div>
  		<div class="lists">
			<ul>
				<li v-for="(item,index) in brandArray">
					<img :src="item" />
				</li>			
			</ul>  		
  		</div>
  	</div>
  `
let component = {
	props:[],
    template,
    data() {
      return {
		brandArray: ''	
   	  }
    },  
    methods: {  	
    	onClose() {
    		vm.newsShow=false;
    	}
    },
    mounted:function(){
    	var brandArray = [];
		for(var i=0;i<30;i++){
			var j = Number(i) + 1;
			j = j < 10 ? '0' + j : j;
			Number(j);
			var link = '../../img/brand_logos/logo_'+j+'.png';
			brandArray.push(link);
		}
		this.brandArray = brandArray;
    }
}
	Vue.component('news-component', component);
})()