import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Slices, AuthStatus } from '../../const';
import { checkAuthorisation, login, logout } from '../../api/auth';
import { RootState } from '../index';

export type AuthorisationStatusState = {
  status: AuthStatus;
}

const initialState: AuthorisationStatusState = {
  status: AuthStatus.Unknown,
};

const authorisationSlice = createSlice({
  name: Slices.Authorization,
  initialState,
  reducers: {
    setAuthorisationStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthorisation.fulfilled, (state, action) => {
        state.status = action.payload === 200 ? AuthStatus.Auth : AuthStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = AuthStatus.Auth;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = AuthStatus.NoAuth;
      });
  },
});

export const { setAuthorisationStatus } = authorisationSlice.actions;

export const selectAuthorisationStatus = (state: RootState): AuthStatus => state.authorization.status;

export default authorisationSlice;
