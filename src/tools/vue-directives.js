/**
 * 滚动加载更多
 */
Vue.directive('scroll', {
  /**
   * TODO
   * 增加节流防抖
   */
  bind(el, binding, vNode) {
    let windowHeight = window.innerHeight;
    let {
      api,
      fn
    } = binding.value;

    el.addEventListener('scroll', e => {
      let container = document.querySelector('.scroll-container');
      let bottom = parseInt(container.getBoundingClientRect().bottom);
      // console.log(container, bottom, bottom - 50, windowHeight, !ajaxArr[api], api);
      if (bottom - 50 <= windowHeight && !ajaxArr[api]) {
        // console.log(123)
        binding.value.fn();
      }
    })

  }
})

/**
 * 获取焦点
 */
Vue.directive('focus', {
  inserted(el) {
    el.focus();
  }
})
/**
 * 返回上一页
 */
Vue.directive('back', {
  bind(el, binding) {
    el.addEventListener('click', e => {
      const isLoginPage = /\/login/i.test(window.location.pathname);

      if (utils.urlToObj().share && !isLoginPage) {
        window.location.href = '../../../index.html';
      } else {
        window.history.go(-1);
      }

      // 如果返回没生效，则跳转传入的链接
      if (binding.value) {
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          window.location.href = binding.value;
        }, 300)
      }

      return false;
    })
  }
})
/**
 * 返回上一页并刷新
 * url : String
 */
Vue.directive('back-reload', {
  bind(el, binding) {
    el.addEventListener('click', e => {
      window.location.href = document.referrer;

      if (binding.value) {
        let timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          window.location.href = binding.value;
        }, 300)
      }
      return false;
    })
  }
})

/**
 * 屏蔽滚动穿透
 */
Vue.directive('stop-cover', {
  bind(el) {
    el.addEventListener('touchmove', e => {
      e.preventDefault();
      // window.event.cancelBubble=true;
      e.stopPropagation();
      return false;
    })
  }
})
/**
 * 图片加载失败
 */
Vue.directive('img-err', {
  bind(el, binding) {
    el.addEventListener('error', function() {
      this.src = binding.value || "../../img/default/products_big.png";
    })
  }
})
/**
 * 图片加载监听
 */
Vue.directive('img-load', {
  bind(el, binding) {
    const {
      src,
      loading
    } = binding.value;
    el.src = loading;
    el.dataset.loadStatus = 'loading';
  },
  update(el, binding) {
    const {
      src,
      loading,
      err
    } = binding.value;

    if (src && el.dataset.loadStatus == 'loading') {
      const imgObj = new Image();
      imgObj.src = src;

      imgObj.onload = () => {
        el.src = src;
        el.dataset.loadStatus = 'loaded';
      }

      imgObj.onerror = () => {
        el.src = err || loading;
        el.dataset.loadStatus = 'error';
      }
    } else {
      el.src = err || loading;
    }
  }
})
/**
 * 骨架屏元素
 */
Vue.directive('skeleton-el', {
  bind(el, binding, vNode) {
    if (vNode.tag !== 'img') {

      if (!el.innerText) {
        el.innerHTML = '&nbsp;'; // 提供占位符
      } else {
        el.dataset.text = el.innerText;
      }
    }

    // 使行内元素具有css定义的最小宽度并显示骨架动画，临时将行内改为行内块
    const style = window.getComputedStyle(el);
    vNode.context.$nextTick(() => {
      if (style.display === 'inline') {
        el.style.display = 'inline-block';
        el.dataset.display = 'inline';
      }
    })
    el.dataset.skeletonEl = 1;
  },
  update(el) {
    delete el.dataset.skeletonEl;
    if (el.dataset.display === 'inline') {
      el.style.display = '';
    }
  }
})
/**
 * 富文本内容的图片加载
 */
Vue.directive('rich-text-load-img', {
  bind(el, binding) {
    const callback = binding.value;

    const imgList = el.querySelectorAll('img');

    imgList.forEach(item => {
      let src = item.src;
      item.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX19fWwaZ+KAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=='; // bg #f5f5f5

      const imgObj = new Image();
      imgObj.src = src;
      item.dataset.loadStatus = 'loading';

      imgObj.onload =  () => {
        item.src = src;
        item.dataset.loadStatus = 'loaded';
        if (callback) callback(item);
      }
      imgObj.onerror = err => {
        // console.log('err:_____', err); // error 的type 无法确定有哪些值
        item.dataset.loadStatus = 'error';
        if (callback) callback(item);
      }
    })
  }
})
