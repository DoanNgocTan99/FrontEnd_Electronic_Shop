import axiosClient from './axiosClient';

const userApi = {
  login(data) {
    console.log(data);
    const url = '/Accounts/login';
    return axiosClient.post(url, data);
  },
};

export default userApi;
