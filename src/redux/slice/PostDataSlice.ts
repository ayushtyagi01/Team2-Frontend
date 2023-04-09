import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RoomPostData } from "../../util/roomPostData";
import { RootState } from "../store";
import { ISearchForm } from "./SearchFormSlice";

export interface RoomResult {
  roomTypeId: number;
  roomTypeName: string;
  singleBedCount: number;
  doubleBedCount: number;
  totalBedCount: number;
  areaInSqFeet: number;
  availableRoomCount: number;
  ratings: number;
  reviews: number;
  specialOffer?: string;
  specialOfferCode?: string;
  averageNightlyRateInDuration: number;
  maxCapacity: number;
  ratingCount:number;
}

interface RoomSearchResult {
  roomResults: RoomResult[];
  maxContents: number;
  isLoading: boolean;
}

const initialState: RoomSearchResult = {
  roomResults: [
    {
      roomTypeId: 0,
      roomTypeName: "",
      singleBedCount: 0,
      doubleBedCount: 0,
      totalBedCount: 0,
      areaInSqFeet: 0,
      availableRoomCount: 0,
      ratings: 0,
      reviews: 0,
      specialOffer: "",
      specialOfferCode: "",
      averageNightlyRateInDuration: 0,
      maxCapacity: 0,
      ratingCount:0,
    },
  ],
  maxContents: 0,
  isLoading: false,
};
const roomDataUrl: string | undefined = process.env.REACT_APP_ROOM_DATA;
export const getRoomData = createAsyncThunk(
  "roomData/postData",
  async (postData: RoomPostData) => {
    if (roomDataUrl) {
      const response = await axios
        .post(roomDataUrl, postData)
        .then((response) => response.data)
        .catch((error) => console.error(error.message));
      return response;
    }
  }
);
export const PostDataSlice = createSlice({
  name: "postData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomData.fulfilled, (state, action) => {
      state.roomResults = action.payload.roomResults;
      state.maxContents = action.payload.maxContents;
      state.isLoading = false;
    });
    builder.addCase(getRoomData.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const roomResults = (state: RootState) => state.roomData.roomResults;
export const maxContents = (state: RootState) => state.roomData.maxContents;
export const isLoading = (state: RootState) => state.roomData.isLoading;

export default PostDataSlice.reducer;
