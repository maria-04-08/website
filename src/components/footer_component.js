function createFooterTemplate() {
  let _template = /*html*/`
  <footer class="footer">
      <div class="bg"></div>
      <div class="wrapper">
        <!-- 公司信息 -->
        <div class="info">
          <p>官方邮箱&nbsp;services@alasga.cn</p>
          <p>客服热线&nbsp;400-088-3928</p>
          <p>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址&nbsp;广州市黄埔区科汇金谷一街16号601</p>
          <p>©2018&nbsp;广州阿拉私家科技有限公司&nbsp;版权所有&nbsp;&nbsp;|&nbsp;&nbsp;粤ICP备17057802号</p>
        </div>

        <!-- 二维码 -->
        <div class="qr-code">
          <div class="weixin">
            <img src="../../img/news/logo.png" />
            <p>阿拉私家公众号</p>
          </div>
          <div class="weibo">
            <img src="../../img/news/logo.png" />
            <p>阿拉私家微博</p>
          </div>
        </div>
      </div>
    </footer>
	`
  return _template;
}

let footerComponent = {
  template: createFooterTemplate(),
  props: ['active', 'fixed', 'prop-unread'],
  data() {
    return {
      unread: 0,

      // im 部分
      rcloudToken: '',
      IMClient: null,
      imInstance: null
    }
  },
  created() {
    let userInfo = utils.getUserInfo();
    const isNoticeIndexPage = /\/notice_index/ig.test(window.location.pathname);
    
    if (userInfo && !isNoticeIndexPage) {
      this.getLatestSystemNotice();
      this.getLatestOrderNotice();
      this.rcloudToken = JSON.parse(userInfo).rcloudToken;
      this.initIm();
    }
  },
  watch: {
    propUnread(newVal) {
      this.unread = newVal;
    }
  },
  methods: {
    open(idx) {
      if (idx == this.active) return false;

      const urls = [
        '../../../index.html',
        '../../pages/category-new/category.html',
        '../../pages/find/find.html',
        '../../pages/notice/notice_index.html',
        '../../pages/mine/mine.html'
      ]

      window.location.href = urls[idx];
    },
    // 获取最新一条系统消息
    getLatestSystemNotice() {
      this.$http2(API.getLatestSystemNotice, {},
        data => {
          this.unread += data.data.unreadCount;
        })
    },
    // 获取最新一条订单消息
    getLatestOrderNotice() {
      this.$http2(API.getLatestOrderNotice, {},
        data => {
          this.unread += data.data.unreadCount;
        })
    },
    // 初始化 IM
    initIm() {
      this.IMClient = RongIMClient;
      this.IMClient.init(API.appKey, null);
      this.imInstance = this.IMClient.getInstance();

      this.setListener();
      this.connect(this.rcloudToken);
    },
    //监听是否连接服务器
    setListener() {
      this.IMClient.setConnectionStatusListener({
        onChanged: status => {
          //Status 说明可参考 http://www.rongcloud.cn/docs/web_api_demo.html#init_listener
          // console.warn('WebSDK Status Changed: %d', status);
        }
      });

      this.IMClient.setOnReceiveMessageListener({
        onReceived: message => {
          this.getConversationList();
        }
      });
    },
    //连接服务器
    connect(token) {
      this.IMClient.connect(token, {
        onSuccess: id => {
          this.getConversationList();
        },
        onTokenIncorrect: () => {
          console.log('token 无效');
        },
        onError: code => {
          console.log(code);
        }
      });
    },
    //获得会话列表
    getConversationList: function() {
      var conversationTypes = null;
      this.imInstance.getConversationList({
        onSuccess: conversationList => {
          console.log('有信息来啦~~', conversationList);

          conversationList.length && conversationList.forEach(item => {
            if (item.targetId != 'KEFU151936560541594') {
              this.unread += item.unreadMessageCount;
            }
          })
        },
        onError: function(error) {
          console.log('Conversation.get Error: %s', error);
          console.log('错误~~' + JSON.stringify(error));
        }
      }, conversationTypes);
    },
  }
}

Vue.component('footer-component', footerComponent);
