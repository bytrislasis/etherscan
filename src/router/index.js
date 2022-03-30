import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlockView from '../views/BlockView.vue'
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


]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes
})

export default router
