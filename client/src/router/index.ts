import { createRouter, createWebHistory } from 'vue-router'

import Auth from "../views/AuthView.vue"
import Main from "../views/MainView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: 'auth',
      component: Auth
    },
    {
      path: "/main",
      name: 'main',
      component: Main
    },
     
  ]
})
 
export default router
