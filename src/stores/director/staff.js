import { defineStore } from "pinia";
import { directorStaffpApi } from "../../api/director/directorStaffApi";
export const useDirectorStaffsStore = defineStore("director-group", {
  state: () => ({
    roles: null,
    loading: false,
    error: null,
    status: null,
    group: null,
    staffs: null,
    group_teacher: null,
    student: null,
    group_student: null,
  }),
  actions: {
    async addStaff(payload) {
      try {
        this.loading = true;
        const res = await directorStaffpApi.addStaff(payload);
        this.group = res.group;
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
    async addTeacherToGroup(payload) {
      try {
        this.loading = true;
        const res = await directorStaffpApi.addTeacherToGroup(payload);
        this.group = res.group;
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
    async addStudentToGroup(payload) {
      try {
        this.loading = true;
        const res = await directorStaffpApi.addStudentToGroup(payload);
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
    async getRoles() {
      try {
        this.loading = true;
        const res = await directorStaffpApi.getRoles();
        this.roles = res;
        console.log(res, "roles");
        return res;
      } catch (error) {
        this.error = error?.response?.data;
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async getStaffs(param) {
      try {
        const res = await directorStaffpApi.getStaffs(param);
        this.staffs = res.staffs;
        console.log(res, "staffs");
        return res;
      } catch (error) {
        this.error = error?.response?.data;
        console.log(error);
        return false;
      } finally {
      }
    },
    async updateGroup(payload, param) {
      try {
        this.loading = true;
        const res = await directorStaffpApi.updateGroup(payload, param);
        this.group = res.group;
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

    async deleteStaff(param) {
      try {
        this.loading = true;
        const res = await directorStaffpApi.deleteStaff(param);
        this.group = res.group;
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

    async getGroupById(param) {
      try {
        this.loading = true;
        const res = await directorStaffpApi.getGroupById(param);
        this.groups = res.groups;
        console.log(res);
        return res.groups;
      } catch (error) {
        this.error = error?.response?.data;
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async getGroupTeacher(id) {
      try {
        this.loading = true;
        const res = await directorStaffpApi.getGroupTeacher(id);
        this.group_teacher = res.group;
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
    async getGroupStudent(id) {
      try {
        this.loading = true;
        const res = await directorStaffpApi.getGroupStudent(id);
        this.group_student = res.students;
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
