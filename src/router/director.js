export default {
  path: "/director",
  name: "director",
  component: () => import("@/layouts/MainLayout.vue"),
  children: [
    {
      path: "/staff",
      name: "staff",
      component: () => import("../pages/director/StaffsPage.vue"),
      meta: {
        child: "staff",
        requiresDirector: true,
      },
    },
    {
      path: "/director_profile",
      name: "director_profile",
      component: () => import("../pages/global/Profile.vue"),
      meta: {
        child: "director_profile",
        requiresDirector: true,
      },
    },
  ],
  meta: {
    requiresDirector: true,
  },
};
