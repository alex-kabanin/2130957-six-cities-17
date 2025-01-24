import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName } from '../../types';
import { RootState } from '../index';
import { DEFAULT_CITY, LOCATIONS, URLParams } from '../../const';
import { Slices } from '../../const';

export interface State {
  city: CityName;
}

const getInitialCity = (): CityName => {
  const params = new URLSearchParams(window.location.search);
  const cityFromURL = params.get(URLParams.City) as CityName;

  if (cityFromURL && Object.values(LOCATIONS).includes(cityFromURL)) {
    return cityFromURL;
  }

  return DEFAULT_CITY;
};

export const initialState: State = {
  city: getInitialCity(),
};

const citySlice = createSlice({
  name: Slices.City,
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<CityName>) {
      state.city = action.payload;
    },
  },
});

export const { changeCity } = citySlice.actions;

export const selectActiveCity = (state: RootState): CityName => state.city.city;

export default citySlice;
