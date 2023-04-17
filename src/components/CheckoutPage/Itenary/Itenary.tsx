import React, { useEffect, useState } from "react";
import "./Itenary.scss";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectedRoomTypeDetails,
  setShowItenaryInCardsPage,
  setShowItenaryInCardsPageToFalse,
} from "../../../redux/slice/RoomResultConfigSlice";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  selectedcurrency,
  selectedFactor,
} from "../../../redux/slice/InternationalisationSlice";
import { getCurrencyLogo } from "../../../util/GetCurrencyLogo";
import { FormattedMessage } from "react-intl";

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
  const { promotionTitle, priceFactor, roomTypeName, promotionDescription } =
    useAppSelector(selectedRoomTypeDetails);

  const pricefactor = useAppSelector(selectedFactor);
  const currency = useAppSelector(selectedcurrency);
  const [currencyLogo, setCurrencyLogo] = useState<string>("$");
  useEffect(() => {
    setCurrencyLogo(getCurrencyLogo(currency));
  }, [pricefactor]);

  const propertyName =
    localStorage.getItem("property")!?.length > 1
      ? localStorage.getItem("property")?.substring(1, 2)
      : localStorage.getItem("property");
  const checkInDate = localStorage.getItem("startDate");
  const checkOutDate = localStorage.getItem("endDate");
  const guests = JSON.parse(localStorage.getItem("guest")!);
  const rooms = localStorage.getItem("room");
  const dispatch = useAppDispatch();

  const totalBill =
    parseInt(localStorage.getItem("averageNightlyRateInDuration")!) *
    parseFloat(localStorage.getItem("priceFactor")!) *
    (new Date(localStorage.getItem("endDate")!).getDate() -
      new Date(localStorage.getItem("startDate")!).getDate() +
      1);
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
    if (pathname === "/checkout") navigate("/room-search-results");
    else navigate("/checkout");
  };

  const fetchDailyPrice = async () => {
    const prices = await axios.post(process.env.REACT_APP_ALL_PRICE_API!, {
      endDate: checkOutDate,
      propertyId: propertyName,
      roomTypeName: localStorage.getItem("roomTypeName"),
      startDate: checkInDate,
    });
    setDailyPrice(prices.data);
  };

  useEffect(() => {
    fetchDailyPrice();
  }, []);

  const removeCard = () => {
    localStorage.removeItem("showItenary");
    dispatch(setShowItenaryInCardsPageToFalse());
    dispatch(setShowItenaryInCardsPage(false));
    // window.history.replaceState(null, null, "/");
    {
      pathname === "/checkout" && navigate("/");
    }
  };

  const taxes = JSON.parse(localStorage.getItem("taxes")!);
  let totalTax: number = 0;
  totalTax = taxes.reduce((acc: number, tax: any) => {
    const taxAmount = totalBill * tax.factor;
    return acc + taxAmount;
  }, 0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openPriceModal, setOpenPriceModal] = React.useState(false);
  const handleOpenPriceModal = () => {
    Object.entries(dailyPrice).map(([key, value]) => {
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
        pathname === "/checkout"
          ? "container_itenary_box"
          : "container_itenary_box expand"
      }
    >
      <div className="itenary">
        <div className="header">
          <div className="header_left">
            <FormattedMessage
              id="itinerary"
              defaultMessage="Your Trip Itinerary"
            />
          </div>
          <div className="remove" onClick={() => removeCard()}>
            <FormattedMessage id="remove" defaultMessage="Remove" />
          </div>
        </div>
        <div className="property_name">property - {propertyName}</div>
        <div className="date_and_guest">
          {format(new Date(checkInDate!), "MMMM dd")} -{" "}
          {format(new Date(checkOutDate!), "MMMM dd, yyyy")} |{" "}
          {guests && guests[0] && "1"} Adult {guests![1]} child
        </div>
        <div className="room_type_name">
          {localStorage.getItem("roomTypeName")}
        </div>
        <div className="avg_rate">
          {currencyLogo}{" "}
          {(
            +localStorage.getItem("averageNightlyRateInDuration")! * pricefactor
          ).toFixed(2)}
          /night
        </div>
        <div className="room_count">
          {rooms} <FormattedMessage id="Room" defaultMessage="Room" />
        </div>
        {pathname !== "/checkout" &&
          Object.entries(dailyPrice).map(([key, value]) => (
            <div key={key} className="charges">
              <div className="charge_name">
                {format(new Date(key), "EEEE, do MMM")}
              </div>
              <div className="charge">
                {currencyLogo}
                {(dailyPrice[key] * pricefactor).toFixed(2)}
              </div>
            </div>
          ))}
        <div className={pathname === "/checkout" ? "promo" : "promo promo-end"}>
          {localStorage.getItem("promotionTitle")}{" "}
          <InfoOutlinedIcon
            onClick={handleOpen}
            sx={{ height: 0.04, width: 0.04, cursor: "pointer" }}
          />
          <span>
            , $
            {(
              parseInt(localStorage.getItem("averageNightlyRateInDuration")!) *
              parseFloat(localStorage.getItem("priceFactor")!)
            ).toFixed(0)}
            /night
          </span>
        </div>
        <div className="border_line"></div>
        <div className="charges">
          <div className="charge_name">Subtotal</div>
          <div className="charge">
            {currencyLogo}
            {(
              +totalBill *
              pricefactor *
              +localStorage.getItem("room")!
            ).toFixed(2)}
          </div>
        </div>
        <div className="charges">
          <div className="charge_name">
            <FormattedMessage
              id="Taxes-Surcharges-Fees"
              defaultMessage="Taxes, Surcharges, Fees"
            />{" "}
            <InfoOutlinedIcon
              onClick={handleOpenPriceModal}
              sx={{ height: 0.05, width: 0.05, cursor: "pointer" }}
            />
          </div>
          <div className="charge">
            {currencyLogo}
            {(totalTax * pricefactor).toFixed(2)}
          </div>
        </div>
        <div className="charges">
          <div className="charge_name">VAT</div>
          <div className="charge">
            {currencyLogo}
            {(totalBill * 0.08 * pricefactor).toFixed(2)}
          </div>
        </div>
        <div className="border_line"></div>
        <div className="charges">
          <div className="charge_name">
            <FormattedMessage id="due-now" defaultMessage="Due Now" />
          </div>
          {promotionTitle !== "Upfront payment discount" && (
            <div className="charge">
              {currencyLogo}
              {(totalBillAfterTax * 0.15 * pricefactor).toFixed(2)}
            </div>
          )}
          {promotionTitle === "Upfront payment discount" && (
            <div className="charge">
              {currencyLogo}
              {(totalBillAfterTax * 0.9 * pricefactor).toFixed(2)}
            </div>
          )}
        </div>
        <div className="charges">
          <div className="charge_name">
            <FormattedMessage id="due-resort" defaultMessage="Due at Resort" />
          </div>
          {promotionTitle !== "Upfront payment discount" && (
            <div className="charge">
              {currencyLogo}
              {(totalBillAfterTax * 0.85 * pricefactor).toFixed(2)}
            </div>
          )}
          {promotionTitle === "Upfront payment discount" && (
            <div className="charge">{currencyLogo}0</div>
          )}
        </div>
        {pathname === "/checkout" ? (
          <button className={"btn"} onClick={(e) => continueShopping(e)}>
            <FormattedMessage
              id="Continue Shopping"
              defaultMessage="Continue Shopping"
            />
          </button>
        ) : (
          <button className={"btn"} onClick={(e) => continueShopping(e)}>
            Checkout
          </button>
        )}
      </div>

      {pathname === "/checkout" && (
        <div className="help_box">
          <div className="help_text">
            <FormattedMessage
              id="need-help"
              defaultMessage=" Need Help?"
            />
          </div>
          <div className="phone">Call 1-800-555-5555</div>
          <div className="dates">Mon-Fr 8a-5p EST</div>
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="close-btn">
            <CloseOutlinedIcon onClick={() => handleClose()} />
          </div>

          <div className="promo-desc">{promotionTitle}</div>

          <div>{promotionDescription}</div>
          <div className="promo-modal">
            <div className="promo-modal_package">Package Total</div>
            <div className="promo-modal_package-price">
              {currencyLogo}
              {(totalBill * pricefactor).toFixed(0)}
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
          <div className="close-btn">
            <CloseOutlinedIcon onClick={() => handleClosePriceModal()} />
          </div>

          <div className="">Rate Breakdown</div>

          <div className="room_type_name">{roomTypeName}</div>
          <div className="avg_rate price-modal">
            {currencyLogo}
            {(
              +localStorage.getItem("averageNightlyRateInDuration")! *
              pricefactor
            ).toFixed(2)}
            /night
          </div>
          <div className="avg_rate price-modal">
            {localStorage.getItem("promotionTitle")!}
          </div>
          {Object.entries(dailyPrice).map(([key, value]) => (
            <div key={key} className="charges">
              <div className="charge_name">
                {format(new Date(key), "EEEE, do MMM")}
              </div>
              <div className="charge">
                {currencyLogo}
                {(dailyPrice[key] * pricefactor).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="charges room_total">
            <div className="charge_name">Room Total </div>
            <div className="charge">
              {currencyLogo}
              {(totalBill * pricefactor).toFixed(2)}
            </div>
          </div>

          <div className="border_line"></div>

          <div>Taxes and Fees(per room)</div>
          {taxes.map((tax: any) => (
            <div className="charges tax" key={tax.name}>
              <div className="charge_name">{tax.name}</div>
              <div className="charge">
                {currencyLogo}
                {(totalBill * tax.factor * pricefactor).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="border_line"></div>

          <div className="charges tax">
            <div className="charge_name">Due Now</div>
            <div className="charge">
              {currencyLogo}
              {(totalBill * 0.15 * pricefactor).toFixed(2)}
            </div>
          </div>
          <div className="charges tax">
            <div className="charge_name">Due at Resort</div>
            <div className="charge">
              {currencyLogo}
              {(totalBill * 0.85 * pricefactor).toFixed(2)}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Itenary;
