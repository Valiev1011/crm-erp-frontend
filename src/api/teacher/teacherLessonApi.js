import axiosClient from "@/api/axios/apiClient";

export const teacherLessonApi = {
  getAttendees(id, date) {
    const url = `groups/attendance/${id}`;
    console.log(date);
    return axiosClient.post(url, { date });
  },

  getLessonById(id) {
    const url = `lessons/${id}`;
    return axiosClient.get(url);
  },

  addLesson(payload) {
    const url = `lessons/create-lesson`;
    return axiosClient.post(url, payload);
  },

  addTeacherToLesson(payload) {
    const url = `lessons/add-teacher`;
    return axiosClient.post(url, payload);
  },

  addStudentToLesson(payload) {
    const url = `lessons/add-student`;
    return axiosClient.post(url, payload);
  },

  updateTeacherSingleLesson(data) {
    const url = `groups/attendance/update/lesson`;
    return axiosClient.post(url, { data });
  },

  deleteLesson(id) {
    const url = `lessons/delete/${id}`;
    return axiosClient.delete(url);
  },

  getLessonTeacher(id) {
    const url = `lessons/get-teachers/${id}`;
    return axiosClient.delete(url);
  },

  getAttendanceStudents(id) {
    const url = `groups/attendance/${id}/all/q?`;
    return axiosClient.get(url);
  },

  getAvailableRooms(form) {
    const url = `lessons/available-rooms`;
    return axiosClient.post(url, form);
  },
};
