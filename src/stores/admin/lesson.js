import { defineStore } from "pinia";
import { adminLessonApi } from "../../api/admin/adminLessonApi";
export const useAdminStoreLesson = defineStore("admin-lesson", {
  state: () => ({
    lessons: null,
    loading: false,
    error: null,
    status: null,
    lesson: null,
    availableRooms: null,
    attendance_students: null,
    student: null,
    lesson_student: null,
  }),
  actions: {
    async addLesson(payload) {
      try {
        this.loading = true;
        const res = await adminLessonApi.addLesson(payload);
        this.lesson = res.lesson;
        console.log(res);
        return res;
      } catch (error) {
        this.error = error?.response?.data;
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async updateLessonDescription(id, payload) {
      try {
        this.loading = true;
        const res = await adminLessonApi.updateLessonDescription(id, payload);
        this.lesson = res.lesson;
        console.log(res);
        return true;
      } catch (error) {
        this.error = error?.response?.data;
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async addStudentToLesson(payload) {
      try {
        this.loading = true;
        const res = await adminLessonApi.addStudentToLesson(payload);
        this.student = res;
        console.log(res);
        return true;
      } catch (error) {
        this.error = error?.response?.data;
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async getLessons(params) {
      try {
        this.loading = true;
        const res = await adminLessonApi.getLessons(params);
        this.lessons = res.lessons;
        return res?.count;
      } catch (error) {
        this.error = error?.response?.data;
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async getAvailableRooms(form) {
      try {
        const res = await adminLessonApi.getAvailableRooms(form);
        this.availableRooms = res;
        console.log(res, "available rooms");
        return res;
      } catch (error) {
        this.error = error?.response?.data;
        console.log(error);
        return false;
      } finally {
      }
    },
    async updateLesson(payload, param) {
      try {
        this.loading = true;
        const res = await adminLessonApi.updateLesson(payload, param);
        this.lesson = res.lesson;
        console.log(res);
        return true;
      } catch (error) {
        this.error = error?.response?.data;
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async deleteLesson(param) {
      try {
        this.loading = true;
        const res = await adminLessonApi.deleteLesson(param);
        this.lesson = res.lesson;
        console.log(res);
        return true;
      } catch (error) {
        this.error = error?.response?.data;
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async getLessonsByGroupId(param) {
      try {
        this.loading = true;
        const res = await adminLessonApi.getLessonsByGroupId(param);
        this.lesson = res.lessons;
        console.log(res);
        return res.lessons;
      } catch (error) {
        this.error = error?.response?.data;
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async getAttendanceStudents(id) {
      try {
        this.loading = true;
        const res = await adminLessonApi.getAttendanceStudents(id);
        this.attendance_students = res.lesson;
        console.log(res);
        return res;
      } catch (error) {
        this.error = error?.response?.data;
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async getLessonStudent(id) {
      try {
        this.loading = true;
        const res = await adminLessonApi.getLessonStudent(id);
        this.lesson_student = res.students;
        console.log(res);
        return res.students;
      } catch (error) {
        this.error = error?.response?.data;
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});
