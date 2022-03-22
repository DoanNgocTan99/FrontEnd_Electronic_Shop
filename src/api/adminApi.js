import axiosClient from './axiosClient';

const adminApi = {
  login(data) {
    const url = '/auth/local';
    return axiosClient.post(url, data);
  },
};

export default adminApi;
