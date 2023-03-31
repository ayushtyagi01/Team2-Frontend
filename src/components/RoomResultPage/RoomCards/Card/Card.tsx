import "./Card.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";
import Carousel from "./CarouselContainer/CarouselContainer";

const RoomCards: React.FC = () => {
  return (
    <>
      <div className="carousel-container">
        <Carousel />
      </div>
      <div className="room-name-heading">
        <div className="room-name">Long Beautiful Result Name</div>
        <div className="property-rating">New Property</div>
      </div>
      <div className="logo-div">
        <LocationOnIcon className="location-icon" /> Near City Center
      </div>
      <div className="logo-div room-size">
        <div className="room-type">Inclusive</div>
        <div>301ft</div>
      </div>
      <div className="logo-div">
        <PermIdentityIcon /> 1-2
      </div>
      <div className="logo-div">
        <SingleBedIcon /> Queens or Double Bed
      </div>
      <div className="room-size price-div">$ 132</div>
      <div className="per-night-div">per night</div>
      <Button variant="contained" className="button-select">
        <FormattedMessage id="Searchi" defaultMessage="Select Room" />
      </Button>
    </>
  );
};

export default RoomCards;
