import { useState, useEffect } from "react";
import axios from "axios";
import { selectedFactor } from "../../redux/slice/InternationalisationSlice";
import { useAppSelector } from "../../redux/hooks";

const LandingPage = () => {
  const [response, setResponse] = useState<string>("");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_HEALTH_API!)
      .then((res) => {
        console.log("response",res.data);
        setResponse(res.data);
      })
      .catch((error) => console.error(error.message));
  }, []);
  const priceFactor = useAppSelector(selectedFactor);

  return (
    <>
      <h2>{response}</h2>
      <h2>{100 * priceFactor}</h2>
    </>
  );
};

export default LandingPage;
