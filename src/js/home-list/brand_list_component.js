 (function() {
  let template = `
  	<div id="brand">
  		<div class="comTitle">
  			<img src="../../img/home/nav/close.png" class="closeBtn" @click="onClose"/>
  			合作品牌
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
    		vm.brandShow=false
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
	Vue.component('brand-component', component);
})()