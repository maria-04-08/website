(function() {
  const template = `<div class="picker-component">
    <transition name="cover">
      <div v-if="isShowContainer" 
        class="picker-component-cover"
        @click="cancel"></div>
    </transition>


    <transition name="picker-component"
      @after-leave="transitionEnd">

        <div v-if="isShowContainer" 
          class="picker-container">
          
          <van-picker :show-toolbar="true"
          :title="title"
          :columns="list"
          :value-key="key"
          @cancel="cancel"
          @confirm="confirm" />
        </div>
    </transition>

  </div>`

  const component = {
    template,
    data() {
      return {
        isShow: false,
        isShowContainer: false,
        list: [],
        title: "",
        key: "text",
        isShowToolBar: true,
        onCancel: "",
        onConfirm: ""
      }
    },
    created() {

    },
    methods: {
      transitionEnd(el) {
        this.isShow = false;
      },
      cancel() {
        this.isShowContainer = false;
        if (typeof this.onCancel === "function") this.onCancel();
      },
      confirm(value, idx) {
        this.isShowContainer = false;
        if (typeof this.onConfirm === "function") this.onConfirm(value, idx);
      }
    }
  }

  const pickerConstructor = Vue.extend(component);

  Vue.prototype.$picker = (opt = {
    key: 'text',
    title: '',
    list: [
    {
      values: [
        {
          text: "杭州",
          val: 123
        },
        {
          text: "aa",
          val: 33333
        }
      ]
    },
    {
      values: [
        {
          text: "啊啊啊啊",
          val: 4444
        },
        {
          text: "阿斯顿",
          val: 66666
        }
      ]
    }
  ]
  }) => {
    let instance = new pickerConstructor().$mount(document.createElement('div'));

    Object.assign(instance, opt);
    instance.onConfirm = opt.onConfirm;
    instance.onCancel = opt.onCancel;
    document.body.appendChild(instance.$el);

    instance.isShow = true;
    instance.isShowContainer = true;
  }
})()