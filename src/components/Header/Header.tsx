import { useEffect } from "react";
import {
  getLandingData,
  headerLogo,
  pageTitle,
} from "../../redux/slice/landingPageSlice";
import {
  changeLang,
  getCurrencyData,
  selectedCurrency,
} from "../../redux/slice/InternationalisationSlice";
import LanguageIcon from "@mui/icons-material/Language";
import "./Header.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FormattedMessage } from "react-intl";

/**
Header functional component
@returns {JSX.Element}
*/
function Header(): JSX.Element {
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
    reduxDispatch(getLandingData());
  }, [reduxDispatch]);

  /**
useEffect to make a call to API to get currency factors
*/
  useEffect(() => {
    reduxDispatch(getCurrencyData());
    const interval = setInterval(() => {
      reduxDispatch(getCurrencyData());
    }, 1000 * 60 * 60 * 2);
    return () => clearInterval(interval);
  }, [reduxDispatch]);

  const headerLogoHere = useAppSelector(headerLogo);
  const pageTitlehere = useAppSelector(pageTitle);

  /**
Handles language change
stores current user selected language in redux
@param {React.ChangeEvent<HTMLSelectElement>} e - The select event
*/
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    reduxDispatch(changeLang(e.target.value));
  };

  /**
Handles currency change stores current user selected 
currency type in redux
@param {React.ChangeEvent<HTMLSelectElement>} e - The select event
*/
  const handleCurrencyChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    reduxDispatch(selectedCurrency(e.target.value));
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-title">
          <div className="img-container">
            <img src={headerLogoHere} alt="" />
          </div>
          <div className="title">
            <FormattedMessage id="pageTitle" defaultMessage={pageTitlehere} />
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
          <select onChange={(e) => handleCurrencyChange(e)}>
            <option className="options" value="USD">
              $ USD
            </option>
            <option className="options" value="INR">
              ₹ INR
            </option>
            <option className="options" value="EUR">
              € EUR
            </option>
            ;
          </select>
        </div>
      </div>
    </div>
  );
}

export default Header;
