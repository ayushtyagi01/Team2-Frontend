import {createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};


export const landingPageSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
  },
});

export default landingPageSlice.reducer;