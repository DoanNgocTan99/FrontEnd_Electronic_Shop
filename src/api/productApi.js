import axiosClient from './axiosClient';

const productApi = {
  async getAll(params) {
    //Transform _page to _start
    const newParams = { ...params };
    newParams._start =
      !params._page || params._page <= 1
        ? 0
        : (params._page - 1) * (params._limit || 50);

    //Remove un-needed key
    delete newParams._page;

    //Fetch product list + count
    const productList = await axiosClient.get('/Product', {
      params: newParams,
    });
    const count = await axiosClient.get('/Product/count', {
      params: newParams,
    });

    //Build response and return
    return {
      data: productList,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count,
      },
    };
  },

  get(id) {
    const url = `/Product/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/Product/Create';
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    return axiosClient.post(url, data, token);
  },

  update(data) {
    const url = `/Product/${data.id}`;
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    return axiosClient.put(url, data, token);
  },

  remove(id) {
    const url = `/Product/${id}`;
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    return axiosClient.delete(url, token);
  },
};

export default productApi;
