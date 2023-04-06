import React, { useEffect } from "react";
import "./CheckoutPage.scss";
import { Step, StepLabel, Stepper } from "@mui/material";
import Itenary from "./Itenary/Itenary";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setShowItenaryInCardsPageToTrue } from "../../redux/slice/RoomResultConfigSlice";

type Props = {};
const steps = ["1. Choose Room", "2. Choose add on", "3. Checkout"];

const ChechoutPage = (props: Props) => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setShowItenaryInCardsPageToTrue());
  }, []);

  return (
    <>
      <div className="stepper-container">
        <Stepper activeStep={2} alternativeLabel className="stepper">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="main-container">
        <div className="checkout-form"></div>
        <div className="itenary_box">
          <Itenary />
        </div>
      </div>
    </>
  );
};

export default ChechoutPage;
