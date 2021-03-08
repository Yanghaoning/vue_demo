import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/reset.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCropper from 'vue-cropper'
/* 引入swiper */
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)



Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueCropper)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
