import { useEffect } from "react";
import {
  getLandingData,
  headerLogo,
  pageTitle,
} from "../../redux/slice/landingPageSlice";
import {
  changeLang,
  currencyFactor,
} from "../../redux/slice/InternationalisationSlice";
import LanguageIcon from "@mui/icons-material/Language";
import "./Header.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FormattedMessage } from "react-intl";
import axios from "axios";

function Header() {
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
    reduxDispatch(getLandingData());
  }, [reduxDispatch]);

  const headerLogoHere = useAppSelector(headerLogo);
  const pageTitlehere = useAppSelector(pageTitle);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    reduxDispatch(changeLang(e.target.value));
  };
  const handleCurrencyChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("hii", process.env.REACT_APP_CURRENCY_CONVERTOR_API);

    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const currency = e.target.value;
    const factor = response.data.rates[currency];
    reduxDispatch(currencyFactor(factor));
    console.log("factor", factor);
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
