import React, { useEffect, useRef } from "react";
import "./CheckoutPage.scss";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import Itenary from "./Itenary/Itenary";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setShowItenaryInCardsPageToTrue } from "../../redux/slice/RoomResultConfigSlice";
import axios from "axios";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

type Props = {};
const steps = ["1. Choose Room", "2. Choose add on", "3. Checkout"];

const ChechoutPage = (props: Props) => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setShowItenaryInCardsPageToTrue());
    localStorage.removeItem('isBookingCanceled');
  }, []);

  const userEmailRef = useRef<HTMLInputElement>(null);

  const sendRatingEmail = async ()=>{
    try {
      const response = await axios.post( 
        process.env.REACT_APP_SEND_EMAIL!,
        {
          toMail: userEmailRef.current?.value,
          roomTypeName:localStorage.getItem('roomTypeName'),
        }
      );
    } catch (e) {
     console.error(e);
    }
  }
  const navigate = useNavigate();
  const handleStepClick = (index:number)=>{
    if(index===0|| index===1){
      navigate("/room-search-results");
    }
  }

  return (
    <>
      <div className="stepper-container">
        <Stepper activeStep={2} alternativeLabel className="stepper">
          {steps.map((label) => (
            <Step key={label} onClick={() => handleStepClick(steps.indexOf(label))}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="main-container">
        <div className="checkout-form">
          <CheckoutForm />
        </div>
        <div className="itenary_box">
          <Itenary />
          {/* <input type="email" className="email_input" ref={userEmailRef} />
          <Button
            variant="contained"
            className="button-select"
            onClick={() => sendRatingEmail()}
          >SEND EMAIL</Button> */}
        </div>
      </div>
    </>
  );
};

export default ChechoutPage;
