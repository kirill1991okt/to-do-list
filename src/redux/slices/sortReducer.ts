import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export enum sortState {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}

const initialState = sortState.ALL;

export const sortReducer = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    changeSort: (state, action: PayloadAction<sortState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { changeSort } = sortReducer.actions;

export const selectSort = (state: RootState) => state.sort;

export default sortReducer.reducer;
