import axiosClient from "@/api/axios/apiClient";

export const teacherGroupApi = {
  // getGroups(params) {
  //   const url = `teachers/all/q?page=${params?.page}&limit=${params?.limit}`;
  //   return axiosClient.get(url);
  // },

  getGroupById(id) {
    const url = `teachers/get-groups/${id}`;
    return axiosClient.get(url);
  },

  addGroup(payload) {
    const url = `groups/create-group`;
    return axiosClient.post(url, payload);
  },

  addTeacherToGroup(payload) {
    const url = `groups/add-teacher`;
    return axiosClient.post(url, payload);
  },

  addStudentToGroup(payload) {
    const url = `groups/add-student`;
    return axiosClient.post(url, payload);
  },

  updateGroup(payload, id) {
    const url = `groups/update/${id}`;
    return axiosClient.put(url, payload);
  },

  deleteGroup(id) {
    const url = `groups/delete/${id}`;
    return axiosClient.delete(url);
  },

  getGroupTeacher(id) {
    const url = `groups/get-teachers/${id}`;
    return axiosClient.delete(url);
  },

  getGroupStudent(id) {
    const url = `groups/all-students/${id}`;
    return axiosClient.get(url);
  },

  getAvailableRooms(form) {
    const url = `groups/available-rooms`;
    return axiosClient.post(url, form);
  },
};
