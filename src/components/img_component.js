(function() {
  const template = /*html*/`
  <div :class="['v-img', status]">
  <transition name="v-img">
    <img class="loaded"
      :src="src"
      v-if="status === 'loaded'"
      key="loaded" />
    <img class="loading"
      :src="loadingImg"
      v-else-if="status === 'loading'"
      key="loading" />
    <img class="error"
      :src="errorImg"
      v-else-if="status === 'error'"
      key="error" />
  </transition>
</div>
`

  let component = {
    template,
    name: 'v-img',
    props: {
      src: {
        type: String
      },
      loadingType: String,
      errorType: String
    },
    data() {
      return {
        status: 'before'
      };
    },
    computed: {
      loadingImg() {
        switch (this.loadingType) {
          case 'logo':
            return '../../img/storeLogo.png';
          case 'user':
            return '../../img/default/user_medium.png';
          case 'product':
            return '../../img/default/products_small.png';
          default:
            return '../../img/skeleton/f5.png';
        }
      },
      errorImg() {
        switch (this.errorType) {
          case 'user':
          return '../../img/default/user_medium.png';
          default:
            return this.loadingImg;
        }
      }
    },
    watch: {
      src(newVal) {
        this.loadImg();
      }
    },
    created() {
      this.loadImg();
    },
    methods: {
      loadImg() {
        this.status = 'loading';
        const img = new Image();
        img.src = this.src;

        img.onload = () => {
          this.status = 'loaded';
        };

        img.onerror = err => {
          if (!this.error) this.error = this.loading;
          this.status = 'error';
        };
      }
    }
  }

  Vue.component('v-img', component);
})()