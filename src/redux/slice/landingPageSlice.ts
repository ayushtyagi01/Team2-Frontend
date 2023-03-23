import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface GuestType {
    title: string;
    min: string;
}
interface LandingPage {
  headerLogo: string;
  pageTitle: string;
  bannerImage: string;
  lengthOfStay: number;
  typeOfGuest: GuestType[];
  accessability: "wheelchair" | "";
}

const initialState: LandingPage = {
  headerLogo: "",
  pageTitle: "",
  bannerImage: "",
  lengthOfStay: 0,
  typeOfGuest: [
    {
      "title":"",
      "min":"1"
    }
  ],
  accessability: "",
};
const landingPageUrl: string | undefined =
  process.env.REACT_APP_LANDING_PAGE_URL;
export const getLandingData = createAsyncThunk(
  "landingPage/getData",
  async () => {
    if (landingPageUrl) {
      const response = await axios
        .get(landingPageUrl)
        .then((response) => response.data)
        .catch((error) => console.error(error.message));
        console.log(response.typeOfGuest);
      return response;
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
      state.typeOfGuest = action.payload.typeOfGuest;
      state.accessability = action.payload.accessability;
    });
  },
});

export const headerLogo = (state: RootState) => state.landingData.headerLogo;
export const pageTitle = (state: RootState) => state.landingData.pageTitle;
export const guests = (state: RootState) => state.landingData.typeOfGuest;

export default landingPageSlice.reducer;
