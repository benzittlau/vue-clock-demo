// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap';
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

// Load our service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => {
        // eslint-disable-next-line no-console
        console.log(`Registration was successful with scope ${registration.scope}.`);
      }, () => {
        // eslint-disable-next-line no-console
        console.log('Registration was unsuccessful.');
      });
  });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
