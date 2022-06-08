import axiosClient from './axiosClient';

const categoryApi = {
  getAll(params) {
    const url = '/Statistical/GetFullTopCustomers';
    return axiosClient.get(url, { params });
  },
  getFullLatestOrders(params) {
    const url = '/Statistical/GetFullLatestOrders';
    return axiosClient.get(url, { params });
  },

  // get(id) {
  //   const url = `/Category/${id}`;
  //   return axiosClient.get(url);
  // },

  // add(data) {
  //   const url = '/Category/Create';
  //   const token = {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     },
  //   };
  //   return axiosClient.post(url, data, token);
  // },

  // update(data) {
  //   const url = `/Category/Update/${data.id}`;
  //   const token = {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     },
  //   };
  //   return axiosClient.put(url, data, token);
  // },

  // remove(id) {
  //   const url = `/Category/${id}`;
  //   const token = {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     },
  //   };
  //   return axiosClient.delete(url, token);
  // },
};

export default categoryApi;
