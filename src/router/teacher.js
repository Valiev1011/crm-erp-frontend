export default {
  path: "/teacher",
  name: "teacher",
  component: () => import("@/layouts/MainLayout.vue"),
  children: [
    {
      path: "/group",
      name: "group",
      component: () => import("../pages/teacher/TeacherGroupPage.vue"),
      meta: {
        child: "group",
        requiresTeacher: true,
      },
    },
    {
      path: "/group/:id",
      name: "single_teacher_group",
      component: () => import("../pages/teacher/SingleTeacherGroup.vue"),
      meta: {
        child: "group",
        requiresTeacher: true,
      },
    },
    {
      path: "/teacher_profile",
      name: "teacher_profile",
      component: () => import("../pages/global/Profile.vue"),
      meta: {
        child: "teacher_profile",
        requiresTeacher: true,
      },
    },
  ],
  meta: {
    requiresTeacher: true,
  },
};
