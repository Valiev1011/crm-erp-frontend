import axiosClient from "@/api/axios/apiClient";

export const authApi = {
  login(payload) {
    const url = "auth/login";
    return axiosClient.post(url, payload);
  },
  getProfile() {
    const url = "profile/info";
    return axiosClient.get(url);
  },
  updateImage(payload) {
    const url = "profile/upload-image";
    return axiosClient.post(url, payload);
  },
  updateProfile(payload) {
    const url = "profile/update";
    return axiosClient.put(url, payload);
  },
};
