(function() {
  let template = `
<div class="upload-menu-component">
  
  <div class="upload-menu-component-cover"
    v-show="isShowHandler"
    @click="hide"
    v-stop-cover></div>

  <transition name="upload-menu">
    <div class="upload-menu"
      v-if="isShowHandler">
      <!-- <div :class="{handler: true, show: isShowHandler}"
      v-show="isShowHandler"> -->
      <div id="div-container">
          <h2><p id="aa">aaaaaaa</p></h2>
      </div>
      
      <div  id="camera-container">
        <p id="camera">拍照</p>
        <input type="file"
          accept="image/*"
          capture="camera"
          >
      </div>
  
      <i class="horizon-bar"></i>
  
      <div id="image-container" @click.stop="hide">
        <p>从相册中选择</p>
        <input type="file"
          id="image"
          accept="image/*"
          @change="selectPic"
          >
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
        uploadObj: '', // upload实例

        isShowHandler: false,
        showFileInput: true
      }
    },
    created() {
      console.log('Qiniu:_____', Qiniu);
    },
    mounted() {

    },
    methods: {
      init(btn, container) {
        this.getQiNiuToken(() => this.initQiNiu(btn, container));
      },
      initQiNiu(btn, container) {
        let config = {
          disable_statistics_report: false, // 禁止自动发送上传统计信息到七牛，默认允许发送
          runtimes: 'html5,flash,html4', // 上传模式,依次退化
          browse_button: btn, // 上传选择的点选按钮，**必需**
          container: document.getElementById(container),
          uptoken: this.qiNiuToken,
          get_new_uptoken: false, // 设置上传文件的时候是否每次都重新获取新的 uptoken
          domain: QINIU_IMG_ROOT,
          max_file_size: '100mb', // 最大文件体积限制
          dragdrop: true, // 开启可拖曳上传
          max_retries: 5, // 上传失败最大重试次数
          chunk_size: '4mb', // 分块上传时，每块的体积
          auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
          unique_names: false, // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
          save_key: false, // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `save_key`，则开启，SDK在前端将不对key进行任何处理
          multi_selection: false,
          /* filters: {
            max_file_size: '100mb',
            prevent_duplicates: true,
            // Specify what files to browse for
            mime_types: [{
                title: "Image files",
                extensions: "jpg,jpeg,png"
              } // 限定jpg,gif,png后缀上传
            ]
          }, */
          init: {
            FilesAdded: (up, files) => {
              plupload.each(files, file => {
                // 文件添加进队列后,处理相关的事情
              });
            },
            BeforeUpload: (up, file) => {
              this.$emit('before-upload', file);
              // 每个文件上传前,处理相关的事情
            },
            UploadProgress: (up, file) => {
              // 每个文件上传时,处理相关的事情
              this.$emit('input', up.total.percent);
            },
            FileUploaded: (up, file, info) => {
              // 每个文件上传成功后,处理相关的事情
              // 其中 info.response 是文件上传成功后，服务端返回的json，形式如
              // {
              //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
              //    "key": "gogopher.jpg"
              //  }
              // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

              var domain = up.getOption('domain');
              var res = JSON.parse(info.response);
              var sourceLink = `${domain}${res.key}`; // 获取上传成功后的文件的Url
              this.$emit('on-success', sourceLink, res);
            },
            Error: (up, err, errTip) => {
              this.$emit('on-error', `${err.code}-${errTip}`);
              //上传出错时,处理相关的事情
            },
            UploadComplete: () => {
              //队列文件处理完毕后,处理相关的事情
            },
            Key: (up, file) => {
              // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
              // 该配置必须要在 unique_names: false , save_key: false 时才生效
              var key = this.createUUId() + '.jpg';
              // do something with key here
              return key;
            }
          }
        }
        console.log('config:_____', config);
        this.uploadObj = Qiniu.uploader(config);
      },
      // 创建七牛脚本
      createdQiNiuScript(cb) {
        /* let script = document.createElement('script');
        script.id = 'qiniu';
        script.src = 'https://unpkg.com/qiniu-js@2.1.0/dist/qiniu.min.js';
        document.head.appendChild(script); */

      },
      // 获取七牛token
      getQiNiuToken(cb) {
        const opt = {};
        if (this.token) opt.token = this.token;

        this.$http(API.getQiNiuToken, {},
          data => {
            this.qiNiuToken = data.data.token;
            cb()
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
        this.$nextTick(() => {
          this.init();
        })
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