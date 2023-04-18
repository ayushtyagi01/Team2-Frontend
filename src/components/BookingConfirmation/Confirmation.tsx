import "./Confirmation.scss";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import CryptoJS from "crypto-js";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  bookingData,
  getBookingData,
  isError,
} from "../../redux/slice/BookingConfirmationSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { email, user } from "../../redux/slice/UserSlice";
import { isLoading } from "../../redux/slice/CheckoutDataSlice";
import {
  selectedcurrency,
  selectedFactor,
} from "../../redux/slice/InternationalisationSlice";
import { getCurrencyLogo } from "../../util/GetCurrencyLogo";

const style = {
  position: "absolute" as "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Confirmation = () => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState("");
  const [totalBill, setTotalBill] = useState(0);
  const handleOpen = () => {
    setOpen(true);
    if (!username) handeleGenerateOtp();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const reduxDispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("id") !== null)
      localStorage.setItem("bookingId", searchParams.get("id")!);
    else {
      setSearchParams({ id: localStorage.getItem("bookingId")! });
    }
  }, []);

  useEffect(() => {
    reduxDispatch(
      getBookingData({
        bookingId: localStorage.getItem("bookingId"),
      })
    );
  }, []);

  const pricefactor = useAppSelector(selectedFactor);
  const currency = useAppSelector(selectedcurrency);
  const [currencyLogo, setCurrencyLogo] = useState<string>("$");

  useEffect(() => {
    setCurrencyLogo(getCurrencyLogo(currency));
  }, [pricefactor]);

  const data = useAppSelector(bookingData);
  const isErrorHere = useAppSelector(isError);

  const emailLooged = useAppSelector(email);

  const startDay = data.checkInDate;
  const date = new Date(startDay);

  const dayOfCheckInMonth = date.getDate();
  const monthCheckIn = monthNames[date.getMonth()];
  const yearCheckIn = date.getFullYear();

  const endDay = data.checkOutDate;
  const enddate = new Date(endDay);

  const dayOfCheckOutMonth = enddate.getDate();
  const monthCheckOut = monthNames[enddate.getMonth()];
  const yearCheckOut = enddate.getFullYear();

  useEffect(() => {
    if ((data && data.isCancelled == 1)||isErrorHere ) {
      localStorage.setItem("isBookingCanceled", "true");
      navigate("/");
    }
    setTotalBill(
      +data.nightlyRates *
        +data.priceFactor *
        +(
          new Date(data.checkOutDate).getDate() -
          new Date(data.checkInDate).getDate() +
          1
        )
    );
  }, [data, isErrorHere]);

  const otpRef = useRef<HTMLInputElement>(null);

  const handlePrint = () => {
    setExpanded("all");
  };

  useEffect(() => {
    if (expanded === "all") {
      setTimeout(() => {
        window.print();
        setExpanded("");
      }, 0);
    }
  }, [expanded]);

  const handelPanel = (panel: string) => {
    if (expanded === panel) {
      setExpanded("");
    } else {
      setExpanded(panel);
    }
  };
  const isLoadingHere = useAppSelector(isLoading);
  const [open1, setOpen1] = useState(true);

  const handleClose1 = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen1(false);
  };

  const username = useAppSelector(user);
  const [error, setError] = useState(false);
  const generateOtp = async () => {
    const response = await axios
      .post(process.env.REACT_APP_GENERATE_OTP!, {
        email: data.guestEntity.emailID,
        bookingId: localStorage.getItem("bookingId")!,
      })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };
  const handeleGenerateOtp = () => {
    if (!username) generateOtp();
  };

  const handeleVerifyOtp = async () => {
    const res = await axios
      .post(process.env.REACT_APP_VERIFY_OTP!, {
        email: data.guestEntity.emailID,
        otp: otpRef.current?.value,
      })
      .then((response) => response.data)
      .catch((error) => {
        setError(true);
        return;
      });

    if (res === "Not Verified" || res === "Error") {
      setError(true);
      return;
    }
    const response = await axios
      .post(process.env.REACT_APP_CANCEL_BOOKING!, {
        email: data.guestEntity.emailID,
        bookingId: localStorage.getItem("bookingId")!,
      })
      .then((response) => response.data)
      .catch((error) => console.log(error));
    localStorage.setItem("isBookingCanceled", "true");
    navigate("/");
  };

  const handeleCancelforLoggedIn = async () => {
    console.log({
      email: emailLooged,
      bookingId: localStorage.getItem("bookingId")!,
    });
    const response = await axios
      .post(process.env.REACT_APP_CANCEL_BOOKING!, {
        email: emailLooged,
        bookingId: localStorage.getItem("bookingId")!,
      })
      .then((response) => response.data)
      .catch((error) => console.log("Failed to cancel"));
    if (response) localStorage.setItem("isBookingCanceled", "true");
    else {
      localStorage.setItem("isBookingCanceled", "false");
    }
    navigate("/");
  };
  return (
    <>
      {isLoadingHere === 2 && (
        <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose1}
            severity="success"
            sx={{ width: "100%" }}
          >
            <FormattedMessage
              id="booking-success"
              defaultMessage="Booking Successfull"
            />
          </Alert>
        </Snackbar>
      )}
      <div className="confirmation-header">
        <div className="confirmation">
          <FormattedMessage
            id="upcoming-confirmation"
            defaultMessage="Upcoming Confirmation"
          />{" #"}
          {data.bookingId}
        </div>
        <div className="confirmation-btn">
          <div className="print-btn" onClick={handlePrint}>
            <FormattedMessage id="print" defaultMessage="Print" />
          </div>
          <div className="email-btn">
            <FormattedMessage id="email" defaultMessage="Email" />
          </div>
        </div>
      </div>
      <div className="confirmation-container">
        <div className="confirmation-container-room-detail">
          <div className="room-type">
            <FormattedMessage id="room1" defaultMessage="Room 1" />:{" "}
            {data.roomType}
          </div>
          <div className="guest-logo">
            <PermIdentityIcon /> {data.guests}
          </div>
          <div className="cancel-room" onClick={handleOpen}>
            <FormattedMessage id="cancel" defaultMessage="CancelRoom" />
          </div>
        </div>
        <div className="room-info">
          <img
            className="room-img"
            src="https://d2u9o2ehma78q7.cloudfront.net/Tenant-1/Property-1/Images/room_type_1_1.jpg"
            alt=""
          />
          <div className="booking-info">
            <div className="date-container">
              <div className="date-box">
                <div>
                  <FormattedMessage id="checkin" defaultMessage="Check in" />
                </div>
                <div>{dayOfCheckInMonth}</div>
                <div>
                  {monthCheckIn} {yearCheckIn}
                </div>
              </div>
              <div className="date-box">
                <div>
                  <FormattedMessage id="checkout" defaultMessage="Check out" />
                </div>
                <div>{dayOfCheckOutMonth}</div>
                <div>
                  {monthCheckOut} {yearCheckOut}
                </div>
              </div>
            </div>
            <div className="promotion-title">{data.promoTitle}</div>
            <div>{data.promoDescription}</div>
            <div className="booking-total">
              <div>
                <FormattedMessage
                  id="cancel-policy"
                  defaultMessage="Copy explaining the cancellation policy, if applicable"
                />
              </div>
              <div>
                {currencyLogo}
                {(+data.nightlyRates * pricefactor).toFixed(2)}{" "}
                <FormattedMessage
                  id="night-total"
                  defaultMessage="/night total"
                />
              </div>
            </div>
          </div>
        </div>
        <Accordion
          className="accordion-containe"
          expanded={expanded === "all" || expanded === "panel1"}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="summary"
            onClick={() => handelPanel("panel1")}
          >
            <Typography className="typography">
              <FormattedMessage
                id="room-total"
                defaultMessage="Room Total Summary"
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className="booking-detail">
                <div>
                  <FormattedMessage
                    id="nightly-rate"
                    defaultMessage="Nightly Rate"
                  />
                </div>
                <div>
                  {currencyLogo}
                  {(+data.nightlyRates * pricefactor).toFixed(1)}
                </div>
              </div>
              <div className="booking-detail">
                <div>Subtotal</div>
                <div>
                  {currencyLogo}
                  {(totalBill * pricefactor).toFixed(2)}
                </div>
              </div>
              <div className="booking-detail">
                <div>
                  <FormattedMessage
                    id="Taxes-Surcharges-Fees"
                    defaultMessage="Taxes, Surcharges, Fees"
                  />
                </div>
                <div>
                  {currencyLogo}
                  {(totalBill * 0.1 * pricefactor).toFixed(2)}
                </div>
              </div>
              <div className="booking-detail">
                <div>VAT</div>
                <div>
                  {currencyLogo}
                  {(totalBill * 0.08 * pricefactor).toFixed(2)}
                </div>
              </div>
              <div className="booking-detail">
                <div>
                  <FormattedMessage
                    id="total-stay"
                    defaultMessage="Total for stay"
                  />
                  Total for stay
                </div>
                <div>
                  {currencyLogo}
                  {(
                    (totalBill + totalBill * 0.1 + totalBill * 0.08) *
                    pricefactor
                  ).toFixed(2)}
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accordion-containe"
          expanded={expanded === "all" || expanded === "panel2"}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="summary"
            onClick={() => handelPanel("panel2")}
          >
            <Typography className="typography">
              <FormattedMessage
                id="guest-info"
                defaultMessage="Guest Information"
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className="booking-detail">
                <div>
                  <FormattedMessage
                    id="first-name"
                    defaultMessage="First Name"
                  />
                </div>
                <div>{data.guestEntity.firstName}</div>
              </div>
              <div className="booking-detail">
                <div>
                  <FormattedMessage id="email" defaultMessage="Email" />
                </div>
                <div>{data.guestEntity.emailID}</div>
              </div>
              <div className="booking-detail">
                <div>
                  <FormattedMessage id="phone" defaultMessage="Phone" />
                </div>
                <div>{data.guestEntity.phone}</div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accordion-containe"
          expanded={expanded === "all" || expanded === "panel3"}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="summary"
            onClick={() => handelPanel("panel3")}
          >
            <Typography className="typography">
              <FormattedMessage
                id="BillingAddress"
                defaultMessage="Billing Address"
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className="booking-detail">
                <div>
                  <FormattedMessage
                    id="first-name"
                    defaultMessage="First Name"
                  />
                </div>
                <div>{data.billingEntity.firstName}</div>
              </div>
              <div className="booking-detail">
                <div>
                  <FormattedMessage
                    id="MailingAddress"
                    defaultMessage="Mailing Address"
                  />
                </div>
                <div>{data.billingEntity.mailingAddress1}</div>
              </div>
              <div className="booking-detail">
                <div>
                  <FormattedMessage id="country" defaultMessage="Country" />
                </div>
                <div>{data.billingEntity.country}</div>
              </div>
              <div className="booking-detail">
                <div>
                  <FormattedMessage id="state" defaultMessage="State" />
                </div>
                <div>{data.billingEntity.state}</div>
              </div>
              <div className="booking-detail">
                <div>
                  <FormattedMessage id="city" defaultMessage="City" />
                </div>
                <div>{data.billingEntity.city}</div>
              </div>
              <div className="booking-detail">
                <div>
                  <FormattedMessage id="zip" defaultMessage="Zip" />
                </div>
                <div>{data.billingEntity.zip}</div>
              </div>
              <div className="booking-detail">
                <div>
                  <FormattedMessage id="phone" defaultMessage="Phone" />
                </div>
                <div>{data.billingEntity.phone}</div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="accordion-containe"
          expanded={expanded === "all" || expanded === "panel4"}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="summary"
            onClick={() => handelPanel("panel4")}
          >
            <Typography className="typography">
              <FormattedMessage
                id="PaymentInformation"
                defaultMessage="Payment Information"
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className="booking-detail">
                <div>
                  <FormattedMessage id="card" defaultMessage="Card Number" />
                </div>
                <div>
                  {CryptoJS.AES.decrypt(
                    data.paymentInfoEntity.cardName,
                    process.env.REACT_APP_SECRET_KEY!
                  ).toString(CryptoJS.enc.Utf8)}
                </div>
              </div>
              <div className="booking-detail">
                <div>
                  <FormattedMessage
                    id="ExpiryMonth"
                    defaultMessage="Expiry Month"
                  />
                </div>
                <div>
                  {CryptoJS.AES.decrypt(
                    data.paymentInfoEntity.expiryMonth,
                    process.env.REACT_APP_SECRET_KEY!
                  ).toString(CryptoJS.enc.Utf8)}
                </div>
              </div>
              <div className="booking-detail">
                <div>
                  <FormattedMessage
                    id="ExpiryYear"
                    defaultMessage="Expiry Year"
                  />
                </div>
                <div>
                  {CryptoJS.AES.decrypt(
                    data.paymentInfoEntity.expiryYear,
                    process.env.REACT_APP_SECRET_KEY!
                  ).toString(CryptoJS.enc.Utf8)}
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <div>Enter email to recieve OTP</div>
          <input type="text" className="cancel-input" ref={emailRef}></input>
          <Button
            variant="contained"
            className="btn-otp"
            onClick={handeleGenerateOtp}
          >
            GET OTP
          </Button> */}

          {!username && (
            <>
              <div>Enter OTP for cancelling the room booking</div>
              <input type="text" className="cancel-input" ref={otpRef}></input>
              {error && <p className="error-otp">Invalid OTP</p>}
              <Button
                variant="contained"
                className="btn-otp"
                onClick={handeleVerifyOtp}
              >
                Confirm OTP
              </Button>
            </>
          )}
          {username && (
            <>
              <div>Are you sure you want to cancel?</div>
              <Button
                variant="contained"
                className="btn-cancel"
                onClick={handeleCancelforLoggedIn}
              >
                Confirm
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Confirmation;
