import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import store from './store'; 
import router from './router'; 

Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify(),
  store, 
  router,
  render: (h) => h(App),
}).$mount('#app');
