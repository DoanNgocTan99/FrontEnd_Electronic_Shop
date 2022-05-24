import axiosClient from './axiosClient';

const paymentApi = {
  getAll(params) {
    const url = '/Payment';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/Payment/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/Payment/Create';
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return axiosClient.post(url, data, token);
  },

  update(data) {
    const url = `/Payment/Update/${data.id}`;
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return axiosClient.put(url, data, token);
  },

  remove(id) {
    const url = `/Payment/${id}`;
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return axiosClient.delete(url, token);
  },
};

export default paymentApi;
