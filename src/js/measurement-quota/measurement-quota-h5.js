
var vm = new Vue({
	el:"#measurement-quota-h5",
	data() {
      return {
      	showCategory:false,
      	showFooter:false,
      	money:'',
      	slots1: [
	        {
	          flex: 1,
	          values: [{name:'低于100万',value:1},{name:'100万~200万',value:2},{name:'200万~300万',value:3},{name:'300万~500万',value:4}, {name:'500万以上',value:5}],
	          className: 'slot1',
	          textAlign: 'center',
	          defaultIndex: 0
	        }
	    ],
	    slots2: [
	        {
	          flex: 1,
	          values: [{name:'5张以内（含5张）',value:1},{name:'5张以上',value:2}],
	          className: 'slot1',
	          textAlign: 'center',
	          defaultIndex: 0
	        }
	    ],
	    slots3: [
	        {
	          flex: 1,
	          values: [{name:'没逾期',value:1},{name:'1~5次',value:2},{name:'6~9次',value:3},{name:'10~12次',value:4},{name:'12次以上',value:5}],
	          className: 'slot1',
	          textAlign: 'center',
	          defaultIndex: 0
	        }
	    ],
	    slots4: [
	        {
	          flex: 1,
	          values: [{name:'3000元以下',value:1},{name:'3000元~5000元',value:2},{name:'5000元~8000元',value:3},{name:'8000元~1.5万',value:4} ,{name:'1.5万~3万',value:5},{name:'3万以上',value:6}],
	          className: 'slot1',
	          textAlign: 'center',
	          defaultIndex: 0
	        }
	    ],
	    slots5: [
	        {
	          flex: 1,
	          values: [{name:'8万~15万',value:1}, {name:'12万~20万',value:2},{name:'20万~30万',value:3}, {name:'30万~50万',value:4}],
	          className: 'slot1',
	          textAlign: 'center',
	          defaultIndex: 0
	        }
	    ],
        form:{
			areaVal:'',
			cardNumVal:'',
			cardLimit:'',
			overdueVal:'',
			incomeVal:'',
			budgetVal:''
		},
		inputVal:{
			areaVal:'',
			cardNumVal:'',
			cardLimit:'',
			overdueVal:'',
			incomeVal:'',
			budgetVal:''
		},
		show:{
			area:false,
			cardNum:false,
			cardLimit:false,
			overdueVal:false,
			incomeVal:false,
			budgetVal:false
		},
		id:'',
		hasAmount:false,
		noAmount:false,
		finishedTap:false,
		formData:[
			{
				name:'房产价值:',
				type:'areaVal',
				list:[
					{
						value:1,
						name:'低于100万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:2,
						name:'100万~200万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:3,
						name:'200万~300万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:4,
						name:'300万~500万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:5,
						name:'500万以上',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					}
				]
			},
			{
				type:'cardNumVal',
				name:'持有信用卡:',
				list:[
					{
						value:1,
						name:'5张以内（含5张）',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:2,
						name:'5张以上',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					}
				]
			},
			{
				type:'cardLimit',
				name:'已用信用卡额度:',
				list:[]
			},
			{
				type:'overdueVal',
				name:'近两年逾期情况:',
				list:[
					{
						value:3,
						name:'没逾期',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:4,
						name:'1~5次',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:5,
						name:'6~9次',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:6,
						name:'10~12次',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:7,
						name:'12次以上',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					}
				]
			},
			{
				type:'incomeVal',
				name:'家庭月净收入:',
				list:[
					{
						value:1,
						name:'3000元以下',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:2,
						name:'3000元~5000元',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:3,
						name:'5000元~8000元',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:4,
						name:'8000元~1.5万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:5,
						name:'8000元~1.5万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:6,
						name:'1.5万~3万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:7,
						name:'3万以上',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					}
				]
			},
			{
				type:'budgetVal',
				name:'装修预算（硬装、软装）:',
				list:[
					{
						value:1,
						name:'8万~15万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:2,
						name:'12万~20万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:3,
						name:'20万~30万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:4,
						name:'30万~50万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					}
				]
			}
		],
		amount:{
			name:'',
			age:'',
			phone:''
		},
		showAgeList:false,
		totalAmount:'',
		age:['90后小姐姐','90后小哥哥','80后姐姐','80后哥哥','70后大姐姐','70后大哥哥']
      }
    },
	methods:{
	    setAreaVal(){
	    	var VUE = this;
	    	var picker1= VUE.$refs.picker1;
	    	VUE.form.areaVal = picker1.getValues()[0].value;
	    	VUE.inputVal.areaVal = picker1.getValues()[0].name;
	    	VUE.show.area = false;
	    	var setIndex = '';
			for(let i=0;i<VUE.slots1[0].values.length;i++){
				if(VUE.slots1[0].values[i].value == VUE.form.areaVal){
					setIndex = i;
				}
			}
			VUE.slots1[0].defaultIndex = setIndex;
	    },
	    setCardNum(){
	    	var VUE = this;
	    	var picker = VUE.$refs.picker2;
	    	VUE.form.cardNumVal = picker.getValues()[0].value;
	    	VUE.inputVal.cardNumVal = picker.getValues()[0].name;
	    	VUE.show.cardNum = false;
	    	var setIndex = '';
			for(let i=0;i<VUE.slots2[0].values.length;i++){
				if(VUE.slots2[0].values[i].value == VUE.form.cardNumVal){
					setIndex = i;
				}
			}
			VUE.slots2[0].defaultIndex = setIndex;
	    },
	    setOverdueVal(){
	    	var VUE = this;
	    	var picker = VUE.$refs.picker3;
	    	VUE.form.overdueVal = picker.getValues()[0].value;
	    	VUE.inputVal.overdueVal = picker.getValues()[0].name;
	    	VUE.show.overdueVal = false;
	    	var setIndex = '';
			for(let i=0;i<VUE.slots3[0].values.length;i++){
				if(VUE.slots3[0].values[i].value == VUE.form.overdueVal){
					setIndex = i;
				}
			}
			VUE.slots3[0].defaultIndex = setIndex;
	    },
	    setIncomeVal(){
	    	var VUE = this;
	    	var picker = VUE.$refs.picker4;
	    	VUE.form.incomeVal = picker.getValues()[0].value;
	    	VUE.inputVal.incomeVal = picker.getValues()[0].name;
	    	VUE.show.incomeVal = false;
	    	var setIndex = '';
			for(let i=0;i<VUE.slots4[0].values.length;i++){
				if(VUE.slots4[0].values[i].value == VUE.form.incomeVal){
					setIndex = i;
				}
			}
			VUE.slots4[0].defaultIndex = setIndex;
	    },
	    setBudgetVal(){
	    	var VUE = this;
	    	var picker = VUE.$refs.picker5;
	    	VUE.form.budgetVal = picker.getValues()[0].value;
	    	VUE.inputVal.budgetVal = picker.getValues()[0].name;
	    	VUE.show.budgetVal = false;
	    	var setIndex = '';
			for(let i=0;i<VUE.slots5[0].values.length;i++){
				if(VUE.slots5[0].values[i].value == VUE.form.budgetVal){
					setIndex = i;
				}
			}
			VUE.slots5[0].defaultIndex = setIndex;
	    },
	    onInput(){
	    	let _this = this
			setTimeout(function () {
			_this.$refs.inputBox.focus();
			}, 1)	
	    },
		limitCard(){ //已使用的信用卡额度
			var text_length = this.inputVal.cardLimit.length;//获取当前文本框的长度
			if(text_length<4){
	        	var current_width = parseInt(text_length)*10;//该16是改变前的宽度除以当前字符串的长度,算出每个字符的长度
	        	$('.used-amount input').css("width",current_width+"px");
			}
			this.inputVal.cardLimit = utils.limitInput(this.inputVal.cardLimit, 'number',3);
		},
		limitPhone(){ //限制手机号输入
	    	this.amount.phone = utils.limitInput(this.amount.phone, 'number',11);
	    },
	    changeImg(index, idx, type){
	    	this.formData[index].list.map(function(item){
	    		item.checkImg = '../../img/measurement_quota/radio_unchecked.png';
	    	});
	    	this.form[type] = this.formData[index].list[idx].value;
	    	this.formData[index].list[idx].checkImg = '../../img/measurement_quota/radio_checked.png';
	    	console.log(JSON.stringify(this.form));
	    },
	    stopScroll(){
	    	return false;
	    },
		submit(){ //点击立即测算
			var VUE = this;
			var inputVal = VUE.inputVal, form = VUE.form;
			if(inputVal.areaVal.length == 0){
				VUE.$toast('请选择房产价值');
				return;
			}
			if(inputVal.cardNumVal.length == 0){
				VUE.$toast('请选择持有信用卡');
				return;
			}
			if(inputVal.cardLimit.length == 0){
				VUE.$toast('请输入已使用的信用卡额度');
				return;
			}
			if(inputVal.overdueVal.length == 0){
				VUE.$toast('请选择近两年逾期情况');
				return;
			}
			if(inputVal.incomeVal.length == 0){
				VUE.$toast('请选择家庭净收入');
				return;
			}
			if(inputVal.budgetVal.length == 0){
				VUE.$toast('请选择装修建材预算');
				return;
			}
			console.log('-----'+JSON.stringify(form));
			console.log('cardLimit----------'+inputVal.cardLimit);
			var req= {
				houseValueType: form.areaVal,
			    cardQtyType: form.cardNumVal,
			    usedQuota:inputVal.cardLimit ,
			    overdueStatType: form.overdueVal,
			    familyIncomeType: form.incomeVal,
			    materialsBudgetType: form.budgetVal,
			    token: ''
			}
			VUE.$loading();
	    	VUE.$http(API.submitReckonQuota, req, data => {
	    		VUE.$loading(false);
	    		VUE.finishedTap = true;
	    		VUE.id = data.data.reckonQuota.id;
	    		VUE.form.cardLimit = '';
	    		VUE.inputVal = {
	    			areaVal:'',
					cardNumVal:'',
					cardLimit:'',
					overdueVal:'',
					incomeVal:'',
					budgetVal:''
	    		}
				console.log('---'+JSON.stringify(data.data));
			}, err => {
				VUE.$loading(false);
				VUE.$toast(err.msg);
			},{token:''})
		},
		getReckonQuota(){
			var VUE = this;
			var amount = VUE.amount;
			if(amount.name.length == 0){
				VUE.$toast('请输入姓名');
				return;
			}
			if(amount.phone.length == 0){
				VUE.$toast('请输入手机号码');
				return;
			}
			if (!utils.regExpText(amount.phone, 'mobile')) {
		      VUE.$toast('请输入正确的手机号');
		      return false;
		    }
			if(amount.age.length == 0){
				VUE.$toast('请选择年龄段');
				return;
			}
			VUE.$loading();
			var req = {
				reckonQuotaId: VUE.id,
			    userAge: amount.age,
			    userName: amount.name,
			    userPhone: amount.phone,
			    token: '',
			}
	    	VUE.$http(API.getReckonQuota, req, data => {
	    		VUE.$loading(false);
	    		VUE.finishedTap = false; 
	    		VUE.amount = {
					name:'',
					age:'',
					phone:''
				}
	    		console.log('---'+JSON.stringify(data.data.reckonQuota));
	    		var data = data.data.reckonQuota;
	    		if(data.resultType == 1){ //有测算结果
	    			if(data.result.indexOf('万') !== -1){
	    				data.result = data.result.substring(0,data.result.indexOf('万'));
	    				VUE.money = '万';
	    			}else if(data.result.indexOf('元') !== -1){
	    				data.result = data.result.substring(0,data.result.indexOf('元'));
	    				VUE.money = '元';
	    			}
	    			VUE.totalAmount = data.result;
	    			VUE.hasAmount = true;
	    		}else if(data.resultType == 0){ //无测算结果
	    			VUE.noAmount = true;
	    		}
			}, err => {
				VUE.$loading(false);
				VUE.$toast(err.msg);
			},{token:''})
		},
		showAreaPick(){
			document.getElementById('pickerBox').scrollIntoView(false);
		}
	},
	mounted: function() {
		var VUE = this;
		var obj = utils.urlToObj();
		if(obj.footer){
			VUE.showFooter = true;
		}
		$(document).bind('click', function(e) {
			var e = e || window.event; //浏览器兼容性 
			var elem = e.target || e.srcElement;
			while (elem) { //循环判断至跟节点，防止点击的是div子元素 
				if (elem.id && elem.id == 'age-box') {
					return;
				}
				elem = elem.parentNode;
			}
			VUE.showAgeList = false;
		});
	},
	watch:{
		finishedTap:function(val){
			var VUE = this;
			if(val){
				$('body').css('position','fixed');
//				VUE.stopScroll(); //解决滑动穿透问题
			}else{
				$('body').css('position','relative');
//				VUE.releaseScroll();
			}
		}
	}
})