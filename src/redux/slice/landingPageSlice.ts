import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface GuestType {
  [key: string]: {
    title: string;
    min: number;
  };
}
interface LandingPage {
  headerLogo: string;
  pageTitle: string;
  bannerImage: string;
  lengthOfStay: number;
  typeofGuests: GuestType;
  accessability: "wheelchair" | null;
}

const initialState: LandingPage = {
  headerLogo: "",
  pageTitle: "",
  bannerImage: "",
  lengthOfStay: 0,
  typeofGuests: {},
  accessability: null,
};
const landingPageUrl:string|undefined = process.env.REACT_APP_LANDING_PAGE_URL;
export const getLandingData = createAsyncThunk(
  "landingPage/getData",
  async () => {
    if (landingPageUrl) {
      const response = await axios.get(landingPageUrl.substring(1,landingPageUrl.length-2));
      return response.data;
    }
  }
);
export const landingPageSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLandingData.fulfilled, (state, action) => {
      state.headerLogo = action.payload.headerLogo;
      state.pageTitle = action.payload.pageTitle;
      state.bannerImage = action.payload.bannerImage;
      state.lengthOfStay = action.payload.lengthOfStay;
      state.typeofGuests = action.payload.typeofGuests;
      state.accessability = action.payload.accessability;
    });
  },
});

export const headerLogo = (state: RootState) => state.landingData.headerLogo;
export const pageTitle = (state: RootState) => state.landingData.pageTitle;

export default landingPageSlice.reducer;
