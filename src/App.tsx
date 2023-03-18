import "./App.scss";
import { IntlProvider } from "react-intl";
import { useAppSelector } from "./redux/hooks";
import { setLang, translations } from "./redux/slice/InternationalisationSlice";
import Router from "./components/Router/Router";

function App() {
  const browserLanguage = navigator.language;
  const currentLang = useAppSelector(setLang);
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