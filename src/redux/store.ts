import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import landingPageReducer from "./slice/landingPageSlice";
import convertorReducer from "./slice/InternationalisationSlice";
import searchFormReducer from "./slice/SearchFormSlice";

export const store = configureStore({
  reducer: {
    landingData: landingPageReducer,
    convertor: convertorReducer,
    searchForm: searchFormReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
