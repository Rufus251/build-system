import { createRouter, createWebHistory } from 'vue-router'

import Auth from "../views/AuthView.vue"
import Main from "../views/MainView.vue"
import Users from "../views/UsersView.vue"
import CreateUser from "../views/CreateUserView.vue"
import Reports from "../views/ReportsView.vue"
import MyReports from "../views/MyReportsView.vue"
import Report from "../views/ReportView.vue"
import Technical from "../views/TechnicalView.vue"
import CreateTech from "../views/CreateTechView.vue"
import CreateReport from "../views/CreateReportView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: 'auth',
      component: Auth
    },
    {
      path: "/main",
      name: 'main',
      component: Main,
      meta: { requiresAuth: true }
    },
    {
      path: "/users",
      name: 'users',
      component: Users,
      meta: { requiresAuth: true }
    },
    {
      path: "/createUser",
      name: 'createUser',
      component: CreateUser,
      meta: { requiresAuth: true }
    },
    {
      path: "/reports",
      name: 'reports',
      component: Reports,
      meta: { requiresAuth: true }
    },
    {
      path: "/report/:id",
      name: 'report',
      component: Report,
      meta: { requiresAuth: true }
    },
    {
      path: "/myReports",
      name: 'myReports',
      component: MyReports,
      meta: { requiresAuth: true }
    },
    {
      path: "/technical",
      name: 'technical',
      component: Technical,
      meta: { requiresAuth: true }
    },
    {
      path: "/createTech",
      name: 'createTech',
      component: CreateTech,
      meta: { requiresAuth: true }
    },
    {
      path: "/createReport",
      name: 'createReport',
      component: CreateReport,
      meta: { requiresAuth: true }
    },

  ]
})

import { useUserStore } from "../store/UserStore"
router.beforeEach((to) => {
  const store = useUserStore()
  if (to.meta.requiresAuth && !store.isAuth) return '/auth'
})

export default router
