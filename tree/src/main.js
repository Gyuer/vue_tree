import Vue from 'vue';
import ElementUI from 'element-ui';
import VueResource from 'vue-resource';
import 'element-ui/lib/theme-default/index.css';
import router from './router';
import App from './App.vue';
import util from './util/util'


Vue.use(ElementUI);
Vue.use(VueResource);
Vue.prototype.$utilHelper = util;


new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
