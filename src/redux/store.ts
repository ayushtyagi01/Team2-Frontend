import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import landingPageReducer from "./slice/landingPageSlice";
import convertorReducer from "./slice/InternationalisationSlice";
import searchFormReducer from "./slice/SearchFormSlice";
import userSliceReducer  from "./slice/UserSlice";
import roomDataReducer from "./slice/PostDataSlice";
import RoomResultConfigSliceReducer from "./slice/RoomResultConfigSlice";
import checkoutReducer from "./slice/CheckoutConfigSlice";
import bookingConfirmationReducer from "./slice/BookingConfirmationSlice";
import bookingStatusReducer from "./slice/CheckoutDataSlice";


export const store = configureStore({
  reducer: {
    landingData: landingPageReducer,
    convertor: convertorReducer,
    searchForm: searchFormReducer,
    user:userSliceReducer,
    roomData: roomDataReducer,
    roomConfig:RoomResultConfigSliceReducer,
    checkoutConfig:checkoutReducer,
    bookingData:bookingConfirmationReducer,
    bookingStatus:bookingStatusReducer
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
