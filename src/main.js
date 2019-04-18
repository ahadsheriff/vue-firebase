import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import VueFire from 'vuefire'
import 'firebase/firestore'

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
export const db = firebase.firestore()

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
