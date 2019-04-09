(function() {
  let template = `
    <div class="zoom-component" >
      <!-- <div class="zoom-cover"></div> -->
      <div :class="{zoom: scale}" class="img-box" @click.self="close">
        <img :src="img" @click.self="zoom">
      </div>
    </div>
  `

  let component = {
    template,
    props: ['img'],
    data() {
      return {
        scale: false
      }
    },
    methods: {
      zoom() {
        this.scale = !this.scale;
      },
      close() {
        this.$emit('close');
      }
    }
  }

  Vue.component('zoom-component', component);
})()