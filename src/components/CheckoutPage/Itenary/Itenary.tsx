import React, { useEffect, useState } from "react";
import "./Itenary.scss";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { height } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectedRoomTypeDetails,
  setShowItenaryInCardsPageToFalse,
} from "../../../redux/slice/RoomResultConfigSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

type Props = {};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Itenary = (props: Props) => {
  const {
    promotionTitle,
    priceFactor,
    roomTypeName,
    averageNightlyRateInDuration,
    promotionDescription,
  } = useAppSelector(selectedRoomTypeDetails);
  const propertyName =
    localStorage.getItem("property")!?.length > 1
      ? localStorage.getItem("property")?.substring(1, 2)
      : localStorage.getItem("property");
  const checkInDate = localStorage.getItem("startDate");
  const checkOutDate = localStorage.getItem("endDate");
  const guests = localStorage.getItem("guest");
  const rooms = localStorage.getItem("room");
  const duration =
    new Date(checkOutDate!).getDate() - new Date(checkInDate!).getDate() + 1;
  const totalBill = averageNightlyRateInDuration * priceFactor * duration;
  let totalBillAfterTax = totalBill;
  totalBillAfterTax += totalBill * 0.18;
  totalBillAfterTax += totalBill * 0.08;
  const [dailyPrice, setDailyPrice] = useState<any>({});
  const [roomTotal, setRoomTotal] = useState<number>(0);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const continueShopping = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/room-search-results");
  };

  const fetchDailyPrice = async () => {
    const prices = await axios.post(process.env.REACT_APP_ALL_PRICE_API!, {
      endDate: checkOutDate,
      propertyId: propertyName,
      roomTypeName,
      startDate: checkInDate,
    });

    setDailyPrice(prices.data);
  };
  const dispatch = useAppDispatch();

  const removeCard = () => {
    dispatch(setShowItenaryInCardsPageToFalse());
    {
      pathname == "/checkout" && navigate("/");
    }
  };

  useEffect(() => {
    fetchDailyPrice();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openPriceModal, setOpenPriceModal] = React.useState(false);
  const handleOpenPriceModal = () => {
    Object.entries(dailyPrice).map(([key, value]) => {
      console.log(dailyPrice[key]);
      setRoomTotal(
        (roomTotalHere) => roomTotalHere + dailyPrice[key] * priceFactor
      );
    });
    setOpenPriceModal(true);
  };
  const handleClosePriceModal = () => setOpenPriceModal(false);

  return (
    <div
      className={
        pathname == "/checkout"
          ? "container_itenary_box"
          : "container_itenary_box expand"
      }
    >
      <div className="itenary">
        <div className="header">
          <div className="header_left">Your Trip Itinerary</div>
          <div className="remove" onClick={() => removeCard()}>
            Remove
          </div>
        </div>
        <div className="property_name">property - {propertyName}</div>
        <div className="date_and_guest">
          {format(new Date(checkInDate!), "MMMM dd")} -{" "}
          {format(new Date(checkOutDate!), "MMMM dd, yyyy")} |{" "}
          {guests && guests[0] && "1"} Adult {guests![1]} child
        </div>
        <div className="room_type_name">{roomTypeName}</div>
        <div className="avg_rate">${averageNightlyRateInDuration}/night</div>
        <div className="room_count">{rooms} room</div>
        {pathname != "/checkout" &&
          Object.entries(dailyPrice).map(([key, value]) => (
            <div key={key} className="charges">
              <div className="charge_name">
                {format(new Date(key), "EEEE, do MMM")}
              </div>
              <div className="charge">${dailyPrice[key]}</div>
            </div>
          ))}
        <div className={pathname == "/checkout" ? "promo" : "promo promo-end"}>
          {promotionTitle}{" "}
          <InfoOutlinedIcon
            onClick={handleOpen}
            sx={{ height: 0.04, width: 0.04, cursor: "pointer" }}
          />
          <span>
            , ${(averageNightlyRateInDuration * priceFactor).toFixed(0)}
            /night
          </span>
        </div>
        <div className="border_line"></div>
        <div className="charges">
          <div className="charge_name">Subtotal</div>
          <div className="charge">
            $
            {(averageNightlyRateInDuration * priceFactor * duration).toFixed(2)}
          </div>
        </div>
        <div className="charges">
          <div className="charge_name">
            Taxes,Surcharges,Fees{" "}
            <InfoOutlinedIcon
              onClick={handleOpenPriceModal}
              sx={{ height: 0.05, width: 0.05, cursor: "pointer" }}
            />
          </div>
          <div className="charge">${(totalBill * 0.18).toFixed(2)}</div>
        </div>
        <div className="charges">
          <div className="charge_name">VAT</div>
          <div className="charge">${(totalBill * 0.08).toFixed(2)}</div>
        </div>
        <div className="border_line"></div>
        <div className="charges">
          <div className="charge_name">Due Now</div>
          {promotionTitle != "Upfront payment discount" && (
            <div className="charge">
              ${(totalBillAfterTax * 0.15).toFixed(2)}
            </div>
          )}
          {promotionTitle == "Upfront payment discount" && (
            <div className="charge">
              ${(totalBillAfterTax * 0.9).toFixed(2)}
            </div>
          )}
        </div>
        <div className="charges">
          <div className="charge_name">Due at Resort</div>
          {promotionTitle != "Upfront payment discount" && (
            <div className="charge">
              ${(totalBillAfterTax * 0.85).toFixed(2)}
            </div>
          )}
          {promotionTitle == "Upfront payment discount" && (
            <div className="charge">$0</div>
          )}
        </div>

        <button className={"btn"} onClick={(e) => continueShopping(e)}>
          Continue Shopping
        </button>
      </div>

      <div className="help_box">
        <div className="help_text">Need Help?</div>
        <div className="phone">Call 1-800-555-5555</div>
        <div className="dates">Mon-Fr 8a-5p EST</div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="promo-desc">{promotionTitle}</div>
          <div>{promotionDescription}</div>
          <div className="promo-modal">
            <div className="promo-modal_package">Package Total</div>
            <div className="promo-modal_package-price">
              ${totalBill.toFixed(0)}
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openPriceModal}
        onClose={handleClosePriceModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="">Rate Breakdown</div>
          <div className="room_type_name">{roomTypeName}</div>
          <div className="avg_rate price-modal">
            ${averageNightlyRateInDuration}/night
          </div>
          <div className="avg_rate price-modal">{promotionTitle}</div>
          {Object.entries(dailyPrice).map(([key, value]) => (
            <div key={key} className="charges">
              <div className="charge_name">
                {format(new Date(key), "EEEE, do MMM")}
              </div>
              <div className="charge">${dailyPrice[key]}</div>
            </div>
          ))}

          <div className="charges room_total">
            <div className="charge_name">Room Total </div>
            <div className="charge">${roomTotal}</div>
          </div>

          <div className="border_line"></div>

          <div>Taxes and Fees(per room)</div>

          <div className="charges tax">
            <div className="charge_name">Resort Fee</div>
            <div className="charge">{(roomTotal * 0.18 * 0.7).toFixed(2)}</div>
          </div>

          <div className="charges tax">
            <div className="charge_name">Occupancy Fee</div>
            <div className="charge">{(roomTotal * 0.18 * 0.3).toFixed(2)}</div>
          </div>

          <div className="border_line"></div>

          <div className="charges tax">
            <div className="charge_name">Due Now</div>
            <div className="charge">${(roomTotal * 0.15).toFixed(2)}</div>
          </div>
          <div className="charges tax">
            <div className="charge_name">Due at Resort</div>
            <div className="charge">${(roomTotal * 0.85).toFixed(2)}</div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Itenary;
