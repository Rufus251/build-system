import { createRouter, createWebHistory } from "vue-router";

import Auth from "../views/AuthView.vue";
import Main from "../views/MainView.vue";
import Users from "../views/UsersView.vue";
import CreateUser from "../views/CreateUserView.vue";
import EditUser from "../views/EditUserView.vue";
import Complexes from "../views/ComplexesView.vue";
import CreateComplex from "../views/CreateComplexView.vue";
import EditComplex from "../views/EditComplexView.vue";
import Reports from "../views/ReportsView.vue";
import MyReports from "../views/MyReportsView.vue";
import Report from "../views/ReportView.vue";
import Objects from "../views/ObjectsView.vue";
import CreateObject from "../views/CreateObjectView.vue";
import EditObject from "../views/EditObjectView.vue";
import CreateReport from "../views/CreateReportView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/main" },
    {
      path: "/auth",
      name: "auth",
      component: Auth,
    },
    {
      path: "/main",
      name: "main",
      component: Main,
      meta: { requiresAuth: true },
    },
    {
      path: "/users",
      name: "users",
      component: Users,
      meta: { requiresAuth: true },
    },
    {
      path: "/createUser",
      name: "createUser",
      component: CreateUser,
      meta: { requiresAuth: true },
    },
    {
      path: "/editUser/:id",
      name: "EditUser",
      component: EditUser,
      meta: { requiresAuth: true },
    },
    {
      path: "/complexes",
      name: "complexes",
      component: Complexes,
      meta: { requiresAuth: true },
    },
    {
      path: "/createComplex",
      name: "createComplex",
      component: CreateComplex,
      meta: { requiresAuth: true },
    },
    {
      path: "/editComplex/:id",
      name: "EditComplex",
      component: EditComplex,
      meta: { requiresAuth: true },
    },
    {
      path: "/objects",
      name: "objects",
      component: Objects,
      meta: { requiresAuth: true },
    },
    {
      path: "/createObject",
      name: "createObject",
      component: CreateObject,
      meta: { requiresAuth: true },
    },
    {
      path: "/editObject",
      name: "editObject",
      component: EditObject,
      meta: { requiresAuth: true },
    },
    {
      path: "/reports",
      name: "reports",
      component: Reports,
      meta: { requiresAuth: true },
    },
    {
      path: "/myReports",
      name: "myReports",
      component: MyReports,
      meta: { requiresAuth: true },
    },
    {
      path: "/report/:id",
      name: "report",
      component: Report,
      meta: { requiresAuth: true },
    },
    {
      path: "/createReport",
      name: "createReport",
      component: CreateReport,
      meta: { requiresAuth: true },
    },
  ],
});

import { useUserStore } from "../store/UserStore";
router.beforeEach((to) => {
  const store = useUserStore();
  if (to.meta.requiresAuth && !store.isAuth) return "/auth";
});

export default router;
