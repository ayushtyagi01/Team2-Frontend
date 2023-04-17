import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface Booking {
  bookingId: string;
  roomType: string;
  guests: string;
  checkInDate: string;
  checkOutDate: string;
  promoTitle: string;
  promoDescription: string;
  nightlyRates: string;
  priceFactor: string;
  isCancelled: number;
  guestEntity: {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    emailID: string;
    sendPromoMail: number;
  };
  billingEntity: {
    id: number;
    firstName: string;
    lastName: string;
    mailingAddress1: string;
    mailingAddress2: string;
    country: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    emailID: string;
  };
  paymentInfoEntity: {
    id: number;
    cardName: string;
    expiryMonth: string;
    expiryYear: string;
  };
}

interface booking {
  bookingData: Booking;
  isLoading: boolean;
  isError: boolean;
}

const initialState: booking = {
  bookingData: {
    bookingId: "",
    roomType: "",
    guests: "",
    checkInDate: "",
    checkOutDate: "",
    promoTitle: "",
    promoDescription: "",
    priceFactor: "",
    nightlyRates: "0",
    isCancelled: 0,
    guestEntity: {
      id: 0,
      firstName: "",
      lastName: "",
      phone: "",
      emailID: "",
      sendPromoMail: 0,
    },
    billingEntity: {
      id: 0,
      firstName: "",
      lastName: "",
      mailingAddress1: "",
      mailingAddress2: "",
      country: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      emailID: "",
    },
    paymentInfoEntity: {
      id: 0,
      cardName: "",
      expiryMonth: "",
      expiryYear: "",
    },
  },
  isLoading: false,
  isError: false,
};

const bookingDataUrl: string | undefined =
  process.env.REACT_APP_BOOKING_CONFIRMATION;
export const getBookingData = createAsyncThunk(
  "bookingData/bookingConfirmation",
  async (postData: any) => {
    if (bookingDataUrl) {
      const response = await axios
        .post(bookingDataUrl, postData)
        .then((response) => response.data)
        .catch((error) => true);
      if (response === "No booking data available") {
        return true;
      }
      return response;
    }
  }
);
export const BookingConfirmationSlice = createSlice({
  name: "bookingConfirmation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookingData.fulfilled, (state, action) => {
      if (action.payload === true) {
        state.isError = true;
        return;
      }
      state.bookingData = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getBookingData.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getBookingData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const bookingData = (state: RootState) => state.bookingData.bookingData;
export const isLoading = (state: RootState) => state.bookingData.isLoading;
export const isError = (state: RootState) => state.bookingData.isError;

export default BookingConfirmationSlice.reducer;
