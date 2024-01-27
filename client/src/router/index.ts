import { createRouter, createWebHistory } from 'vue-router'

import Auth from "../views/AuthView.vue"
import Main from "../views/MainView.vue"
import Users from "../views/UsersView.vue"
import CreateUser from "../views/CreateUserView.vue"
import Reports from "../views/ReportsView.vue"
import MyReports from "../views/MyReportsView.vue"
import Technical from "../views/TechnicalView.vue"
import CreateTech from "../views/CreateTechView.vue"
import CreateReport from "../views/CreateReportView.vue"

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
    {
      path: "/users",
      name: 'users',
      component: Users
    },
    {
      path: "/createUser",
      name: 'createUser',
      component: CreateUser
    },
    {
      path: "/reports",
      name: 'reports',
      component: Reports
    },
    {
      path: "/myReports",
      name: 'myReports',
      component: MyReports
    },
    {
      path: "/technical",
      name: 'technical',
      component: Technical
    },
    {
      path: "/createTech",
      name: 'createTech',
      component: CreateTech
    },
    {
      path: "/createReport",
      name: 'createReport',
      component: CreateReport
    },
     
  ]
})
 
export default router
