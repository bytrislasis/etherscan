import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlockView from '../views/BlockView.vue'
import TranferView from '../views/TranferView.vue'
import DetailView from '../views/DetailView.vue'
const routes = [

  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/block',
    name: 'block',
    component: BlockView
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: TranferView
  },
  {
    path: '/detail/:txid',
    name: 'detail',
    component: DetailView
  },


]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes
})

export default router
