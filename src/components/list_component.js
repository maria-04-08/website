(function() {
  let template = /*html*/ `
    <div 
      class="v-scroll"
      ref="scrollDom"
    >
      <slot></slot>

      <div
        v-show="isLoading"
        class="v-scroll-loading-container"
        slot="loading"
        ref="loading"
      ></div>

      <p
        v-if="finished && list.length"
        key="v-scroll-no-result"
        class="v-scroll-no-result"
      >{{ finishText }}</p>

      <slot
        v-if="finished && page == 1 && !list.length"
        name="empty"
      >
        <div class="v-scroll-empty-result">
          <v-img :src="emptyType[emptyResultType]"></v-img>
          <p v-if="emptyResultText">{{ emptyResultText }}</p>
        </div>
      </slot>
		</div>
	`

  let component = {
    template: template,
    name: 'v-loading',
    props: {
      page: {
        type: Number,
        default: 1,
        required: true
      },
      list: {
        type: Array,
        required: true,
        default: () => []
      },
      emptyResultType: String,
      emptyResultText: String,
      finishText: {
        type: String,
        default: '到底啦~'
      },
      finished: {
        type: Boolean,
        required: true
      },
      onLoad: {
        type: Function,
        required: true
      },
      initTrigger: {
        type: Boolean,
        default: true
      },
      offset: {
        type: String,
        default: 300
      }
    },
    data() {
      return {
        bind: false, // 绑定 / 解绑 滚动监听
        isLoading: false,
        isFinished: false, // 标记整个列表加载完成


        lottie: '',
        emptyType: {
          product: '../../img/image_null_products@2x.png',
          store: '../../img/image_null_shop@2x.png'
        }
      }
    },
    computed: {
      scrollDom() {
        return this.$refs.scrollDom;
      }
    },
    watch: {
      finished(newVal) {
        this.isFinished = newVal;
      }
    },
    created() {
      if (this.initTrigger) this.load();
    },
    mounted() {
      this.initLoading();
      this.bindHandle(true);
      this.bind = true;
    },
    beforeDestroy() {
      this.bindHandle(false);
      this.lottie.destroy();
    },
    methods: {
      initLoading() {
        const config = {
          container: this.$refs.loading,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: LOADING_CONFIG
        };

        this.lottie = lottie.loadAnimation(config);
      },
      // 滚动监听
      bindHandle(bind) {
        if (this.bind !== bind) {
          this.bind = bind;
          this.scrollDom[bind ? 'addEventListener' : 'removeEventListener']('scroll', this.scroll);
        }
      },
      // 触发滚动
      scroll(e) {
        if (this.isLoading || this.isFinished) {
          // console.log('无法加载更多');
          return;
        }

        const {
          scrollTop,
          scrollHeight,
          clientHeight
        } = e.target;
        const targetBottom = scrollHeight - scrollTop - clientHeight;
        const reachBottom = targetBottom < this.offset;

        // 到达底部
        if (reachBottom) this.load();
      },
      load() {
        this.isLoading = true;
        this.onLoad()
          .then(() => this.finishLoad())
          .catch(() => this.finishLoad());
      },
      // 加载更多 事件完成
      finishLoad() {
        this.isLoading = false;
      }
    }
  }

  Vue.component('v-scroll', component);
})()
