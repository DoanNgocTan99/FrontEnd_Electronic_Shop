import axiosClient from './axiosClient';

const userApi = {
  login(data) {
    const url = '/auth/local';
    return axiosClient.post(url, data);
  },
};

export default userApi;
