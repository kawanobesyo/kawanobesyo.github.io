import Vue from 'vue'
import Router from 'vue-router'
import NewFolder from './components/NewFolder.vue'
import NewFile from './components/NewFile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: NewFolder },
    { path: '/test', component: NewFile},
    
  ]
})