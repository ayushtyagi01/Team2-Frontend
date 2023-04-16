import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface inputs{
  label:string;
  type:string;
}
interface InputField {
  labels: inputs[];
}

interface FormSection {
  title: string;
  inputs: InputField[];
  previous: string;
  next: string;
}
interface checkoutConfig {
  checkoutForm: FormSection[];
  isLoading: boolean;
}

const initialState: checkoutConfig = {
  checkoutForm: [
    {
      title: "",
      inputs: [],
      previous: "",
      next: "",
    },
  ],
  isLoading:false
};
const checkoutConfigUrl: string | undefined =
  process.env.REACT_APP_CHECKOUT_CONFIG;
export const getCheckoutData = createAsyncThunk(
  "checkoutConfig/getData",
  async () => {
    if (checkoutConfigUrl) {
      const response = await axios
        .get(checkoutConfigUrl)
        .then((response) => response.data)
        .catch((error) => console.error(error.message));
      return response;
    }
  }
);
export const CheckoutConfigSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCheckoutData.fulfilled, (state, action) => {
        state.checkoutForm = action.payload.INFO;
        state.isLoading = false;
    });
    builder.addCase(getCheckoutData.pending, (state, action) => {
        state.isLoading = true;
    });
  },
});

export const checkoutData = (state: RootState) => state.checkoutConfig.checkoutForm;


export default CheckoutConfigSlice.reducer;
