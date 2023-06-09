import "./App.scss";
import { IntlProvider } from "react-intl";
import { useAppSelector } from "./redux/hooks";
import { setLang, translations } from "./redux/slice/InternationalisationSlice";
import Router from "./components/Router/Router";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";
import ReactGA from "react-ga";

const TRACKING_ID = "UA-259483994-1";
ReactGA.initialize(TRACKING_ID);

function App() {
  const browserLanguage = navigator.language;
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );
  const currentLanguage = useAppSelector(setLang);

  useEffect(() => {
    const selectedLanguage = localStorage.getItem("selectedLanguage");
    if (selectedLanguage) {
      setCurrentLang(selectedLanguage);
    }
  }, []);

  useEffect(() => {
    setCurrentLang(localStorage.getItem("selectedLanguage")!);
  }, [currentLanguage]);

  const messages = useAppSelector(translations);

  return (
    <>
      <IntlProvider locale={browserLanguage} messages={messages[currentLang]}>
        <Router />
      </IntlProvider>
    </>
  );
}

export default App;
