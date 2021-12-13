import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import { store } from "../store";

const isAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if (!store.getters.isAuth) {
    next("/login");
    return false;
  }
  return next();
};

const isNotAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if (store.getters.isAuth) {
    next("/");
    return false;
  }
  return next();
};

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes: [
    {
      path: "/settings",
      beforeEnter: isAuth,
      component: () => import("@/pages/index.vue"),
      children: [],
    },
    {
      path: "/",
      component: () => import("@/pages/home.vue"),
    },
    {
      path: "/track_list/:id",
      props: (route) => route.params,
      component: () => import("@/pages/track_list/index.vue"),
    },
    {
      path: "/login",
      beforeEnter: isNotAuth,
      component: () => import("@/pages/login.vue"),
    },
    {
      path: "/register",
      beforeEnter: isNotAuth,
      component: () => import("@/pages/register.vue"),
    },
    { path: "/:pathMatch(.*)*", component: import("@/pages/not_found.vue") },
  ], // short for `routes: routes`
});
