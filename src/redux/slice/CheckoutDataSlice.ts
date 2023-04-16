import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface booking{
  bookingId:number;
  status:"PENDING"|"SUCCESS"|"FAILED";
}
interface CheckoutData {
  bookingStatus:booking;
  isLoading: number;
}

const initialState: CheckoutData = {
  bookingStatus:{
    bookingId:0,
    status:"PENDING"
  },
  isLoading: 0,
};
const checkoutPostURl: string | undefined = process.env.REACT_APP_CHECKOUT_FORM;
export const postCheckoutData = createAsyncThunk(
  "checkoutData/bookingStatus",
  async (postData:any) => {
    if (checkoutPostURl) {
      console.log("data",postData);
      const response = await axios
        .post(checkoutPostURl, postData)
        .then((response) => response.data)
        .catch((error) => console.error(error.message));
        console.log("response", response);
        let count=0;
        while(count<50){
          const status = await axios.post(process.env.REACT_APP_BOOKING_STATUS!,{
            bookingId:response,
          }).then((status) => {
            return status.data;
          })
          .catch((error) => console.error(error.message));
          count++;
          if(status.status!=='PENDING'){
            return status;
          }
        }
      return "FAILED";
    }
  }
);
export const CheckoutDataSlice = createSlice({
  name: "bookingStatusData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postCheckoutData.fulfilled, (state, action) => {
      state.bookingStatus=action.payload;
      state.isLoading = 2;
    });
    builder.addCase(postCheckoutData.pending, (state, action) => {
      state.isLoading = 1;
    });
    builder.addCase(postCheckoutData.rejected, (state, action) => {
      state.bookingStatus.status="FAILED";
      state.isLoading = 0;
    });
  },
});

export const isLoading = (state: RootState) => state.bookingStatus.isLoading;
export const bookingStatus = (state: RootState) => state.bookingStatus.bookingStatus;


export default CheckoutDataSlice.reducer;
