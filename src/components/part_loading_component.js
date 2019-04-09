(function() {
  const template = /*html*/`
    <div class="part-loading-component">
      <div class="part-loading-component-container">
        <div>
          <p v-for="item in 12"><span></span></p>
        </div>
      </div>
    </div>
  `

  const component = {
    template
  }

  Vue.component('v-part-loading', component);
})()