import { useEffect, useState } from "react";
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
  const [lang, setLanguage] = useState<string>("en");

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
    localStorage.setItem("selectedLanguage", e.target.value);
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
    localStorage.setItem("selectedCurrency", e.target.value);
  };
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("selectedCurrency"))
      setLanguage(localStorage.getItem("selectedCurrency")!);
  }, [localStorage.getItem("selectedCurrency")]);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const handleClick = () => {
    navigate("/login", { state: { location: pathname } });
  };
  const handleSignInOrOut = () => {
    userName
      ? Auth.signOut && dispatch(removeUser()) && Auth.signOut()
      : handleClick();
    setLogout(true);
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-title">
          <div className="img-container">
            <img
              className="header-logo"
              src={headerLogoHere}
              alt=""
              onClick={() => navigate("/")}
            />
          </div>
          <div className="title">{pageTitlehere}</div>
        </div>

        <div className="convertor-div">
          <div className="admin" onClick={() => navigate("/configuration")}>
            Admin
          </div>
          <div className="booking" onClick={() => navigate("/my-booking")}>
            <FormattedMessage id="my_booking" defaultMessage="My Booking" />
          </div>
          <div className="language-container">
            <LanguageIcon className="lang-icon" key="language-icon" />

            <select
              className="header-select"
              onChange={handleLanguageChange}
              defaultValue={localStorage.getItem("selectedLanguage")!}
            >
              {languages.map((language) => (
                <option
                  key={language.value}
                  value={language.value}
                  className="options"
                >
                  {language.value}
                </option>
              ))}
            </select>
          </div>
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
            onClick={() => handleSignInOrOut()}
          >
            {(!userName ||
              !localStorage.getItem(
                "CognitoIdentityServiceProvider.5mas2rith8mta1sa61a1eui38n.dbc46219-21b0-444d-ab18-f3869aec0896.userData"
              )) && <FormattedMessage id="login" defaultMessage="Login" />}
            {userName &&
              localStorage.getItem(
                "CognitoIdentityServiceProvider.5mas2rith8mta1sa61a1eui38n.dbc46219-21b0-444d-ab18-f3869aec0896.userData"
              ) && <FormattedMessage id="logout" defaultMessage="LogOut" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
