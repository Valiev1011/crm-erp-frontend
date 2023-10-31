export default {
  path: "/admin",
  name: "admin",
  component: () => import("@/layouts/MainLayout.vue"),
  children: [
    {
      path: "/students",
      name: "students",
      component: () => import("@/pages/admin/StudentPage.vue"),
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: "/student/:id",
      name: "single_student",
      component: () => import("@/pages/admin/SingleStudent.vue"),
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: "/groups",
      name: "groups",
      component: () => import("../pages/admin/GroupPage.vue"),
      meta: {
        child: "groups",
        requiresAdmin: true,
      },
    },
    {
      path: "/groups/:id",
      name: "single_group",
      component: () => import("../pages/admin/SingleGroupPage.vue"),
      meta: {
        child: "groups",
        requiresAdmin: true,
      },
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("../pages/admin/CoursesPage.vue"),
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: "/rooms",
      name: "rooms",
      component: () => import("../pages/admin/Room.vue"),
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../pages/global/Profile.vue"),
      meta: {
        requiresAdmin: true,
      },
    },
  ],
  meta: {
    requiresAdmin: true,
  },
};
