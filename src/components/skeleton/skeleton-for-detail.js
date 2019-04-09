(function() {
  let template = `
<div class="skeleton-view">
  <div class="skeleton-view-img"></div>
  <p class="skeleton-view-p"></p>
  <p class="skeleton-view-p"
    style="width: 75%"></p>
  <p class="skeleton-view-p"
    style="width: 50%"></p>
  <div class="skeleton-view-img"></div>
  <p class="skeleton-view-p"></p>
  <p class="skeleton-view-p"
    style="width: 75%"></p>
  <p class="skeleton-view-p"
    style="width: 50%"></p>
</div>
`
  const component = {
    template
  }

  Vue.component('skeleton-for-detail', component);
})()