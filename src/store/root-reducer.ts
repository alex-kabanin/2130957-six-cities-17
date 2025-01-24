import { combineReducers } from '@reduxjs/toolkit';
import loadingSlice from './slices/loading';
import offersSlice from './slices/offers';
import citySlice from './slices/city';
import authorisationSlice from './slices/auth';

export const rootReducer = combineReducers({
  [loadingSlice.name]: loadingSlice.reducer,
  [offersSlice.name]: offersSlice.reducer,
  [citySlice.name]: citySlice.reducer,
  [authorisationSlice.name]: authorisationSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
