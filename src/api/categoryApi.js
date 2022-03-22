import axiosClient from './axiosClient';

const categoryApi = {
  getAll(params) {
    const url = '/categories';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/categories';
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    return axiosClient.post(url, data, token);
  },

  update(data) {
    const url = `/categories/${data.id}`;
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    return axiosClient.put(url, data, token);
  },

  remove(id) {
    const url = `/categories/${id}`;
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    return axiosClient.delete(url, token);
  },
};

export default categoryApi;
