import {createRouter, createWebHashHistory} from "vue-router";

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../pages/index.vue")
    }
  ], // short for `routes: routes`
})
