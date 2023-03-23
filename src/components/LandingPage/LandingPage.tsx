import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import GuestDropdown from "./Guests/GuestDropdown";
import PropertyDropdown from "./PropertyDropdown";
import RoomDropdown from "./RoomDropdown";
import { useForm } from "react-hook-form";
import "./LandingPage.scss";
import CalenderDropdown from "./CalenderDropdown/CalenderDropdown";
import { useDispatch } from "react-redux";
import { isWheelchair } from "../../redux/slice/SearchForm";

const LandingPage = () => {
  const { handleSubmit,register,formState: { errors } } = useForm();
  const onSubmit = () => {
    console.log("submited");
  };
  const reduxDispatch = useDispatch();

  const handleWheelchair = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
   reduxDispatch(isWheelchair(e.target.checked));
  };
  return (
    <>
      <div className="search-container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Box className="search-box">Property Name*</Box>
          <PropertyDropdown register={register} required={true} errors={errors}/>
          <Box className="search-box">Select dates</Box>
          <CalenderDropdown />
          <div className="guest-room-container">
            <div className="guest-container">
              <Box className="search-box">Guests</Box>
              <GuestDropdown />
            </div>
            <div className="room-container">
              <Box className="search-box">Room</Box>
              <RoomDropdown />
            </div>
          </div>
          <FormControlLabel
            className="checkbox-container"
            value="end"
            control={<Checkbox onChange={(e)=>handleWheelchair(e)} />}
            label="I need an accessable room"
            labelPlacement="end"
          />
          <div className="btn-container">
            <Button type="submit" variant="contained" className="btn-submit">
              Search
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LandingPage;
