import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './filters';
import * as dayjs from 'dayjs'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  vuetify,
  dayjs,
  mounted() {
    this.$store.dispatch('STUDENTS_READ');
  },
}).$mount('#app');
