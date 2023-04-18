import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import {
  guestsCount,
  setGuests,
  setRooms,
} from "../../../redux/slice/SearchFormSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import "./Guests.scss";

interface GuestInterface {
  guestTitle: string;
  guest_min_count: number;
  guest_max_count: number;
  guest_maxAge: string;
}
const Guests: React.FC<GuestInterface> = (props) => {
  const index = props.guestTitle === "Children" ? 1 : 0;
  const reduxDispatch = useDispatch();

  const guestCounts = useAppSelector(guestsCount);
  const [noOfGuests, setnoOfGuests] = useState<number>(+guestCounts[index]);
  const guest_max_value: number = props.guest_max_count;

  const handleAddGuest = () => {
    if (+noOfGuests < guest_max_value) {
      setnoOfGuests(noOfGuests + 1);
      reduxDispatch(setGuests([noOfGuests + 1, index]));
      if(index===0){
        reduxDispatch(setRooms(noOfGuests+1))
        localStorage.setItem('adult',(noOfGuests + 1).toString());
      }
    }
  };
  const handleRemoveGuest = () => {
    if (noOfGuests > +props.guest_min_count) {
      setnoOfGuests(noOfGuests - 1);
      reduxDispatch(setGuests([noOfGuests - 1, index]));
      localStorage.setItem('guest',JSON.stringify(guestCounts));
      if(index===0){
        localStorage.setItem('adult',(noOfGuests -1).toString());
        reduxDispatch(setRooms(noOfGuests-1))
      }
    }
  };
  return (
    <>
      <div className="guest-containers">
        <div className="title-container">
          <Box className="title-box">{props.guestTitle}</Box>
        </div>
        <div className="count-container">
          <RemoveIcon onClick={handleRemoveGuest} className="btn-guest" />
          <Box className="guest-box">{useAppSelector(guestsCount)[index]}</Box>
          <AddIcon onClick={handleAddGuest} className="btn-guest" />
        </div>
      </div>
    </>
  );
};

export default Guests;