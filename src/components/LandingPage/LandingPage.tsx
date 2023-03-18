import { useState, useEffect } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const [response, setResponse] = useState<string>("");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_HEALTH_API!)
      .then((res) => {
        console.log(res.data);
        setResponse(res.data);
      })
      .catch((error) => console.error(error.message));
  }, []);

  return <div>{response}</div>;
};

export default LandingPage;
