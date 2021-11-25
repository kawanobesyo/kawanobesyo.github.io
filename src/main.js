import Vue from 'vue'
import App from './App.vue'
import VueSwal from 'vue-swal'
import router from './router.js'
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
// ES6 Modules or TypeScript


// CommonJS

Vue.use(VueSwal)


Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyD_VnM2dkLhXxVdG1Mb5SxOCIHCmtRUua0",
  authDomain: "zaikokanriapp-51c89.firebaseapp.com",
  databaseURL: "https://zaikokanriapp-51c89-default-rtdb.firebaseio.com",
  projectId: "zaikokanriapp-51c89",
  storageBucket: "zaikokanriapp-51c89.appspot.com",
  messagingSenderId: "859565959137",
  appId: "1:859565959137:web:9ded35105e54a49059d4a0"
};
firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
