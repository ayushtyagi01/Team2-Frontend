import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import GuestDropdown from "./Guests/GuestDropdown";
import PropertyDropdown from "./PropertyDropdown/PropertyDropdown";
import RoomDropdown from "./RoomDropdown/RoomDropdown";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./LandingPage.scss";
import CalenderDropdown from "./CalenderDropdown/CalenderDropdown";
import { useDispatch } from "react-redux";
import { isWheelchair } from "../../redux/slice/SearchFormSlice";
import { useAppSelector } from "../../redux/hooks";
import {
  accessibility,
  availableTypeOfGuests,
  bannerImage,
  rooms,
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

  const onSubmit = () => {
    console.log("onSubmit");
    navigate('/room-search-results');
  };
  const reduxDispatch = useDispatch();
  const banner_image = useAppSelector(bannerImage);
  const room = useAppSelector(rooms);
  const guest = useAppSelector(availableTypeOfGuests);
  const accessable = useAppSelector(accessibility);

  const handleWheelchair = (e: React.ChangeEvent<HTMLInputElement>) => {
    reduxDispatch(isWheelchair(e.target.checked));
  };

  return (
    <>
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
            isInside={false} margin={2} width={'90%'} top={-1.5} start={"Check-in"} end={"Check-out"}
          />
          <div className="guest-room-container">
            {guest.length === 0 ? (
              ""
            ) : (
              <div
                className={`guest-container ${
                  room === "true" ? "" : "full-guest"
                }`}
              >
                <Box className="search-box">
                  <FormattedMessage id="Guests" defaultMessage="Guests" />
                </Box>
                <GuestDropdown isInside={false} margin={3} width={'100%'} top={-1.5} />
              </div>
            )}
            {room === "true" ? (
              <div
                className={`room-container ${
                  guest.length !== 0 ? "" : "full-room"
                }`}
              >
                <Box className="search-box">
                  <FormattedMessage id="Room" defaultMessage="Room" />
                </Box>
                <RoomDropdown isInside={false} margin={2.5} width={'100%'} top={-1.5}/>
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
    </>
  );
};

export default LandingPage;
