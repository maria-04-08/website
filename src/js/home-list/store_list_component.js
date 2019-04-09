 (function() {
  let template = `
  	<div id="brand">
  		<div class="comTitle">
  			<img src="../../img/home/nav/close.png" class="closeBtn" @click="onClose"/>
  			合作门店
  		</div>
  		<div class="lists">
			<div class="storeList" v-for="(item,index) in brandArray">
				<img :src="item.logo" class="storeLogo" />
				<div class="storeRight">
					<p class="title">{{item.name}}</p>
					<p class="des">{{item.des}}</p>
				</div>
			</div>
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
    		vm.storeShow=false;
    	}
    },
    mounted:function(){
    	var list = [];
    	list[0] = {'logo':'../../img/store_logos/logo_01.png','name':'壹家壹品','des':'广东省广州市黄埔区惠润广场1楼1026'};
    	list[1] = {'logo':'../../img/store_logos/logo_02.png','name':'维克小镇','des':'四川省彭州市旌阳区居然之家恒大店'};
    	list[2] = {'logo':'../../img/store_logos/logo_03.png','name':'雅克斯豪门','des':'湖南省衡阳市石鼓区万居市场C区'};
    	list[3] = {'logo':'../../img/store_logos/logo_04.png','name':'飞利浦','des':'四川省成都市成华区富森美家居'};
    	list[4] = {'logo':'../../img/store_logos/logo_05.png','name':'巴黎世家柔光瓷砖','des':'湖南省衡阳市石鼓区华源建材市场'};
    	list[5] = {'logo':'../../img/store_logos/logo_06.png','name':'格力电器','des':'广东省清远市清城区大学西路333号'};
    	list[6] = {'logo':'../../img/store_logos/logo_07.png','name':'欧派橱柜','des':'四川省成都市龙泉驿区驿都大道中路'};
    	list[7] = {'logo':'../../img/store_logos/logo_08.png','name':'瑞典柏丽地板','des':'云南省昆明市西山区红星美凯龙'};
    	list[8] = {'logo':'../../img/store_logos/logo_09.png','name':'卡诺亚','des':'广东省广州市南沙区居然之家3楼'};
    	list[9] = {'logo':'../../img/store_logos/logo_10.png','name':'东鹏瓷砖','des':'四川省成都市武侯区天府新区'};
    	list[10] = {'logo':'../../img/store_logos/logo_11.png','name':'蒂罗迩','des':'广东省广州市南沙区万达广场店'};
    	list[11] = {'logo':'../../img/store_logos/logo_12.png','name':'YOYO卫浴','des':'重庆市沙坪坝区大川建材市场'};
    	list[12] = {'logo':'../../img/store_logos/logo_13.png','name':'巴黎世家柔光瓷砖','des':'湖南省衡阳市石鼓区华源建材市场'};
    	list[13] = {'logo':'../../img/store_logos/logo_14.png','name':'名柜','des':'广东省广州市白云区好运来家具广场店'};
    	list[14] = {'logo':'../../img/store_logos/logo_15.png','name':'莫瑞尼家居','des':'重庆市南岸区玉马路5号'};
    	list[15] = {'logo':'../../img/store_logos/logo_16.png','name':'柏莱雅','des':'广东省广州市黄埔区红树湾家具广场2楼'};
    	list[16] = {'logo':'../../img/store_logos/logo_17.png','name':'贝拉维拉陶瓷','des':'重庆市南岸区玉马路5号'};
    	list[17] = {'logo':'../../img/store_logos/logo_18.png','name':'法拉卡丹','des':'四川省成都市华阳街道剑南大道一段'};
    	list[18] = {'logo':'../../img/store_logos/logo_19.png','name':'柏利全屋定制','des':'重庆市大渡口区松青路1000号1-2-46'};
    	list[19] = {'logo':'../../img/store_logos/logo_20.png','name':'DIODI帝牌卫浴','des':'重庆市九龙坡区石新路156号'};
    	list[20] = {'logo':'../../img/store_logos/logo_21.png','name':'德尔地板','des':'四川省成都市武侯区天府新区华阳街'};
    	list[21] = {'logo':'../../img/store_logos/logo_22.png','name':'智璞家具','des':'广东省广州市增城区新塘光辉家居店'};
    	list[22] = {'logo':'../../img/store_logos/logo_23.png','name':'芬特斯','des':'广东省广州市番禺区五洲城店'};
    	list[23] = {'logo':'../../img/store_logos/logo_24.png','name':'雅迪玉帛时尚家纺','des':'四川省成都市金牛区荷花金池四楼'};
    	   	
    	list[24] = {'logo':'../../img/store_logos/logo_25.png','name':'多为士','des':'四川省成都市武侯区八益家具城'};
    	list[25] = {'logo':'../../img/store_logos/logo_26.png','name':'天鹅城堡','des':'广东省广州市增城区新塘光辉家居3楼'};
    	list[26] = {'logo':'../../img/store_logos/logo_27.png','name':'亚丹','des':'广东省广州市南沙区海景城中景四街C-1'};
    	list[27] = {'logo':'../../img/store_logos/logo_28.png','name':'索维思','des':'广东省广州市南沙区奥园中环广场L190'};
    	list[28] = {'logo':'../../img/store_logos/logo_29.png','name':'壹家壹品','des':'广东省广州市萝岗区奥园广场店'};
    	list[29] = {'logo':'../../img/store_logos/logo_30.png','name':'冉冉橱柜','des':'重庆市南岸区南坪街道万寿路'};
    	list[30] = {'logo':'../../img/store_logos/logo_31.png','name':'高晟家具','des':'四川省成都市华阳街道剑南大道一段'};
    	list[31] = {'logo':'../../img/store_logos/logo_32.png','name':'欧克曼','des':'广东省佛山市南海区家天下2楼'};
    	list[32] = {'logo':'../../img/store_logos/logo_33.png','name':'柏莱雅','des':'广东省佛山市南海区红星美凯龙3楼'};
    	list[33] = {'logo':'../../img/store_logos/logo_34.png','name':'德维尔','des':'广东省广州市海珠区琶洲吉盛伟邦店'};
    	list[34] = {'logo':'../../img/store_logos/logo_35.png','name':'欧风韩雨 ','des':'广东省广州市增城区新塘光辉家居3楼'};
    	list[35] = {'logo':'../../img/store_logos/logo_36.png','name':'冠特','des':'广东省广州市白云区好运来家具广场店'};
    	list[36] = {'logo':'../../img/store_logos/logo_37.png','name':'亚丹','des':'广东省广州市天河区黄埔大道中149号'};
    	list[37] = {'logo':'../../img/store_logos/logo_38.png','name':'東方工匠','des':'四川省成都市成华区富森美家居家具馆'};
    	list[38] = {'logo':'../../img/store_logos/logo_39.png','name':'迈思德地板','des':'重庆市大渡口区松青路'};
    	list[39] = {'logo':'../../img/store_logos/logo_40.png','name':'柏慕尼','des':'湖北省武汉市武昌区金鑫国际家居'};
    	list[40] = {'logo':'../../img/store_logos/logo_41.png','name':'美标','des':'广东省广州市天河区广州越和建材城'};
    	list[41] = {'logo':'../../img/store_logos/logo_42.png','name':'冠星王陶瓷','des':'湖南省衡阳市蒸湘区日鑫建材市场'};
    	list[42] = {'logo':'../../img/store_logos/logo_43.png','name':'尚雅软装','des':'广东省中山市小榄镇九洲路77号'};
    	list[43] = {'logo':'../../img/store_logos/logo_44.png','name':'德维尔','des':'广东省广州市番禺区德兴路90号'};
    	list[44] = {'logo':'../../img/store_logos/logo_45.png','name':'欧雅橱柜','des':'广东省中山市西区翠虹路21号'};
    	list[45] = {'logo':'../../img/store_logos/logo_46.png','name':'卡曼迪','des':'广东省广州市东莞石龙濠兴家居'};
    	
    	list[46] = {'logo':'../../img/store_logos/logo_47.png','name':'美奇屋全屋整装','des':'湖南省郴州市北湖区湘南大市场'};
    	list[47] = {'logo':'../../img/store_logos/logo_48.png','name':'桠楠定制家具','des':'四川省成都高新区天仁路'};
    	list[48] = {'logo':'../../img/store_logos/logo_49.png','name':'逸高地板','des':'重庆市沙坪坝区石小路'};
    	list[49] = {'logo':'../../img/store_logos/logo_50.png','name':'伊仕利','des':'广东省广州市天河区天平架装饰材料城'};
    	list[50] = {'logo':'../../img/store_logos/logo_51.png','name':'德维尔','des':'广东省广州市白云区安华汇店'};
    	list[51] = {'logo':'../../img/store_logos/logo_52.png','name':'尚高卫浴','des':'福建省厦门市集美区侨英街道喜盈门'};
    	list[52] = {'logo':'../../img/store_logos/logo_53.png','name':'壹家壹品','des':'广东省广州市增城区东汇城三楼'};
    	list[53] = {'logo':'../../img/store_logos/logo_54.png','name':'意和','des':'广东省广州市番禺区五洲城建材中心'};
    	list[54] = {'logo':'../../img/store_logos/logo_55.png','name':'伊梵全屋定制','des':'湖南省衡阳市石鼓区华源建材超市5楼'};
    	list[55] = {'logo':'../../img/store_logos/logo_56.png','name':'美洛士','des':'广东省广州市琶洲吉盛伟邦店'};
    	list[56] = {'logo':'../../img/store_logos/logo_57.png','name':'联邦高登 ','des':'广东省广州市番禺区汇景大道159号'};
    	list[57] = {'logo':'../../img/store_logos/logo_58.png','name':'阿泊罗','des':'广东省广州市花都区三东大道西'};
    	list[58] = {'logo':'../../img/store_logos/logo_59.png','name':'诗尼曼全屋定制','des':'湖南省郴州市桂阳县天颜国际星艺'};
    	list[59] = {'logo':'../../img/store_logos/logo_60.png','name':'维尔康订制','des':'广东省广州市番禺区五洲建材广场店'};
    	list[60] = {'logo':'../../img/store_logos/logo_61.png','name':'兰梦诗软体家居','des':'四川省崇州市经济开发区力兴之家'};
    	list[61] = {'logo':'../../img/store_logos/logo_62.png','name':'适而居','des':'广东省广州市荔湾区芳村金海马适而居'};
    	list[62] = {'logo':'../../img/store_logos/logo_63.png','name':'迈淘家居','des':'广东省广州市南沙区去山诗意2-101铺'};
    	list[63] = {'logo':'../../img/store_logos/logo_64.png','name':'合生雅居','des':'广东省广州市番禺区德兴路339号'};
    	list[64] = {'logo':'../../img/store_logos/logo_65.png','name':'适而居','des':'广东省广州市荔湾区芳村花地大道博'};
    	list[65] = {'logo':'../../img/store_logos/logo_66.png','name':'西迈图','des':'广东省佛山市金沙洲红星美凯龙'};
    	list[66] = {'logo':'../../img/store_logos/logo_67.png','name':'品永康红木','des':'湖南省衡阳市石鼓区永兴景园'};
    	list[67] = {'logo':'../../img/store_logos/logo_68.png','name':'邦元名匠','des':'广东省广州市增城区顶好家居中心店'};
    	
    	list[68] = {'logo':'../../img/store_logos/logo_69.png','name':'邦元名匠','des':'广东省广州市增城区荔城健生西路38号'};
    	list[69] = {'logo':'../../img/store_logos/logo_70.png','name':'佰怡家','des':'广东省广州市番禺区大石红树湾店'};
    	list[70] = {'logo':'../../img/store_logos/logo_71.png','name':'阿泊罗','des':'广东省广州市花都区博皇金田家居'};
    	list[71] = {'logo':'../../img/store_logos/logo_72.png','name':'汉斯格雅','des':'广东省广州市天河区员村山顶店'};
    	list[72] = {'logo':'../../img/store_logos/logo_73.png','name':'箭牌','des':'广东省广州市南沙区居然之家3楼'};
    	list[73] = {'logo':'../../img/store_logos/logo_74.png','name':'卡丹利','des':'广东省广州市南沙区金岭水路266号'};
    	list[74] = {'logo':'../../img/store_logos/logo_75.png','name':'古登卫浴','des':'重庆市沙坪坝区石小路128号'};
    	list[75] = {'logo':'../../img/store_logos/logo_76.png','name':'柏莱雅','des':'广东省广州市增城区华美居中心2楼'};
    	list[76] = {'logo':'../../img/store_logos/logo_77.png','name':'古诺奇','des':'广东省广州市白云区白云安华汇店'};
    	list[77] = {'logo':'../../img/store_logos/logo_78.png','name':'伊仕利','des':'广东省广州市南沙区进港大道29-7号'};
    	list[78] = {'logo':'../../img/store_logos/logo_79.png','name':'金意陶瓷砖  ','des':'广东省清远市清城区美吉特华南装饰城'};
    	list[79] = {'logo':'../../img/store_logos/logo_80.png','name':'伊仕利','des':'广东省广州市陈家祠红树湾'};
    	list[80] = {'logo':'../../img/store_logos/logo_81.png','name':'科洛迪','des':'广东省佛山市家天下店'};
    	this.brandArray = list;
    }
}
	Vue.component('store-component', component);
})()