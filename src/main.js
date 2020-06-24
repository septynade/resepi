import Vue from 'vue'

import titleMixin from './mixins/titleMixin'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')

Vue.mixin(titleMixin)
