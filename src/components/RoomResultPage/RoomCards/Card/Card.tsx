import "./Card.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";
import Carousel from "./CarouselContainer/CarouselContainer";
import { RoomResult } from "../../../../redux/slice/PostDataSlice";
import GradeIcon from "@mui/icons-material/Grade";
import { useDispatch } from "react-redux";
import {
  selectedcurrency,
  selectedFactor,
} from "../../../../redux/slice/InternationalisationSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { getCurrencyLogo } from "../../../../util/GetCurrencyLogo";
import { useEffect, useState } from "react";
import RoomDetailsModal from "./Modal/RoomDetailsModal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { log } from "console";
import { roomImages } from "../../../../redux/slice/RoomResultConfigSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1700,
  height: 820,
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  mt: 0.5,
  mb: 1,
  "&::-webkit-scrollbar": {
    width: "0.1em", // adjust as needed
    height: "0.1em", // adjust as needed
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888", // adjust as needed
    borderRadius: "1em", // adjust as needed
    border: "1px solid #888", // adjust as needed
  },
};

interface RoomResultProps {
  result: RoomResult;
}
const Card: React.FC<RoomResultProps> = (props) => {
  const priceFactor = useAppSelector(selectedFactor);
  const currency = useAppSelector(selectedcurrency);
  const [currencyLogo, setCurrencyLogo] = useState<string>("$");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const roomImagesHere = useAppSelector(roomImages);

  const images = roomImagesHere.filter(
    (roomImage) => roomImage.roomTypeName === props.result.roomTypeName
  )[0].images;

  useEffect(() => {
    setCurrencyLogo(getCurrencyLogo(currency));
  }, [priceFactor]);
  return (
    <div className="cards">
      <div className="carousel-container">
        <Carousel images={images} />
      </div>
      <div className="room-name-heading">
        <div className="room-name">{props.result.roomTypeName}</div>
        <div className="property-rating">
          <GradeIcon className="rating-icon" />
          {props.result.ratings}
        </div>
      </div>
      <div className="logo-div">
        <LocationOnIcon className="location-icon" /> Near City Center
      </div>
      <div className="logo-div room-size">
        <div className="room-type">Inclusive</div>
        <div>{props.result.areaInSqFeet}</div>
      </div>
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
      <div className="room-size price-div">
        {currencyLogo}{" "}
        {Math.round(props.result.averageNightlyRateInDuration * priceFactor)}
      </div>
      <div className="per-night-div">per night</div>
      <Button
        variant="contained"
        className="button-select"
        onClick={handleOpen}
      >
        <FormattedMessage id="Searchi" defaultMessage="Select Room" />
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <RoomDetailsModal result={props.result} />
        </Box>
      </Modal>
    </div>
  );
};

export default Card;
