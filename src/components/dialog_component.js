(function() {
  const template = `
    <div class="dialog-component" v-if="isShow">
        <div class="dialog-component-cover" v-stop-cover v-if="isShow"></div>
        
        <transition name="dialog-component">
          <div class="dialog-component-container" 
          :style="{
            backgroundColor: bg,
            color: contentColor
          }"
          v-if="isShowContainer">
            <div class="dialog-component-icon"
              v-if="icon">
              <img :src="icon" 
              v-stop-cover />
            </div>

            <h2 v-show="title">{{ title }}</h2>
            <article class="dialog-content" 
              v-show="content" 
              v-html="content"></article>

            <div class="dialog-component-btn">
              <p v-for="(item, idx) in btnList" 
                :key="'dialog-component-btn' + idx"
                :class="{active: item.active}"
                @click="onPress(item)">
                <span>{{ item.txt }}</span>
              </p>
            </div>
          </div>
        </transition>
        
    </div>
  `
    // todo 添加弹出动画
  const component = {
    template,
    data() {
      return {
        rightImg,
        warnImg
      }
    }
  }

  const DialogConstructor = Vue.extend(component);

  Vue.prototype.$dialog = function(params, btnList) {

    const dialog = new DialogConstructor({
      el: document.createElement('div'),
      data() {
        return {
          title: '',
          content: '',
          contentColor: '',
          bg: '',
          btnList: '',
          type: '',
          isShow: false,
          isShowContainer: false
        }
      },
      computed: {
        icon() {
          if (this.type === 'warn') {
            return warnImg;
          } else if (this.type === 'right') {
            return rightImg;
          } else {
            return '';
          }
        }
      },
      created() {
        this.btnList = btnList;
        Object.assign(this.$data, {
          title: '',
          content: '',
          type: 'warn'
        }, params)
      },
      methods: {
        onPress(item) {
          if (item.on) item.on();
          this.close();
        },
        show() {
          this.isShow = true;
          this.$nextTick(() => this.isShowContainer = true);
        },
        close() {
          this.isShowContainer = false;
          let timer = setTimeout(() => {
            this.isShow = false;
            clearTimeout(timer);
          }, 300)
        }
      }
    })

    document.querySelector('body').appendChild(dialog.$el);
    dialog.show();
  }

  var rightImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAYAAAAdHLWhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODA2Nzc3ZC03MzAwLWM4NDUtYjRlMi04N2Y2MjU1ZTNlNzkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTY1NzMzNUI1Q0U4MTFFOEIwMkZFRTU5QjZGRTNGQjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTY1NzMzNUE1Q0U4MTFFOEIwMkZFRTU5QjZGRTNGQjEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NmZhODBjNjAtZDM2My00ODQ4LWJjZDItMmIwYTRhNzc3NjQ1IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NmI0ODMwYzQtNzI0OS1mOTQxLWFiNTYt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';

  var warnImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAYAAAAdHLWhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRFMzZDRTNBNUNBNjExRThCRDQyOTBBODg2NDg3REYwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRFMzZDRTNCNUNBNjExRThCRDQyOTBBODg2NDg3REYwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEUzNkNFMzg1Q0E2MTFFOEJENDI5MEE4ODY0ODdERjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEUzNkNFMzk1Q0E2MTFFOEJENDI5MEE4ODY0ODdERjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5kPK/BAAAOW0lEQVR42uxd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';
})();