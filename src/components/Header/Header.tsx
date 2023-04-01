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
import { languages } from "../../util/constants/languages";
import { currencies } from "../../util/constants/currencies";
import { FormattedMessage } from "react-intl";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { removeUser, signOut, user } from "../../redux/slice/UserSlice";
import { Auth } from "aws-amplify";

const Header: React.FC = () => {
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
  const userName = useAppSelector(user);

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

  const dispatch=useAppDispatch()
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleClick = () => {
    navigate("/login", { state: { location: pathname } });
  };
  const handleSignInOrOut = () =>{
    userName ? Auth.signOut && dispatch(removeUser()) && Auth.signOut()  : handleClick()
  }

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-title">
          <div className="img-container">
            <img className="header-logo" src={headerLogoHere} alt="" />
          </div>
          <div className="title">{pageTitlehere}</div>
        </div>

        <div className="convertor-div">
          <div className="booking">
            <FormattedMessage id="my_booking" defaultMessage="My Booking" />
          </div>

          <LanguageIcon className="lang-icon" key="language-icon" />

          <select className="header-select" onChange={handleLanguageChange}>
            {languages.map((language) => (
              <option
                key={language.value}
                value={language.value}
                className="options"
              >
                {language.label}
              </option>
            ))}
          </select>

          <select className="header-select" onChange={handleCurrencyChange}>
            {currencies.map((currency) => (
              <option
                key={currency.value}
                value={currency.value}
                className="options"
              >
                {currency.label}
              </option>
            ))}
          </select>
          <Button
            type="submit"
            variant="contained"
            className="login-btn"
            onClick={()=>handleSignInOrOut()}
          >
            {!userName && <FormattedMessage id="login" defaultMessage="Login" />}
            {userName && (
              <FormattedMessage id="logout" defaultMessage="LogOut" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
