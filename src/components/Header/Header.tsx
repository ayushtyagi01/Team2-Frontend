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
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useLocation, useNavigate } from "react-router-dom";
import {
  email,
  jwtToken,
  removeJwtToken,
  removeUser,
  setEmail,
  setJwtToken,
  signOut,
  user,
} from "../../redux/slice/UserSlice";
import { Auth } from "aws-amplify";
import { setUser } from "../../redux/slice/UserSlice";
import axios from "axios";

const ITEM_HEIGHT = 48;

const Header: React.FC = () => {
  const reduxDispatch = useAppDispatch();
  const [lang, setLanguage] = useState<string>("en");
  const token = useAppSelector(jwtToken);

  const getCurrentUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const username = user?.username;
    reduxDispatch(setUser(username));
    const session = await Auth.currentSession();
    const token = session.getIdToken().getJwtToken();
    reduxDispatch(setJwtToken(token));
    const email = user?.attributes?.email;
    reduxDispatch(setEmail(email));
    localStorage.setItem("email", email);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

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
  const userEmail = useAppSelector(email);
  const [isAdmin, setAdmin] = useState(false);

  const getRoles = async () => {
    await axios
      .post(process.env.REACT_APP_GET_ROLE!, {
        email: userEmail,
      })
      .then((response: any) => {
        if (response.data.role === "ADMIN") {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      })
      .catch((error: any) => {});
  };
  useEffect(() => {
    userEmail && getRoles();
  }, [userEmail]);

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
    token
      ? Auth.signOut &&
        dispatch(removeUser()) &&
        reduxDispatch(setJwtToken("")) &&
        Auth.signOut()
      : handleClick();
    setLogout(true);
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleHamburger = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleHamburgerClose = () => {
    setAnchorEl(null);
  };
  const [width,setWidth]=useState(1920);
  useEffect(()=>{
    setWidth(window.innerWidth);
  },[window.innerWidth])

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
          {isAdmin && token && (
            <div className="admin" onClick={() => navigate("/configuration")}>
              <FormattedMessage id="admin" defaultMessage="Admin" />
            </div>
          )}
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
            {!token && <FormattedMessage id="login" defaultMessage="Login" />}
            {token && <FormattedMessage id="logout" defaultMessage="LogOut" />}
          </Button>
        </div>
        {width <= 1000 && 
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleHamburger}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleHamburgerClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20vh",
                },
              }}
            >
              {isAdmin && token && (
                <MenuItem onClick={handleHamburgerClose}>
                  <div
                    className="admin"
                    onClick={() => navigate("/configuration")}
                  >
                    Admin
                  </div>
                </MenuItem>
              )}
              <MenuItem onClick={handleHamburgerClose}>
                <div
                  className="booking"
                  onClick={() => navigate("/my-booking")}
                >
                  <FormattedMessage
                    id="my_booking"
                    defaultMessage="My Booking"
                  />
                </div>
              </MenuItem>
              <MenuItem>
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
              </MenuItem>
              <MenuItem>
                <select
                  className="header-select"
                  onChange={handleCurrencyChange}
                >
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
              </MenuItem>
              <MenuItem>
                <Button
                  type="submit"
                  variant="contained"
                  className="login-btn"
                  onClick={() => handleSignInOrOut()}
                >
                  {!token && (
                    <FormattedMessage id="login" defaultMessage="Login" />
                  )}
                  {token && (
                    <FormattedMessage id="logout" defaultMessage="LogOut" />
                  )}
                </Button>
              </MenuItem>
            </Menu>
          </>
        }
      </div>
    </div>
  );
};

export default Header;
