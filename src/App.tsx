import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { IntlProvider } from "react-intl";
import en from "./util/translation/en.json";
import fr from "./util/translation/fr.json";
import { useAppSelector } from "./redux/hooks";
import { setLang } from "./redux/slice/InternationalisationSlice";

function App() {
  const currentLang = useAppSelector(setLang);
  const translations = currentLang === "en" ? en : fr;
  return (
    <>
      <IntlProvider locale="en" messages={translations}>
        <Header />
        {/* <Router/> */}
        <Footer />
      </IntlProvider>
    </>
  );
}

export default App;