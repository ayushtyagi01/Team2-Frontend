import { Auth } from "aws-amplify";
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { email } from "../../redux/slice/UserSlice";

export const LoginImpl = () => {
  const { state } = useLocation();
  const { location } = state;
  const userEmail = useAppSelector(email);
  const navigate = useNavigate();

  const updateUserAttributes = async (attributes: Record<string, string>) => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const updatedAttributes = await Auth.updateUserAttributes(
        currentUser,
        attributes
      );
    } catch (error) {}
  };

  const redirect = () => {
    navigate(location);
  };
  useEffect(() => {
    const getRole = async () => {
      await axios
        .post(process.env.REACT_APP_GET_ROLE!, {
          email: userEmail,
        })
        .then((data: any) => {
          console.log("custom", data.data.role);
          const attributes = {
            "custom:Role": data.data.role,
          };
          updateUserAttributes(attributes);
          redirect();
        });
    };
    getRole();
  }, []);
  return <></>;
};
