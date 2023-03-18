import { Routes, Route } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LandingPage from "../LandingPage/LandingPage";

const Router: React.FC = () => {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<LandingPage />}/>
        </Routes>
      <Footer />
    </>
  );
}

export default Router;