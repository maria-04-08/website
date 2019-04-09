
var vm = new Vue({
	el:"#measurement-quota",
	data:{
		form:{
			areaVal:'',
			cardNumVal:'',
			cardLimit:'',
			overdueVal:'',
			incomeVal:'',
			budgetVal:''
		},
		id:'',
		hasAmount:false,
		noAmount:false,
		finishedTap:false,
		showAgeList:false,
		dotNum1:110, //小圆心数量
		dotNum2:38, //小圆心数量
		money:'',
		showH5:false,
		screenWidth: document.body.clientWidth,
		formData:[
			{
				name:'房产价值:',
				type:'areaVal',
				list:[
					{
						value:1,
						check:'off',
						name:'低于100万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:2,
						check:'off',
						name:'100万~200万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:3,
						check:'off',
						name:'200万~300万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:4,
						check:'off',
						name:'300万~500万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:5,
						check:'off',
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
						check:'off',
						name:'5张以内（含5张）',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:2,
						check:'off',
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
						value:1,
						check:'off',
						name:'没逾期',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:2,
						check:'off',
						name:'1~5次',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:3,
						check:'off',
						name:'6~9次',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:4,
						check:'off',
						name:'10~12次',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:5,
						check:'off',
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
						check:'off',
						name:'3000元以下',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:2,
						check:'off',
						name:'3000元~5000元',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:3,
						check:'off',
						name:'5000元~8000元',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:4,
						check:'off',
						name:'8000元~1.5万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:5,
						check:'off',
						name:'1.5万~3万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:6,
						check:'off',
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
						check:'off',
						name:'8万~15万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:2,
						check:'off',
						name:'12万~20万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:3,
						check:'off',
						name:'20万~30万',
						checkImg:'../../img/measurement_quota/radio_unchecked.png'
					},
					{
						value:4,
						check:'off',
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
		totalAmount:'',
		age:['90后小姐姐','90后小哥哥','80后姐姐','80后哥哥','70后大姐姐','70后大哥哥']
		
	},
	methods:{
		limitCard(){ //已使用的信用卡额度
			this.form.cardLimit = utils.limitInput(this.form.cardLimit, 'number',3);
		},
		limitPhone(){ //限制手机号输入
	    	this.amount.phone = utils.limitInput(this.amount.phone, 'number',11);
	    },
	    changeImg(index, idx, type){
	    	this.formData[index].list.map(function(item){
	    		item.checkImg = '../../img/measurement_quota/radio_unchecked.png';
	    		item.check = 'off';
	    	});
	    	
	    	this.form[type] = this.formData[index].list[idx].value;
	    	this.formData[index].list[idx].check = 'on';
	    	this.formData[index].list[idx].checkImg = '../../img/measurement_quota/radio_checked.png';
	    	console.log(JSON.stringify(this.formData[index].list[idx]));
	    	console.log(JSON.stringify(this.form));
	    },
		submit(){ //点击立即测算
			var VUE = this;
			var form = VUE.form;
			if(form.areaVal.length == 0){
				VUE.$toast('请选择房产价值');
				return;
			}
			if(form.cardNumVal.length == 0){
				VUE.$toast('请选择持有信用卡');
				return;
			}
			if(form.cardLimit.length == 0){
				VUE.$toast('请输入已使用的信用卡额度');
				return;
			}
			if(form.overdueVal.length == 0){
				VUE.$toast('请选择近两年逾期情况');
				return;
			}
			if(form.incomeVal.length == 0){
				VUE.$toast('请选择家庭净收入');
				return;
			}
			if(form.budgetVal.length == 0){
				VUE.$toast('请选择装修建材预算');
				return;
			}
			console.log('-----'+JSON.stringify(form));
			var req= {
				houseValueType: form.areaVal,
			    cardQtyType: form.cardNumVal,
			    usedQuota:form.cardLimit ,
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
	    		VUE.formData.map(function(item){
	    			item.list.map(function(_item){
	    				_item.checkImg = '../../img/measurement_quota/radio_unchecked.png';
	    				_item.check = 'off';
//	    				console.log('----'+ JSON.stringify(_item));
	    			})
	    		})
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
		}
	},
	mounted: function() {
		var VUE = this;
		window.screenWidth = document.body.clientWidth;
		if(window.screenWidth<1200){
    		this.dotNum1 = 80;
    		this.dotNum2 = 24;
       }else{
        	this.dotNum1 = 110;
        	this.dotNum2 = 38;
        }
        if(window.screenWidth<768){
    		this.showH5 = true;
        }else{
        	this.showH5 = false;
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
		window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth;
                VUE.screenWidth = window.screenWidth;
            })()
        }
	},
	watch:{
		screenWidth (val) {
//			console.log(val)
            this.screenWidth = val;
            if(val<1200){
            	this.dotNum1 = 80;
    			this.dotNum2 = 24;
            }else{
            	this.dotNum1 = 110;
            	this.dotNum2 = 38;
            }
            if(val<768){
            	this.showH5 = true;
            }else{
            	this.showH5 = false;
            }
        }
	}
})