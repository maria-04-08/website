(function() {
  let template = `
<div class="upload-menu-component">
  
  <div class="upload-menu-component-cover"
    v-show="isShowHandler"
    @click="hide"
    v-stop-cover></div>

  <transition name="upload-menu">
    <div class="upload-menu"
      v-show="isShowHandler">
      <!-- <div :class="{handler: true, show: isShowHandler}"
      v-show="isShowHandler"> -->
  
      <div @click.stop="hide">
        <p>拍照</p>
        <input type="file"
          accept="image/*"
          capture="camera"
          @change="selectPic"
          v-if="showFileInput">
      </div>
  
      <i class="horizon-bar"></i>
  
      <div @click.stop="hide">
        <p>从相册中选择</p>
        <input type="file"
          accept="image/*"
          @change="selectPic"
          v-if="showFileInput">
      </div>
      <h4 @touchend.prevent="cancel">取消</h4>
    </div>
  </transition>
</div>
`
  const component = {
    template,
    props: {
      token: String
    },
    data() {
      return {
        imgSrc: '',
        qiNiuToken: '',

        isShowHandler: false,
        showFileInput: true
      }
    },
    methods: {
      init() {
        this.createdQiNiuScript(() => {
          this.getQiNiuToken();
        })
      },
      // 创建七牛脚本
      createdQiNiuScript(cb) {
        let script = document.createElement('script');
        script.id = 'qiniu';
        script.src = 'https://unpkg.com/qiniu-js@2.1.0/dist/qiniu.min.js';
        document.head.appendChild(script);
        cb()
      },
      // 获取七牛token
      getQiNiuToken() {
        const opt = {};
        if (this.token) opt.token = this.token;
        
        this.$http(API.getQiNiuToken, {},
          data => {
            this.qiNiuToken = data.data.token
          },
          err => this.$toast(err.msg), opt)
      },
      // 创建图片唯一key
      createUUId() {
        function uuid() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (uuid() + uuid() + "-" + uuid() + "-" + uuid() + "-" + uuid() + "-" + uuid() + uuid() + uuid() + Date.now());
      },
      // 选择图片
      selectPic(e) {
        this.showFileInput = false;
        let pic = e.target.files[0];

        // 拦截图片格式
        var type = pic.type;
        if (
          type.indexOf('png') == -1 &&
          type.indexOf('jpg') == -1 &&
          type.indexOf('jpeg') == -1
        ) {
          this.showFileInput = true;
          this.$toast('请上传正确的图片');
          return;
        }

        this.$emit('before-upload', pic);
        this.upload(pic);

        this.$nextTick(() => {
          this.showFileInput = true;
        })
      },
      upload(file) {
        let token = this.qiNiuToken;
        let key = `${this.createUUId()}.jpg`;
        let config = {
          useCdnDomain: false,
          region: qiniu.region.z2
        }
        let putExtra = {
          fname: "",
          params: {},
          mimeType: null,
        }
console.log('token, key:_____', token, key, config, putExtra);
        // 调用sdk上传接口获得相应的observable，控制上传和暂停
        let observable = qiniu.upload(file, key, token, putExtra, config);

        console.log('observable:_____', observable);

        observable.subscribe(this.uploading, this.uploadError, this.uploadComplete);
      },
      // 上传成功
      uploadComplete(res) {
        console.log('uploadComplete:_____', res);

        var imgLink = qiniu.imageMogr2({
          "auto-orient": true,
          strip: true
        }, res.key, 'http://test.pic.alasga.cn/')

        this.imgSrc = imgLink;
        this.$emit('on-success', imgLink, res);
      },
      // 更新上传时的信息 会触发多次
      uploading(res) {
        console.log('uploading:_____', res);
        let percent = res.total.percent;
        this.$emit('input', percent);
      },
      // 上传失败
      uploadError(err) {
        console.log('err:_____', err);
        this.$emit('on-error', err);

        /**
         * 传输中断时得到以下对象
         * {
            code: 0
            isRequestError: true
            message: "xhr request failed, code: 0;"
            reqId: ""
          }
         */

      },
      show() {
        this.isShowHandler = true;
      },
      // 隐藏操作菜单
      hide() {
        this.isShowHandler = false;
      },
      // 取消显示操作菜单
      cancel() {
        this.isShowHandler = false;
      },
    }
  }

  Vue.component('upload-menu-component', component);
})()