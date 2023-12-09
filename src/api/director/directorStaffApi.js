import axiosClient from "@/api/axios/apiClient";

export const directorStaffpApi = {
  // getGroups(params) {
  //   const url = `teachers/all/q?page=${params?.page}&limit=${params?.limit}`;
  //   return axiosClient.get(url);
  // },

  getGroupById(id) {
    const url = `teachers/get-groups/${id}`;
    return axiosClient.get(url);
  },

  addStaff(payload) {
    const url = `director/add-staff`;
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

  deleteStaff(id) {
    const url = `director/delete-staff/${id}`;
    return axiosClient.delete(url);
  },

  getGroupTeacher(id) {
    const url = `groups/get-teachers/${id}`;
    return axiosClient.delete(url);
  },

  getStaffs(params) {
    const url = `director/get-staffs/q?page=${params?.page}&limit=${params?.limit}`;
    return axiosClient.get(url);
  },

  getRoles() {
    const url = `roles/all`;
    return axiosClient.get(url);
  },
};
