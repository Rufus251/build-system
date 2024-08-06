import { createRouter, createWebHistory } from "vue-router";

import Auth from "../views/AuthViews/AuthView.vue";
import Main from "../views/MainView.vue";
import Users from "../views/UsersViews/UsersView.vue";
import CreateUser from "../views/UsersViews/CreateUserView.vue";
import EditUser from "../views/UsersViews/EditUserView.vue";
import Complexes from "../views/ComplexViews/ComplexesView.vue";
import CreateComplex from "../views/ComplexViews/CreateComplexView.vue";
import EditComplex from "../views/ComplexViews/EditComplexView.vue";
import Reports from "../views/ReportViews/ReportsView.vue";
import MyReports from "../views/ReportViews/MyReportsView.vue";
import Report from "../views/ReportViews/ReportView.vue";
import Objects from "../views/ObjectViews/ObjectsView.vue";
import CreateObject from "../views/ObjectViews/CreateObjectView.vue";
import EditObject from "../views/ObjectViews/EditObjectView.vue";
import EditMainWork from "../views/ObjectViews/EditMainWork.vue";
import EditAdditionalWork from "../views/ObjectViews/EditAdditionalWork.vue";
import CreateReport from "../views/ReportViews/CreateReportView.vue";
import SmetaObjects from "../views/ObjectViews/SmetaObjectsView.vue";

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
      path: "/editObject/:id",
      name: "editObject",
      component: EditObject,
      meta: { requiresAuth: true },
    },
    {
      path: "/editMainWork/:rowId",
      name: "editMainWork",
      component: EditMainWork,
      meta: { requiresAuth: true },
    },
    {
      path: "/editAdditionalWork/:rowId",
      name: "editAdditionalWork",
      component: EditAdditionalWork,
      meta: { requiresAuth: true },
    },
    {
      // :main or additional / 166 for example
      path: "/editObject/reports/:workType/:workId",
      name: "SmetaObjects",
      component: SmetaObjects,
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
