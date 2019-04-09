const vm = new Vue({
  el: '#page',
  data() {
    return {
      isMobile: false,
      newsId: '',
      detail: {},
      content: ''
    }
  },
  created() {
    this.newsId = utils.urlToObj().id;
    this.getNewsDetail();
  },
  methods: {
    judgeIsMobile() {
      
    },
    getNewsDetail() {
      this.$http(API.getAdDetail, {
        advertisementId: this.newsId
      }, res => {
        this.detail = res.data;
        this.content = res.data.content;
      })
    }
  }
})
