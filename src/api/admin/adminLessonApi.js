import axiosClient from "@/api/axios/apiClient";

export const adminLessonApi = {
  getAttendees(params) {
    const url = `lessons/all/q?page=${params?.page}&limit=${params?.limit}`;
    return axiosClient.get(url);
  },

  getLessonsByGroupId(id) {
    const url = `lessons/group/${id}/q?`;
    return axiosClient.get(url);
  },

  addLesson(payload) {
    const url = `lessons/create-lesson`;
    return axiosClient.post(url, payload);
  },

  updateLessonDescription(id, payload) {
    const url = `lessons/lesson/comment/${id}`;
    return axiosClient.put(url, payload);
  },

  addStudentToLesson(payload) {
    const url = `lessons/add-student`;
    return axiosClient.post(url, payload);
  },

  updateLesson(payload, id) {
    const url = `lessons/update/${id}`;
    return axiosClient.put(url, payload);
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
