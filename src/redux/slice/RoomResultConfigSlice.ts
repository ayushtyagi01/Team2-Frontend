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

interface selectedRoomTypeDetails {
  promotionTitle: string;
  priceFactor: number;
  roomTypeName: string;
  averageNightlyRateInDuration: number;
  promotionDescription: string;
}
interface Taxes{
  name:string;
  factor:number;
}

interface HotelData {
  sortType: SortType[];
  taxes:Taxes[]
  filterTypes: FilterType[];
  roomImages: RoomImage[];
  selectedRoomTypeDetails: selectedRoomTypeDetails;
  showItenaryInCardsPage: boolean;
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
  taxes:[
    {
      name:"",
      factor:0
    }
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
  selectedRoomTypeDetails: {
    promotionTitle: "",
    priceFactor: 0,
    roomTypeName: "",
    averageNightlyRateInDuration: 0,
    promotionDescription: "",
  },
  showItenaryInCardsPage: false,
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
        localStorage.setItem('taxes',JSON.stringify(response.taxes));
      return response;
    }
  }
);
export const roomResultConfigSlice = createSlice({
  name: "roomResultConfig",
  initialState,
  reducers: {
    setRoomTypeDetails: (state, action) => {
      state.selectedRoomTypeDetails = action.payload;
    },
    setShowItenaryInCardsPageToTrue: (state) => {
      state.showItenaryInCardsPage = true;
    },
    setShowItenaryInCardsPageToFalse: (state) => {
      state.showItenaryInCardsPage = false;
    },
    setShowItenaryInCardsPage: (state,action) => {
      state.showItenaryInCardsPage = action.payload;
    },
  },
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

export const {
  setRoomTypeDetails,
  setShowItenaryInCardsPageToTrue,
  setShowItenaryInCardsPageToFalse,
  setShowItenaryInCardsPage
} = roomResultConfigSlice.actions;

export const sortType = (state: RootState) => state.roomConfig.sortType;
export const filterTypes = (state: RootState) => state.roomConfig.filterTypes;
export const roomImages = (state: RootState) => state.roomConfig.roomImages;
export const selectedRoomTypeDetails = (state: RootState) =>
  state.roomConfig.selectedRoomTypeDetails;
export const showItenaryInCardsPage = (state: RootState) =>
  state.roomConfig.showItenaryInCardsPage;
export const isLoading = (state: RootState) => state.roomConfig.isLoading;

export default roomResultConfigSlice.reducer;
