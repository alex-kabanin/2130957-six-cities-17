import { ApiRoutes } from '../const';
import { dropToken, getToken, saveToken } from './token';
import { api } from '../store/index';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface LoginResponse {
  email: string;
  password: string;
  token: string;
}

export const checkAuthorisation = createAsyncThunk('authorization/checkAuth', async (_, thunkApi) => {
  try {
    const {status} = await api.get(ApiRoutes.Authorisation);
    return status;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const login = createAsyncThunk<LoginResponse, { email: string; password: string }>(
  'authorization/login',
  async (loginData, thunkApi) => {
    try {
      const { data } = await api.post<LoginResponse>(ApiRoutes.Authorisation, loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      saveToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk('authorization/logout', async (_, thunkApi) => {
  try {
    const {status} = await api.delete(ApiRoutes.Logout, { headers: {
      'Content-Type': 'application/json',
      'X-Token': getToken()}});
    dropToken();
    return status;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
