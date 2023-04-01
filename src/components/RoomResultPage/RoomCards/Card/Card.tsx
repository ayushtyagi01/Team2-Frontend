import "./Card.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";
import Carousel from "./CarouselContainer/CarouselContainer";
import { RoomResult } from "../../../../redux/slice/PostDataSlice";

interface RoomResultProps {
  result: RoomResult;
}
const Card: React.FC<RoomResultProps> = (props) => {
  return (
    <>
      <div className="carousel-container">
        <Carousel />
      </div>
      <div className="room-name-heading">
        <div className="room-name">{props.result.roomTypeName}</div>
        <div className="property-rating">New Property</div>
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
        {props.result.doubleBedCount > 0 ? props.result.doubleBedCount + " Queens Bed" : ""}{" "}
        {props.result.singleBedCount > 0 ? props.result.singleBedCount + " Kings Bed" : ""}
      </div>
      <div className="room-size price-div">$ {props.result.averageNightlyRateInDuration}</div>
      <div className="per-night-div">per night</div>
      <Button variant="contained" className="button-select">
        <FormattedMessage id="Searchi" defaultMessage="Select Room" />
      </Button>
    </>
  );
};

export default Card;
