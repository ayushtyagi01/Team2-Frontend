import { Authenticator } from "@aws-amplify/ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Booking } from "../../redux/slice/BookingConfirmationSlice";
import { email, jwtToken, setJwtToken } from "../../redux/slice/UserSlice";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import {
  selectedcurrency,
  selectedFactor,
} from "../../redux/slice/InternationalisationSlice";
import { getCurrencyLogo } from "../../util/GetCurrencyLogo";
import "./BookingPage.scss";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

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

const BookingPage: React.FC = () => {
  const [bookingData, setBookingData] = useState<Booking[]>([]);
  const reduxdispatch = useAppDispatch();

  useEffect(() => {
    Auth.currentSession()
      .then((session) => {
        if (session && session.isValid()) {
          const idToken = session.getIdToken().getJwtToken();
          reduxdispatch(setJwtToken(idToken));
        }
      })
      .catch((error) => {});
  }, []);

  const getUserBookings = async () => {
    const response = await axios
      .post(process.env.REACT_APP_GET_MY_BOOKING!, {
        email: userEmail,
      })
      .then((response) => response.data)
      .catch((error) => console.log("error"));
    if (response) setBookingData(response.myBookings);
  };
  const token = useAppSelector(jwtToken);
  const userEmail = useAppSelector(email);
  useEffect(() => {
    if (userEmail) getUserBookings();
  }, [userEmail]);

  const pricefactor = useAppSelector(selectedFactor);
  const currency = useAppSelector(selectedcurrency);
  const [currencyLogo, setCurrencyLogo] = useState<string>("$");

  useEffect(() => {
    setCurrencyLogo(getCurrencyLogo(currency));
  }, [pricefactor]);

  const navigate = useNavigate();
  const handleClick = (index: number) => {
    if (bookingData[index].isCancelled === 0) {
      navigate(`/booking?id=${bookingData[index].bookingId}`);
    }
  };

  return (
    <Authenticator
      className="login-container"
      signUpAttributes={["email", "name"]}
    >
      {({ signOut, user }) => (
        <>
          {bookingData ? (
            <>
              {bookingData.map((item: any, index: number) => (
                <div
                  className="confirmation-container container-booking"
                  onClick={() => handleClick(index)}
                >
                  <div className="confirmation-container-room-detail">
                    <div className="room-type">
                      <FormattedMessage id="room" defaultMessage="Room" />
                      {index + 1}: {item.roomType}
                    </div>
                    <div className="guest-logo">
                      <PermIdentityIcon /> {item.guests}
                    </div>
                    {item.isCancelled ? (
                      <div className="cancel-room" style={{ color: "red" }}>
                        <FormattedMessage
                          id="canceled"
                          defaultMessage="Cancelled"
                        />
                      </div>
                    ) : (
                      ""
                    )}
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
                            <FormattedMessage
                              id="checkin"
                              defaultMessage="Check in"
                            />
                          </div>
                          <div>{new Date(item.checkInDate).getDate()}</div>
                          <div>
                            {monthNames[new Date(item.checkInDate).getMonth()]}{" "}
                            {new Date(item.checkInDate).getFullYear()}
                          </div>
                        </div>
                        <div className="date-box">
                          <div>
                            <FormattedMessage
                              id="checkout"
                              defaultMessage="Check out"
                            />
                          </div>
                          <div>{new Date(item.checkOutDate).getDate()}</div>
                          <div>
                            {monthNames[new Date(item.checkOutDate).getMonth()]}{" "}
                            {new Date(item.checkOutDate).getFullYear()}
                          </div>
                        </div>
                      </div>
                      <div className="promotion-title">{item.promoTitle}</div>
                      <div>{item.promoDescription}</div>
                      <div className="booking-total">
                        <div>
                          <FormattedMessage
                            id="cancel-policy"
                            defaultMessage="Copy explaining the cancellation policy, if applicable"
                          />
                        </div>
                        <div>
                          {currencyLogo}
                          {(+item.nightlyRates * pricefactor).toFixed(2)}{" "}
                          <FormattedMessage
                            id="night-total"
                            defaultMessage="/night total"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div>No Booking available</div>
          )}
        </>
      )}
    </Authenticator>
  );
};

export default BookingPage;
