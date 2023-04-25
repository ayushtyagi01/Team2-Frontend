import { Auth } from "aws-amplify";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginImpl = () => {
  const { state } = useLocation();
  const { location} = state;
  const navigate = useNavigate();

  const updateUserAttributes = async (attributes: Record<string, string>) => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const updatedAttributes = await Auth.updateUserAttributes(currentUser, attributes);
    } catch (error) {
    }
  }

  const redirect =  () =>{
     navigate(location);
  }
  useEffect(() => {
    const attributes = {
      'custom:Role':'Admin'
    };
    updateUserAttributes(attributes);    
    redirect();
  }, []);
  return <></>;
};
