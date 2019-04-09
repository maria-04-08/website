let loadingComponent = {
	template: createTemplate(),
	data() {
		return {
			isShowLoading: false
		}
	}
}

// template
function createTemplate() {
	let _template = `
    <div :class="{'loading-component': true, 'inline': el}" 
      v-show="isShowLoading" 
      key="loading" 
      @touchmove.prevent.stop.self="preventCover" 
      @touchstart.prevent.stop.self="preventCover" 
      @touchend.prevent.stop.self="preventCover">
      <p></p>
		</div>
	`
	return _template;
}


const LoadingConstructor = Vue.extend(loadingComponent);
let loadingDom = null;
setTimeout(() => {
	loadingDom = new LoadingConstructor({
		el: document.createElement('div'),
		data() {
			return {
				el: '',
				params: {
					renderer: 'svg',
					loop: true,
					autoplay: true,
					animationData: LOADING_CONFIG
				},
				queue: 0
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.params.container = this.$el.querySelector('p');
				lottie.loadAnimation(this.params);
			})
			document.querySelector('body').appendChild(this.$el);
		},
		methods: {
			preventCover() {
				return false;
			},
			log() {
				this.queue++;
			},
			changeEl(el, height) {
				this.el = el;
				let element = document.querySelector(el);
				if (height) element.style.height = height;

				element.appendChild(this.$el);
			},
			showLoading() {
				this.log();
				this.isShowLoading = true;
			},
			hideLoading(loadingContainer) {
				if (this.queue <= 1) {
					this.queue = 0;
					this.isShowLoading = false;

					if (loadingContainer) {
						document.querySelector(loadingContainer).style.display = 'none';
					}
					return;
				}
				this.queue--;
			},
			handle(arg) {
				let [arg0, arg1] = arg;

				if (typeof arg0 === 'string') {
					this.changeEl(arg0, arg1);
					this.showLoading();

				} else if (typeof arg0 === 'undefined') {
					this.showLoading();

				} else if (typeof arg0 === 'boolean' && arg0 === false) {
					this.hideLoading(arg1);

				}
			}
		}
	})
}, 0)

/**
 * $loading()
 * $loading(false)
 * $loading('#app')
 */

Vue.prototype.$loading = function (boolean, el) {
	setTimeout(() => {
		loadingDom.handle(arguments);
	}, 0)
}
