import { defineStore } from "pinia";
import { adminGroupApi } from "../../api/admin/adminGroupApi";
export const useAdminStoreGroup = defineStore("admin-group", {
  state: () => ({
    groups: null,
    loading: false,
    error: null,
    status: null,
    group: null,
    availableRooms: null,
    group_teacher: null,
    student: null,
    group_student: null,
  }),
  actions: {
    async addGroup(payload) {
      try {
        this.loading = true;
        const res = await adminGroupApi.addGroup(payload);
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
        const res = await adminGroupApi.addTeacherToGroup(payload);
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
        const res = await adminGroupApi.addStudentToGroup(payload);
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
    async getGroups(params) {
      try {
        this.loading = true;
        const res = await adminGroupApi.getGroups(params);
        this.groups = res.groups;
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
        const res = await adminGroupApi.getAvailableRooms(form);
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
    async updateGroup(payload, param) {
      try {
        this.loading = true;
        const res = await adminGroupApi.updateGroup(payload, param);
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

    async deleteGroup(param) {
      try {
        this.loading = true;
        const res = await adminGroupApi.deleteGroup(param);
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
        const res = await adminGroupApi.getGroupById(param);
        this.group = res.group;
        console.log(res);
        return res.group;
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
        const res = await adminGroupApi.getGroupTeacher(id);
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
        const res = await adminGroupApi.getGroupStudent(id);
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
