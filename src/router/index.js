import { createRouter, createWebHistory } from "vue-router";

import admin from "./admin";
import director from "@/router/director";
import notFound from "@/router/notFound";
import student from "@/router/student";
import teacher from "@/router/teacher";
import auth from "@/router/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [auth, admin, director, teacher, student, notFound],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log(role);
  // if (!role) {
  //   next({ name: role });
  // }
  if ((!token || !role) && to.name !== "auth") {
    next({ name: "auth" });
  } else if (token && role && to.name === "auth") {
    next({ name: role });
  } else if (to.meta.requiresAdmin && role !== "admin") {
    next("/access-denied");
  } else if (to.meta.requiresDirector && role !== "director") {
    next("/access-denied");
  } else if (to.meta.requiresTeacher && role !== "teacher") {
    next("/access-denied");
  } else {
    return next();
  }
});

export default router;
