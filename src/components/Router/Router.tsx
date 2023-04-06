import { Routes, Route } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LandingPage from "../LandingPage/LandingPage";
import Login from "../Login/Login";
import RoomResultPage from "../RoomResultPage/RoomResultPage";
import ChechoutPage from "../CheckoutPage/ChechoutPage";

const Router: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/room-search-results" element={<RoomResultPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<ChechoutPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Router;
