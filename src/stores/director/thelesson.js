import { defineStore } from "pinia";
import { teacherLessonApi } from "../../api/teacher/teacherLessonApi";
export const useTeacherStoreLesson = defineStore("director-lesson", {
  state: () => ({
    attendes: null,
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
        const res = await teacherLessonApi.addLesson(payload);
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
    async addTeacherToLesson(payload) {
      try {
        this.loading = true;
        const res = await teacherLessonApi.addTeacherToLesson(payload);
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
        const res = await teacherLessonApi.addStudentToLesson(payload);
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
    async getAttendees(id, payload) {
      try {
        this.loading = true;
        const res = await teacherLessonApi.getAttendees(id, payload);
        this.attendes = res;
        return res;
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
        const res = await teacherLessonApi.getAvailableRooms(form);
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
    async updateTeacherSingleLesson(payload) {
      try {
        this.loading = true;
        const res = await teacherLessonApi.updateTeacherSingleLesson(payload);
        this.lesson = res;
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

    async deleteLesson(param) {
      try {
        this.loading = true;
        const res = await teacherLessonApi.deleteLesson(param);
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

    async getLessonById(param) {
      try {
        this.loading = true;
        const res = await teacherLessonApi.getLessonById(param);
        this.lesson = res.lesson;
        console.log(res);
        return res.lesson;
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
        const res = await teacherLessonApi.getAttendanceStudents(id);
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
        const res = await teacherLessonApi.getLessonStudent(id);
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
