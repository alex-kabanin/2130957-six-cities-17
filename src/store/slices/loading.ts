import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { Slices } from '../../const';

export interface State {
  loading: boolean;
  error: boolean;
}

export const initialState: State = {
  loading: true,
  error: false,
};

const loadingSlice = createSlice({
  name: Slices.Loading,
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = loadingSlice.actions;

export const selectLoading = (state: RootState): boolean => state.loading.loading;
export const selectError = (state: RootState): boolean => state.loading.error;

export default loadingSlice;
