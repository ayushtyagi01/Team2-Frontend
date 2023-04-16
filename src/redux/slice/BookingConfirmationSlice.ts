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
  priceFactor:string;
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
      priceFactor:"",
      nightlyRates: "0",
      isCancelled: 0,
      guestEntity: {
        id: 0,
        firstName: "",
        lastName: "",
        phone: "",
        emailID: "",
        sendPromoMail: 0
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
        emailID: ""
      },
      paymentInfoEntity: {
        id: 0,
        cardName: "",
        expiryMonth: "",
        expiryYear: ""
      }
  },
  isLoading: false,
};
const bookingDataUrl: string | undefined = process.env.REACT_APP_BOOKING_CONFIRMATION;
export const getBookingData = createAsyncThunk(
  "bookingData/bookingConfirmation",
  async (postData:any) => {
    if (bookingDataUrl) {
      console.log("request",postData);
      const response = await axios
        .post(bookingDataUrl, postData)
        .then((response) => response.data)
        .catch((error) => console.error(error.message));
        console.log(response);
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
      state.bookingData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getBookingData.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const bookingData = (state: RootState) => state.bookingData.bookingData;
export const isLoading = (state: RootState) => state.roomData.isLoading;

export default BookingConfirmationSlice.reducer;
