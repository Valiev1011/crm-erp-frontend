export default {
  path: "/room",
  name: "room",
  component: () => import("../pages/admin/Room.vue"),
  meta: {
    requiresAuth: false,
  },
};
