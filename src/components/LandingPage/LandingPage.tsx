import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import GuestDropdown from "./Guests/GuestDropdown";
import PropertyDropdown from "./PropertyDropdown/PropertyDropdown";
import RoomDropdown from "./RoomDropdown/RoomDropdown";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./LandingPage.scss";
import CalenderDropdown from "./CalenderDropdown/CalenderDropdown";
import { useDispatch } from "react-redux";
import {
  end_date,
  isWheelchair,
  start_date,
  noOfRooms,
  guestsCount,
  wheelchair,
  property_name,
  beds,
} from "../../redux/slice/SearchFormSlice";
import { useAppSelector } from "../../redux/hooks";
import {
  accessibility,
  availableTypeOfGuests,
  bannerImage,
  isRooms,
} from "../../redux/slice/landingPageSlice";
import AccessibleIcon from "@mui/icons-material/Accessible";
import { schema } from "../../util/constants/formSchema";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const reduxDispatch = useDispatch();
  const banner_image = useAppSelector(bannerImage);
  const isRoom = useAppSelector(isRooms);
  const guest = useAppSelector(availableTypeOfGuests);
  const accessable = useAppSelector(accessibility);

  const property = useAppSelector(property_name);
  const startDate = useAppSelector(start_date);
  const endDate = useAppSelector(end_date);
  const guests = useAppSelector(guestsCount);
  const rooms = useAppSelector(noOfRooms);
  const bed = useAppSelector(beds);
  const accessability = useAppSelector(wheelchair);

   const addToLocalStorage = () => {
    localStorage.setItem("property", JSON.stringify(property));
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
    localStorage.setItem("guest", JSON.stringify(guests));
    localStorage.setItem("room", JSON.stringify(rooms));
    localStorage.setItem("wheelchair", accessability.toString());
  };
  const onSubmit = () => {
    addToLocalStorage();
    navigate({
      pathname: "/room-search-results",
      search: `?property=2&start_date=${startDate}&end_date=${endDate}&guest=${guests}&room=${rooms}&beds=${bed}&wheelchair=${accessability}`,
    });
  };

  const handleWheelchair = (e: React.ChangeEvent<HTMLInputElement>) => {
    reduxDispatch(isWheelchair(e.target.checked));
  };
  return (
    <div className="container">
      <div
        className="search-container"
        data-testid="LandingPage"
        style={{
          backgroundImage: `url(${banner_image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Box className="search-box">
            <FormattedMessage
              id="propertyName"
              defaultMessage="Property Name*"
            />
          </Box>
          <PropertyDropdown
            register={register}
            required={true}
            errors={errors}
          />
          <Box className="search-box">
            <FormattedMessage id="Selectdates" defaultMessage="Select dates" />
          </Box>
          <CalenderDropdown
            register={register}
            errors={errors}
            isInside={false}
            margin={2}
            width={"90%"}
            top={-1.5}
            start={"Check-in"}
            end={"Check-out"}
          />
          <div className="guest-room-container">
            {guest.length === 0 ? (
              ""
            ) : (
              <div
                className={`guest-container ${
                  isRoom === "true" ? "" : "full-guest"
                }`}
              >
                <Box className="search-box">
                  <FormattedMessage id="Guests" defaultMessage="Guests" />
                </Box>
                <GuestDropdown
                  isInside={false}
                  margin={3}
                  width={"100%"}
                  top={-1.5}
                />
              </div>
            )}
            {isRoom === "true" ? (
              <div
                className={`room-container ${
                  guest.length !== 0 ? "" : "full-room"
                }`}
              >
                <Box className="search-box">
                  <FormattedMessage id="Room" defaultMessage="Room" />
                </Box>
                <RoomDropdown
                  isInside={false}
                  margin={2.5}
                  width={"100%"}
                  top={-1.5}
                />
              </div>
            ) : (
              ""
            )}
            {accessable.length === 0 ? (
              ""
            ) : (
              <FormControlLabel
                className="checkbox-container"
                value="end"
                control={<Checkbox onChange={(e) => handleWheelchair(e)} />}
                label={
                  <span>
                    <AccessibleIcon />{" "}
                    <FormattedMessage
                      id="wheelchair"
                      defaultMessage="I need an accessible room"
                    />
                  </span>
                }
                labelPlacement="end"
              />
            )}
          </div>

          <Button type="submit" variant="contained" className="btn-submit">
            <FormattedMessage id="Search" defaultMessage="Search" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
