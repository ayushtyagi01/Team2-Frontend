import { Box } from "@mui/material";
import { useEffect, useState } from "react";
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
  index: number;
  guestTitle: string;
  guest_min_count: number;
  guest_max_count: number;
  guest_maxAge: string;
}
const Guests: React.FC<GuestInterface> = (props) => {
  const index = props.index;
  const reduxDispatch = useDispatch();
  

  const guestCounts = useAppSelector(guestsCount);
  const [noOfGuests, setnoOfGuests] = useState<number>(0);
  const guest_max_value: number = props.guest_max_count;

  const handleAddGuest = () => {
    if (+noOfGuests < guest_max_value) {
      setnoOfGuests(noOfGuests + 1);
      reduxDispatch(setGuests([noOfGuests + 1, index]));
      noOfGuests + 1 >= 3
        ? reduxDispatch(setRooms(3))
        : noOfGuests + 1 === 2
        ? reduxDispatch(setRooms(2))
        : reduxDispatch(setRooms(1));
    }
  };
  const handleRemoveGuest = () => {
    if (noOfGuests > +props.guest_min_count) {
      setnoOfGuests(noOfGuests - 1);
      reduxDispatch(setGuests([noOfGuests - 1, index]));
      noOfGuests - 1 >= 3
        ? reduxDispatch(setRooms(3))
        : noOfGuests - 1 === 2
        ? reduxDispatch(setRooms(2))
        : reduxDispatch(setRooms(1));
    }
  };

  useEffect(() => {
    if (guestCounts.length < index) {
      setnoOfGuests(guestCounts[index]);
    } else {
      setnoOfGuests(props.guest_min_count);
    }
  }, [guestCounts]);
  return (
    <>
      <div className="guest-containers">
        <div className="title-container">
          <Box className="title-box">{props.guestTitle}</Box>
        </div>
        <div className="count-container">
          <RemoveIcon onClick={handleRemoveGuest} className="btn-guest" />
          <Box className="guest-box">{noOfGuests}</Box>
          <AddIcon onClick={handleAddGuest} className="btn-guest" />
        </div>
      </div>
    </>
  );
};

export default Guests;
