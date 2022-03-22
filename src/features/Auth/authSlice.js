import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminApi from 'api/adminApi';
import userApi from 'api/userApi';
import StorageUser from 'constants/storage-user';
import StorageKeys from 'constants/storage-keys';
export const login = createAsyncThunk('admin/login', async (payload) => {
  const data = await adminApi.login(payload);

  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user;
});
export const loginUser = createAsyncThunk('user/login', async (payload) => {
  const data = await userApi.login(payload);

  localStorage.setItem(StorageUser.TOKEN, data.jwt);
  localStorage.setItem(StorageUser.USER, JSON.stringify(data.user));

  return data.user;
});

const authSlice = createSlice({
  name: 'admin',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    avatarUrl: '',
  },
  reducers: {
    setAvatar(state, action) {
      state.avatarUrl = action.payload;
    },

    logout(state) {
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);

      state.current = {};
    },

    logoutUser(state) {
      localStorage.removeItem(StorageUser.USER);
      localStorage.removeItem(StorageUser.TOKEN);

      state.current = {};
      state.avatarUrl = '';
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;
export const { setAvatar, logout, logoutUser } = actions;

export default reducer;
