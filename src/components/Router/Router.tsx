import { Routes, Route } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LandingPage from "../LandingPage/LandingPage";
import Login from "../Login/Login";
import RoomResultPage from "../RoomResultPage/RoomResultPage";
import ChechoutPage from "../CheckoutPage/ChechoutPage";
import RatingComp from "../Rating/RatingComp";
import Confirmation from "../BookingConfirmation/Confirmation";
import ConfigurationPage from "../ConfigurationPage/ConfigurationPage";
import BookingPage from "../BookingPage/BookingPage";
import { useEffect } from "react";
import ReactGA from "react-ga";

const Router: React.FC = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/room-search-results" element={<RoomResultPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<ChechoutPage />} />
        <Route path="/booking" element={<Confirmation />} />
        <Route path="/rate" element={<RatingComp />} />
        <Route path="/configuration" element={<ConfigurationPage />} />
        <Route path="/my-booking" element={<BookingPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Router;
