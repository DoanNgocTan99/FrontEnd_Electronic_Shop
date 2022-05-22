import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminApi from 'api/adminApi';
import userApi from 'api/userApi';
import StorageUser from 'constants/storage-user';
import StorageKeys from 'constants/storage-keys';
export const login = createAsyncThunk('admin/login', async (payload) => {
  const data = await adminApi.login(payload);

  localStorage.setItem(StorageKeys.TOKEN, data.token);
  localStorage.setItem(StorageKeys.TOKEN, data.role);
  localStorage.setItem(StorageKeys.TOKEN, data.id);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.username));
  console.log(data);

  return data.user;
});
export const loginUser = createAsyncThunk('user/login', async (payload) => {
  const data = await userApi.login(payload);

  localStorage.setItem(StorageUser.TOKEN, data.token);
  localStorage.setItem(StorageUser.USER, JSON.stringify(data.username));
  localStorage.setItem(StorageUser.ROLE, data.role);
  localStorage.setItem(StorageUser.USERID, data.id);
  localStorage.setItem(StorageUser.AVT, data.avt);
  return data.user;
});

const authSlice = createSlice({
  name: 'admin',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || null,
    avatarUrl: '',
  },
  reducers: {
    setAvatar(state, action) {
      state.avatarUrl = action.payload;
    },

    logout(state) {
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.USERID);
      localStorage.removeItem(StorageKeys.ROLE);
      localStorage.removeItem(StorageKeys.AVT);
      state.current = {};
    },

    logoutUser(state) {
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.USERID);
      localStorage.removeItem(StorageKeys.ROLE);
      localStorage.removeItem(StorageKeys.AVT);
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
