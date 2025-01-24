import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Place } from '../../types';
import { RootState } from '../index';
import { Slices, sortOptionNames } from '../../const';
import { SortOptionName } from '../../types';

export interface State {
  offers: Place[];
  sortOption: SortOptionName;
}

export const initialState: State = {
  offers: [],
  sortOption: sortOptionNames.Popular,
};

const offersSlice = createSlice({
  name: Slices.Offers,
  initialState,
  reducers: {
    setOffers(state, action: PayloadAction<Place[]>) {
      state.offers = action.payload;
    },
    changeSortOption(state, action: PayloadAction<string>) {
      state.sortOption = action.payload;
    },
  },
});

export const { setOffers, changeSortOption } = offersSlice.actions;

export const selectOffers = (state: RootState): Place[] => state.offers.offers;
export const selectSortOption = (state: RootState): string => state.offers.sortOption;

export default offersSlice;
