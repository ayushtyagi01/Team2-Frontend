import RoomDropdown from "../../LandingPage/RoomDropdown/RoomDropdown";
import GuestDropdown from "../../LandingPage/Guests/GuestDropdown";
import "./SearchForm.scss";
import CalenderDropdown from "../../LandingPage/CalenderDropdown/CalenderDropdown";
import Beds from "../Beds/Beds";
import { useForm } from "react-hook-form";
import { schema } from "../../../util/constants/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { beds, end_date, guestsCount, noOfRooms, property_name, start_date, wheelchair } from "../../../redux/slice/SearchFormSlice";
import {useNavigate } from "react-router-dom";
import { roomPostData } from "../../../util/roomPostData";
import { getRoomData } from "../../../redux/slice/PostDataSlice";

const SearchForm: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const property = useAppSelector(property_name);
  const startDate = useAppSelector(start_date);
  const endDate = useAppSelector(end_date);
  const guests = useAppSelector(guestsCount);
  const rooms = useAppSelector(noOfRooms);
  const bed = useAppSelector(beds);
  const accessability = useAppSelector(wheelchair);

  const navigate = useNavigate();
  const reduxDispatch = useAppDispatch();

  const addToLocalStorage = () => {
    localStorage.setItem("property", property.toString());
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
    localStorage.setItem("guest", JSON.stringify(guests));
    localStorage.setItem("room", rooms.toString());
    localStorage.setItem("wheelchair", accessability.toString());
  };

  const handleClick = ()=>{
    addToLocalStorage();
    navigate({
      pathname: "/room-search-results",
      search: `?property=${property}&start_date=${startDate}&end_date=${endDate}&guest=${guests}&room=${rooms}&beds=${bed}&wheelchair=${accessability}`,
    });
    roomPostData.requiredBedCount=bed;
    reduxDispatch(getRoomData(roomPostData));
  }
  return (
    <>
      <div className="search-containers">
        <GuestDropdown isInside={true} margin={3} width={"20%"} top={1.5} />
        <RoomDropdown isInside={true} margin={3} width={"15%"} top={1.5} />
        <Beds />
        <CalenderDropdown
          register={register}
          errors={errors}
          isInside={true}
          margin={3}
          width={"32%"}
          top={1.5}
          start={"Any Date"} end={"Any Date"}
        />
        <Button variant="contained" className="room-submit" onClick={()=>handleClick()}>
          <FormattedMessage id="search_dates" defaultMessage="Search Dates" />
        </Button>
      </div>
    </>
  );
};

export default SearchForm;
