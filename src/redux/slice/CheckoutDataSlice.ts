import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RoomPostData } from "../../util/roomPostData";

interface CheckoutData {
  isLoading: boolean;
}

const initialState: CheckoutData = {
  isLoading: false,
};
const checkoutPostURl: string | undefined = process.env.REACT_APP_ROOM_DATA;
export const postCheckoutData = createAsyncThunk(
  "checkoutData/postData",
  async (postData: RoomPostData) => {
    if (checkoutPostURl) {
      console.log("data",postData);
      const response = await axios
        .post(checkoutPostURl, postData)
        .then((response) => response.data)
        .catch((error) => console.error(error.message));
        console.log("response", response);
      return response;
    }
  }
);
export const CheckoutDataSlice = createSlice({
  name: "postData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postCheckoutData.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(postCheckoutData.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});


export default CheckoutDataSlice.reducer;
