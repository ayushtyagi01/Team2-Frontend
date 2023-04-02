import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginImpl = () => {
  const { state } = useLocation();
  const { location} = state;
  const navigate = useNavigate();

  const redirect =  () =>{
     navigate(location);
  }
  useEffect(() => {
    redirect();
  }, []);
  return <></>;
};
