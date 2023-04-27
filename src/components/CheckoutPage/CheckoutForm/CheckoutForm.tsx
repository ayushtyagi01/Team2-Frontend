import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  Modal,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import CryptoJS from "crypto-js";
import {
  checkoutData,
  getCheckoutData,
} from "../../../redux/slice/CheckoutConfigSlice";
import "./CheckoutForm.scss";
import { TravellerSchema } from "../../../util/yupSchema/TravellerSchema";
import { BilingSchema } from "../../../util/yupSchema/BilingSchema";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { PaymentSchema } from "../../../util/yupSchema/PaymentSchema";
import { Box } from "@mui/system";
import { getBookingData } from "../../../util/getBookingData";
import {
  bookingStatus,
  isLoading,
  postCheckoutData,
} from "../../../redux/slice/CheckoutDataSlice";
import { useNavigate } from "react-router-dom";
import {
  selectedcurrency,
  selectedFactor,
} from "../../../redux/slice/InternationalisationSlice";
import { getCurrencyLogo } from "../../../util/GetCurrencyLogo";
import { setJwtToken } from "../../../redux/slice/UserSlice";
import { Auth } from "aws-amplify";

const style = {
  position: "absolute" as "absolute",
  top: "49.6%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  height: "82%",
  p: 4,
};

const CheckoutForm = () => {
  const reduxDispatch = useAppDispatch();
  useEffect(() => {
    reduxDispatch(getCheckoutData());
  }, []);

  const [index, setIndex] = useState<number>(0);

  const checkoutConfig = useAppSelector(checkoutData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:
      index === 0
        ? yupResolver(TravellerSchema)
        : index === 1
        ? yupResolver(BilingSchema)
        : yupResolver(PaymentSchema),
  });
  const [error, showError] = useState<boolean>(false);
  const [Country, setCountry] = useState<string>("");
  const [State, setState] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const checkboxRef = useRef<HTMLInputElement>(null);

  const isLoadingHere = useAppSelector(isLoading);
  const bookingStatusHere = useAppSelector(bookingStatus);
  const navigate = useNavigate();
  if (isLoadingHere === 2) {
    navigate(`/booking?id=${bookingStatusHere.bookingId}`);
  }
  const pricefactor = useAppSelector(selectedFactor);
  const currency = useAppSelector(selectedcurrency);
  const [currencyLogo, setCurrencyLogo] = useState<string>("$");

  useEffect(() => {
    Auth.currentSession()
      .then((session) => {
        if (session && session.isValid()) {
          const idToken = session.getIdToken().getJwtToken();
          reduxDispatch(setJwtToken(idToken));
        }
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    setCurrencyLogo(getCurrencyLogo(currency));
  }, [pricefactor]);

  const onSubmitHandler = (data: any) => {
    if (index === 1 && (Country === "" || State === "")) {
      showError(true);
      return;
    }
    if (index === 2) {
      const CardName = CryptoJS.AES.encrypt(
        data.CardName,
        process.env.REACT_APP_SECRET_KEY!
      ).toString();
      const ExpMM = CryptoJS.AES.encrypt(
        data.ExpMM,
        process.env.REACT_APP_SECRET_KEY!
      ).toString();
      const ExpYY = CryptoJS.AES.encrypt(
        data.ExpYY,
        process.env.REACT_APP_SECRET_KEY!
      ).toString();
      const isChecked = checkboxRef.current?.checked ? 1 : 0;
      const bookingData = getBookingData({
        ...data,
        Country,
        State,
        CardName,
        ExpMM,
        ExpYY,
        isChecked,
      });
      reduxDispatch(postCheckoutData(bookingData));
    }
    setIndex(index + 1);
  };
  const selectCountry = (val: string) => {
    setCountry(val);
  };
  const selectState = (val: string) => {
    setState(val);
  };
  const totalBill =
    parseInt(localStorage.getItem("averageNightlyRateInDuration")!) *
    parseFloat(localStorage.getItem("priceFactor")!) *
    (new Date(localStorage.getItem("endDate")!).getDate() -
      new Date(localStorage.getItem("startDate")!).getDate() +
      1);
  let totalBillAfterTax = totalBill;
  totalBillAfterTax += totalBill * 0.18;
  totalBillAfterTax += totalBill * 0.08;

  return (
    <>
      <div className="payment-header">Payment Info</div>
      {checkoutConfig.map((item: any, ind: number) => {
        return (
          <>
            <div className="payment-header-section">
              <FormattedMessage
                id={" " + item.title.toLowerCase()}
                defaultMessage={item.title}
              />
            </div>
            {index === ind && (
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                {item.inputs.map((input: any) => (
                  <div className="payment-header-section-input">
                    {input.map((field: any) => (
                      <div
                        key={field.label}
                        className={`input-container ${field.label.replace(
                          " ",
                          ""
                        )}`}
                      >
                        <div className="input-header ">
                          {" "}
                          <FormattedMessage
                            id={" " + field.label}
                            defaultMessage={field.label}
                          />
                        </div>
                        <FormControl
                          sx={{ mr: 0, width: "100%" }}
                          variant="outlined"
                        >
                          {field.type === "text" ? (
                            <TextField
                              {...register(field.label.replace(" ", ""))}
                              error={!!errors[field.label.replace(" ", "")]}
                              type={field.label === "CVV" ? "password" : ""}
                              helperText={
                                errors[field.label.replace(" ", "")] ? (
                                  <FormattedMessage
                                    id={
                                      " " +
                                      errors[
                                        field.label.replace(" ", "")
                                      ]?.message?.toString()
                                    }
                                    defaultMessage={errors[
                                      field.label.replace(" ", "")
                                    ]?.message?.toString()}
                                  />
                                ) : (
                                  " "
                                )
                              }
                            />
                          ) : field.label === "Country" ? (
                            <>
                              <CountryDropdown
                                {...register(field.label.replace(" ", ""), {
                                  required: true,
                                })}
                                value={Country}
                                onChange={(val) => selectCountry(val)}
                                onBlur={() => {}}
                              />
                              {error && Country === "" && (
                                <span className="error-message">
                                  <FormattedMessage
                                    id="This field is required"
                                    defaultMessage="This field is required"
                                  />
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              <RegionDropdown
                                {...register(field.label.replace(" ", ""), {
                                  required: true,
                                })}
                                country={Country}
                                value={State}
                                onChange={(val) => selectState(val)}
                                onBlur={() => {}}
                              />
                              {error && State === "" && (
                                <span className="error-message">
                                  <FormattedMessage
                                    id="This field is required"
                                    defaultMessage="This field is required"
                                  />
                                </span>
                              )}
                            </>
                          )}
                        </FormControl>
                      </div>
                    ))}
                  </div>
                ))}

                {index === 2 && (
                  <>
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        className="checkbox"
                        ref={checkboxRef}
                      />
                      <p>
                        {" "}
                        <FormattedMessage
                          id="special-offer"
                          defaultMessage="Send me special offer"
                        />
                      </p>
                    </div>
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        className="checkbox"
                        {...register("Terms")}
                      />
                      <p>
                        <FormattedMessage
                          id="agree-to"
                          defaultMessage="I agree to"
                        />{" "}
                        <span
                          className="open-modal"
                          onClick={() => setOpenModal(true)}
                        >
                          <FormattedMessage
                            id="terms-policy"
                            defaultMessage="Terms and Policies"
                          />
                        </span>{" "}
                        <FormattedMessage
                          id="travel"
                          defaultMessage="of travel"
                        />
                      </p>
                    </div>
                    <div className="checkbox-error">
                      {errors["Terms"] ? (
                        <div className="error-message">
                          <FormattedMessage
                            id={" " + errors["Terms"]?.message?.toString()}
                            defaultMessage={errors[
                              "Terms"
                            ]?.message?.toString()}
                          />
                        </div>
                      ) : (
                        " "
                      )}
                    </div>
                    <div className="price-container">
                      <div className="due-amount">
                        {" "}
                        <FormattedMessage
                          id="total-due"
                          defaultMessage="Total Due"
                        />
                      </div>
                      <div>
                        {currencyLogo}{" "}
                        {(totalBillAfterTax * 0.15 * pricefactor).toFixed(2)}
                      </div>
                    </div>
                  </>
                )}
                <div className="prev-next-btn">
                  {ind === index && item.previous && (
                    <p
                      className="previous-btn"
                      onClick={() => setIndex(index - 1)}
                    >
                      <FormattedMessage
                        id={" " + item.previous}
                        defaultMessage={item.previous}
                      />
                    </p>
                  )}
                  {ind === index && (
                    <Button
                      type="submit"
                      variant="contained"
                      className="btn-checkout-form"
                    >
                      <FormattedMessage
                        id={" " + item.next}
                        defaultMessage={item.next}
                      />
                    </Button>
                  )}
                </div>
              </form>
            )}
          </>
        );
      })}
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {" "}
          <Box sx={style}>
            <div className="terms-header">
              {" "}
              <FormattedMessage
                id="terms-policy"
                defaultMessage="Terms and Policies"
              />
            </div>
            TERMS AND CONDITIONS FOR HOTEL BOOKING APPLICATION HOTEL <br/>
            Welcome to our Hotel Booking Application Hotel (“Hotel”). By booking a room at
            our Hotel through our Application, you agree to the following terms
            and conditions (“Terms and Conditions”). If you do not agree to
            these Terms and Conditions, please do not use our Application.
            <br/>1. Booking and Payment <br/>2.To book a room at our Hotel through our
            Application, you must provide accurate and complete information,
            including your name, contact information, and payment information.
            Payment for your reservation will be processed through the
            Application using a valid credit or debit card. You agree to pay all
            fees and charges associated with your reservation. If you cancel
            your reservation, you may be eligible for a refund, subject to the
            terms and conditions of our cancellation policy.<br/>3. Check-In and
            Check-Out <br/>4.Check-in time is [insert check-in time] and check-out time
            is [insert check-out time].If you require an early check-in or late
            check-out, please contact our front desk in advance to make
            arrangements. Additional fees may apply.<br/>5. Room Assignments <br/>6.We reserve
            the right to assign rooms at our discretion. If you have specific
            room preferences, please let us know in advance, and we will do our
            best to accommodate your request. However, we cannot guarantee that
            your preferred room will be available. <br/>7.Use of Hotel Facilities <br/>8.As a
            guest of our Hotel, you are entitled to use our facilities,
            including our pool, fitness center, and restaurant, subject to
            availability and our operating hours. You agree to use our
            facilities responsibly and in accordance with our rules and
            regulations. We reserve the right to refuse service to anyone who
            violates our rules and regulations.<br/>9. Damage and Liability <br/>10.You are
            responsible for any damage caused to our Hotel or its property
            during your stay. You agree to pay for any damages or losses
            incurred as a result of your actions. We are not liable for any
            injury, loss, or damage to you or your property during your stay,
            except as provided by law. <br/>11.Personal Information <br/>12.We collect and use
            your personal information in accordance with our Privacy Policy,
            which is incorporated by reference into these Terms and Conditions.
            <br/>13. Governing Law and Dispute Resolution <br/>14. If
            you have any questions or concerns about these Terms and Conditions
            or our Hotel Booking Application, please contact us at 1234567890.
          </Box>
        </>
      </Modal>

      {isLoadingHere === 1 && <CircularProgress />}
    </>
  );
};

export default CheckoutForm;
