
var vm = new Vue({
	el:"#city-partner",
	data:{
		form:{
			phone:'',
			code:'',
			email:'',
			company:'',
			agency:''
		},
		countDown:0,
		successTap:false
	},
	methods:{
		limitPhone(){ //限制手机号输入
	    	this.form.phone = utils.limitInput(this.form.phone, 'number',11);
	    },
	    limitCode(){ //限制验证码输入
	    	this.form.code = utils.limitInput(this.form.code, 'number',4);
	    },
	    getCode(){
	    	var VUE = this, phone = VUE.form.phone;
	    	if(phone.length == 0){
	    		VUE.$toast('请输入手机号码');
	    		return false;
	    	}
	    	if (!utils.regExpText(phone, 'mobile')) {
		      VUE.$toast('请输入正确的手机号');
		      return false;
		    }
	    	// 开启倒计时
			VUE.countDown = 60;
			VUE.triggerCountDown();
			var req= {
			    phone: VUE.form.phone,
				token: ''
			}
	    	VUE.$http(API.getLoginCaptCha, req, data => {
				VUE.$toast({
					text:'验证码已发送',
					timeout:1000,
					success:true
				});
			}, err => {
				VUE.$toast(err.msg);
			},{token:''}) 		
	    },
	    // 倒计时
		triggerCountDown() {
			this.timer = setInterval(() => {
				this.countDown -= 1;
				if (this.countDown === 0) {
					clearInterval(this.timer);
				}
			}, 1000)
		},
		submit(){
			var VUE = this;
			var phone = VUE.form.phone; 
			var code = VUE.form.code;
			var email = VUE.form.email;
			var company = VUE.form.company;
			var agency = VUE.form.agency;
			if(phone.length == 0){
	    		VUE.$toast('请输入手机号码');
	    		return false;
	    	}
			if (!utils.regExpText(phone, 'mobile')) {
		      VUE.$toast('请输入正确的手机号');
		      return false;
		    }
			if(code.length == 0){
	    		VUE.$toast('请输入验证码');
	    		return false;
	    	}
			if(email.length == 0){
	    		VUE.$toast('请输入联系邮箱');
	    		return false;
	    	}
            if (!utils.regExpText(email, 'email')) {
		      VUE.$toast('请输入有效的邮箱');
		      return false;
		    }
			if(company.length == 0){
	    		VUE.$toast('请输入公司名称');
	    		return false;
	    	}
			if(agency.length == 0){
	    		VUE.$toast('请输入合伙人姓名');
	    		return false;
	    	}
			var req = {
				phone: phone,
				captcha: code,
				email: email,
				companyName: company,
				name: agency,
				token: ''
			}
			VUE.$http(API.agentApply, req, data => {
				console.log('请求成功---'+JSON.stringify(data));
				VUE.successTap = true;
				VUE.form = {
					phone:'',
					code:'',
					email:'',
					company:'',
					agency:''
				};
				VUE.countDown = 0;
				clearInterval(VUE.timer);
			}, err => {
				VUE.form = {
					phone:'',
					code:'',
					email:'',
					company:'',
					agency:''
				};
				VUE.countDown = 0;
				clearInterval(VUE.timer);
//				if(err.code == 200943){
//					VUE.form = {
//						phone:'',
//						code:'',
//						email:'',
//						company:'',
//						agency:''
//					}
//				}
				console.log('----'+JSON.stringify(err))
				VUE.$toast(err.msg);
			},{token:''}) 	
		},
		stopScroll(){
			return false;
		},
		certain(){
			this.successTap = false;
		}
	},
	mounted: function() {
		
	},
	watch:{
	}
})