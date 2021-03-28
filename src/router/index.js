import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../components/ListComponent"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("../components/CreateComponent"),
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("../components/EditComponent"),
  },
  {
    path: "/show/:id",
    name: "show",
    component: () => import("../components/ShowComponent"),
  },
  {
    path: "/delete/:id",
    name: "delete",
    component: () => import("../components/ListComponent"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
