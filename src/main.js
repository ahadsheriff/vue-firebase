import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

Vue.component('vue-phone-number-input', VuePhoneNumberInput);

Vue.config.productionTip = false;

let app = '';
const config = {
    apiKey: "AIzaSyDARVg6b3tZTTiEeGJXwYuWS8v2SpkOKlc",
    authDomain: "roundup-service.firebaseapp.com",
    databaseURL: "https://roundup-service.firebaseio.com",
    projectId: "roundup-service",
    storageBucket: "roundup-service.appspot.com",
    messagingSenderId: "454234840328"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
