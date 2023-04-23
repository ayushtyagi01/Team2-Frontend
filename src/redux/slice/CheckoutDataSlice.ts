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
      const response = await axios
        .post(checkoutPostURl, postData)
        .then((response) => response.data)
        .catch((error) => console.error(error.message));
        let count=0;
        while(count<50){
          const res = await axios.post(process.env.REACT_APP_BOOKING_STATUS!,{
            bookingId:response,
          }).then((res) => {
            return res.data;
          })
          .catch((error) => console.error(error.message));
          count++;
          if(res.status!=='PENDING'){
            return res;
          }
        }
      return "FAILED";
    }
  }
);
export const CheckoutDataSlice = createSlice({
  name: "bookingStatusData",
  initialState,
  reducers: {
    setLoader:(state,action)=>{
      state.isLoading=action.payload;
    }
  },
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

export const {setLoader} = CheckoutDataSlice.actions;

export default CheckoutDataSlice.reducer;
