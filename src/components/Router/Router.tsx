import { Routes, Route } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LandingPage from "../LandingPage/LandingPage";
import Login from "../Login/Login";
import RoomResultPage from "../RoomResultPage/RoomResultPage";
import ChechoutPage from "../CheckoutPage/ChechoutPage";
import RatingComp from "../Rating/RatingComp";
import Confirmation from "../BookingConfirmation/Confirmation";

const Router: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/room-search-results" element={<RoomResultPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<ChechoutPage />} />
        <Route path='/booking' element={<Confirmation/>}/>
        <Route path="/rate" element={<RatingComp />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Router;
