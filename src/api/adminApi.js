import axiosClient from './axiosClient';

const adminApi = {
  login(data) {
    const url = '/Accounts/login';
    return axiosClient.post(url, data);
  },
};

export default adminApi;
