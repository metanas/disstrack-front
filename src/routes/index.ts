import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/pages/index.vue"),
      children: [
        {
          path: "",
          component: () => import("@/pages/home.vue"),
        },
        {
          path: "/track_list/:id",
          props: (route) => route.params,
          component: () => import("@/pages/track_list/index.vue"),
        },
      ],
    },
    {
      path: "/register",
      component: () => import("@/pages/register.vue"),
    },
    { path: "/:pathMatch(.*)*", component: import("@/pages/not_found.vue") },
  ], // short for `routes: routes`
});
