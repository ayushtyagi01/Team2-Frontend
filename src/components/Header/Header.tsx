import { useEffect } from "react";
import {
  getLandingData,
  headerLogo,
  pageTitle,
} from "../../redux/slice/landingPageSlice";
import LanguageIcon from "@mui/icons-material/Language";
import "./Header.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

function Header() {
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
    reduxDispatch(getLandingData());
  }, [reduxDispatch]);

  const headerLogoHere = useAppSelector(headerLogo);
  const pageTitlehere = useAppSelector(pageTitle);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
   
  };
  const handleCurrencyChange = () => {};

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-title">
          <div className="img-container">
            <img src={headerLogoHere} alt="" />
          </div>
          <div className="title">
            {pageTitlehere}
          </div>
        </div>
        <div className="convertor-div">
          <LanguageIcon className="lang-icon" key="language-icon" />
          <select onChange={(e) => handleLanguageChange(e)}>
            <option className="options" value="en">
              En
            </option>
            ;
            <option className="options" value="fr">
              Fr
            </option>
            ;
          </select>
          <select onChange={handleCurrencyChange}>
            <option className="options" value="Dollor">
              $ USD
            </option>
            
            <option className="options" value="Rupee">
              ₹ INR
            </option>
            
            <option className="options" value="Euro">
              € EUR
            </option>
            
          </select>
        </div>
      </div>
    </div>
  );
}

export default Header;
