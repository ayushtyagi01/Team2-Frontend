import React, { useEffect, useRef, useState } from "react";
import CarouselContainer from "../CarouselContainer/CarouselContainer";
import "./RoomDetailsModal.scss";
import { RoomResult } from "../../../../../redux/slice/PostDataSlice";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Button } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { FormattedMessage } from "react-intl";
import { roomPostData } from "../../../../../util/roomPostData";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  roomImages,
  setRoomTypeDetails,
  setShowItenaryInCardsPageToTrue,
} from "../../../../../redux/slice/RoomResultConfigSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { selectedcurrency, selectedFactor } from "../../../../../redux/slice/InternationalisationSlice";
import { getCurrencyLogo } from "../../../../../util/GetCurrencyLogo";

type Props = {
  result: RoomResult;
  handleCloseModal: () => void;
};

type PromotionType = {
  promotionTitle: string;
  promotionDescription: string;
  minDaysOfStay?: number | undefined;
  priceFactor: number;
};

type CustomPromotionType = {
  coupon_code: string;
  title: string;
  description: string;
  priceFactor: number;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RoomDetailsModal = (props: Props) => {
  const couponCodeRef = useRef<HTMLInputElement>(null);
  const [promotions, setPromotions] = useState<PromotionType[] | []>([]);
  const [customPromotions, setCustomPromotions] = useState<
    CustomPromotionType | undefined
  >();
  const roomImagesHere = useAppSelector(roomImages);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const checkInDate = searchParams.get("start_date")
    ? searchParams.get("start_date")
    : localStorage.getItem("startDate");
  const checkOutDate = searchParams.get("end_date")
    ? searchParams.get("end_date")
    : localStorage.getItem("endDate");
  const duration =
    checkInDate && checkOutDate
      ? new Date(checkOutDate).getDate() - new Date(checkInDate).getDate()
      : roomPostData.duration;

  const [open, setOpen] = useState(false);

  const pricefactor = useAppSelector(selectedFactor);
  const currency = useAppSelector(selectedcurrency);
  const [currencyLogo, setCurrencyLogo] = useState<string>("$");
  useEffect(() => {
    setCurrencyLogo(getCurrencyLogo(currency));
  }, [pricefactor]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const description:any = roomImagesHere.map((roomImageData) => {
    if (roomImageData.roomTypeName === props.result.roomTypeName) {
      return roomImageData.description;
    }
  });

  const amnetieis = roomImagesHere.filter(
    (roomImage) => roomImage.roomTypeName === props.result.roomTypeName
  )[0].amnetieis;

  const { images, roomTypeName } = roomImagesHere.filter(
    (roomImage) => roomImage.roomTypeName === props.result.roomTypeName
  )[0];

  const fetchPromotions = async () => {
    try {
      const applicablePromotions: any = await axios.post(
        process.env.REACT_APP_PROMOTIONS_API!,
        {
          checkInDate,
          checkOutDate,
          duration,
        }
      );
      setPromotions(applicablePromotions.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getCustomPromotions = async () => {
    try {
      const applicablePromotions: any = await axios.post(
        process.env.REACT_APP_CUSTOM_PROMOTIONS_API!,
        {
          couponCode: couponCodeRef.current?.value,
          duration,
          roomType: props.result.roomTypeName,
        }
      );
      if (typeof applicablePromotions.data === "string") {
        handleClick();
        return;
      }
      setCustomPromotions(applicablePromotions.data);
    } catch (e) {
      handleClick();
      if (couponCodeRef.current) {
        couponCodeRef.current.value = "";
      }
    }
  };

  const navigateToCheckoutPage = (
    promotionTitle: string,
    priceFactor: number,
    promotionDescription: string
  ) => {
    dispatch(
      setRoomTypeDetails({
        promotionTitle,
        priceFactor,
        roomTypeName,
        averageNightlyRateInDuration: props.result.averageNightlyRateInDuration,
        promotionDescription,
      })
    );
    dispatch(setShowItenaryInCardsPageToTrue());
    localStorage.setItem("roomTypeName", roomTypeName);
    localStorage.setItem("showItenary", "true");
    localStorage.setItem(
      "averageNightlyRateInDuration",
      props.result.averageNightlyRateInDuration.toString()
    );
    localStorage.setItem("priceFactor", priceFactor.toString());
    localStorage.setItem("promotionTitle", promotionTitle);
    navigate("/checkout", {
      state: {
        promotionTitle,
        priceFactor,
        roomTypeName,
        averageNightlyRateInDuration: props.result.averageNightlyRateInDuration,
      },
    });
  };

  useEffect(() => {
    fetchPromotions();
  }, []);
  console.log("hello",description)

  return (
    <div className="modal">
      <CloseOutlinedIcon
        className="close-btn"
        onClick={() => props.handleCloseModal()}
      />
      <div className="carousel-container_in_modal">
        <CarouselContainer images={images} />
      </div>
      <div className="room_type_name">{props.result.roomTypeName}</div>
      <div className="text-info">
        <div className="upper-left-details">
          <div className="upper-left-details_header">
            <div className="logo-div">
              <PermIdentityIcon /> 1-{props.result.maxCapacity}
            </div>
            <div className="logo-div">
              <SingleBedIcon />{" "}
              {props.result.doubleBedCount > 0
                ? props.result.doubleBedCount + " Queens Bed"
                : ""}{" "}
              {props.result.singleBedCount > 0
                ? props.result.singleBedCount + " Kings Bed"
                : ""}
            </div>
            <div className="logo-div room-size">
              <div className="area">{props.result.areaInSqFeet} ft</div>
            </div>
          </div>
          <div className="upper-left-details_desc">
              <FormattedMessage id={description} defaultMessage={description} />
          </div>
        </div>
        <div className="upper-right-details">
          <div className="amneties_header">Amenities</div>
          <div className="amneties">
            {amnetieis.map((amienity) => {
              return (
                <div className="amienity">
                  <CheckCircleOutlineOutlinedIcon className="check-icon" />{" "}
                  <FormattedMessage id={amienity} defaultMessage={amienity} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="packages">
        <div className="standard">
          <div className="package-type"><FormattedMessage id="Standard Package" defaultMessage="Standard Package" /></div>
          <div className="package">
            <div className="package-left">
              <div className="title"><FormattedMessage id="Standard Rate" defaultMessage="Standard Rate" /></div>
              <div className="desc"><FormattedMessage id={description} defaultMessage={description} /></div>
            </div>
            <div className="package-right">
              <div className="price">
                {currencyLogo}{(props.result.averageNightlyRateInDuration*pricefactor).toFixed(2)}
              </div>
              <div className="per-night-text">per night</div>
              <Button
                variant="contained"
                className="button-select"
                onClick={() =>
                  navigateToCheckoutPage(
                    "Standard Rate",
                    1,
                    "Pay the entire amount"
                  )
                }
              >
                <FormattedMessage
                  id="Select Package"
                  defaultMessage="Select Package"
                />
              </Button>
            </div>
          </div>
        </div>

        <div className="deals_and_packages">
          <div className="package-type">Deals and packages</div>

          {promotions.map((promo) => {
            return (
              <div className="package">
                <div className="package-left">
                  <div className="title">{promo.promotionTitle}</div>
                  <div className="desc">{promo.promotionDescription}</div>
                </div>
                <div className="package-right">
                  <div className="price">
                    {currencyLogo}
                    {(
                      props.result.averageNightlyRateInDuration *
                      promo.priceFactor * pricefactor
                    ).toFixed(2)}
                  </div>
                  <div className="per-night-text">per night</div>
                  <Button
                    variant="contained"
                    className="button-select"
                    onClick={() =>
                      navigateToCheckoutPage(
                        promo.promotionTitle,
                        promo.priceFactor,
                        promo.promotionDescription
                      )
                    }
                  >
                    <FormattedMessage
                      id="Searchi"
                      defaultMessage="Select Package"
                    />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="custom_deals_and_packages">
          {customPromotions && (
            <div className="package-type">Special Deals and packages</div>
          )}

          {customPromotions && (
            <div className="package">
              <div className="package-left">
                <div className="title">{customPromotions?.title}</div>
                <div className="desc">{customPromotions?.description}</div>
              </div>
              <div className="package-right">
                <div className="price">
                  {currencyLogo}
                  {(
                    props.result.averageNightlyRateInDuration * pricefactor*
                    customPromotions?.priceFactor 
                  ).toFixed(2)}
                </div>
                <div className="per-night-text">per night</div>
                <Button
                  variant="contained"
                  className="button-select"
                  onClick={() =>
                    navigateToCheckoutPage(
                      customPromotions?.title,
                      customPromotions?.priceFactor,
                      customPromotions.description
                    )
                  }
                >
                  <FormattedMessage
                    id="Searchi"
                    defaultMessage="Select Package"
                  />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="add_coupon_code">
        <div className="add_coupon_code_title">Enter a promo code</div>
        <div className="coupon_code">
          <input type="text" className="coupon_input" ref={couponCodeRef} />
          <Button
            variant="contained"
            className="button-select"
            onClick={() => getCustomPromotions()}
          >
            <FormattedMessage id="Searchi" defaultMessage="APPLY" />
          </Button>
        </div>
      </div>
      {/* error coupon code snakbar */}
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} className="snackbar">
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{
            width: "100%",
            position: "relative",
            bottom: customPromotions ? -1100 : -1000,
            zIndex: 100,
            left: 1400,
          }}
        >
          Incorrect coupon!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RoomDetailsModal;
