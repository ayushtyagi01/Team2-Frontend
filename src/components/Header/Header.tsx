import { useEffect } from "react";
import {
  getLandingData,
  headerLogo,
  pageTitle,
} from "../../redux/slice/landingPageSlice";
import LanguageIcon from "@mui/icons-material/Language";
import "./Header.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { languages } from "../../util/constants/languages";
import { currencies } from "../../util/constants/currencies";
import { FormattedMessage } from "react-intl";

const Header: React.FC = () => {
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
    reduxDispatch(getLandingData());
  }, [reduxDispatch]);

  const headerLogoHere = useAppSelector(headerLogo);
  const pageTitlehere = useAppSelector(pageTitle);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {};
  const handleCurrencyChange = () => {};

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-title">
          <div className="img-container">
            <img className="header-logo" src={headerLogoHere} alt="" />
          </div>
          <div className="title">
            <FormattedMessage id="pageTitle" defaultMessage={pageTitlehere} />
          </div>
        </div>

        <div className="convertor-div">
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
        </div>
      </div>
    </div>
  );
};

export default Header;
