import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface SortType {
  sortValue: string;
  value: string;
  sortOrder: "ASC" | "DESC";
}

interface FilterType {
  filterTypeName: string;
  value: string;
  maxAttributes: number;
  filterOptions: string[];
}

interface RoomImage {
  roomTypeName: string;
  customName: string;
  images: string[];
  description: string;
  amnetieis: string[];
}

interface HotelData {
  sortType: SortType[];
  filterTypes: FilterType[];
  roomImages: RoomImage[];
  isLoading: boolean;
}

const initialState: HotelData = {
  sortType: [
    {
      sortValue: "",
      value: "",
      sortOrder: "ASC",
    },
  ],
  filterTypes: [
    {
      filterTypeName: "",
      value: "",
      maxAttributes: 0,
      filterOptions: [],
    },
  ],
  roomImages: [
    {
      roomTypeName: "",
      customName: "",
      images: [],
      description: "",
      amnetieis: [],
    },
  ],
  isLoading: false,
};
const roomResultsConfig: string | undefined = process.env.REACT_APP_ROOM_CONFIG;
export const getRoomConfig = createAsyncThunk(
  "roomResults/getData",
  async () => {
    if (roomResultsConfig) {
      const response = await axios
        .get(roomResultsConfig)
        .then((response) => response.data)
        .catch((error) => console.error(error.message));
      return response;
    }
  }
);
export const roomResultConfigSlice = createSlice({
  name: "roomResultConfig",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomConfig.fulfilled, (state, action) => {
      state.sortType = action.payload.sortType;
      state.filterTypes = action.payload.filterTypes;
      state.roomImages = action.payload.roomImages;
      state.isLoading = false;
    });
    builder.addCase(getRoomConfig.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const sortType = (state: RootState) => state.roomConfig.sortType;
export const filterTypes = (state: RootState) => state.roomConfig.filterTypes;
export const roomImages = (state: RootState) => state.roomConfig.roomImages;
export const isLoading = (state: RootState) => state.roomConfig.isLoading;

export default roomResultConfigSlice.reducer;
