import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Guests from "./Guests";
import { useAppSelector } from "../../../redux/hooks";
import {
  guests,
  availableTypeOfGuests,
} from "../../../redux/slice/landingPageSlice";
import { guestsCount } from "../../../redux/slice/SearchFormSlice";
import { Box } from "@mui/material";

interface title {
  isInside:boolean;
  margin:number;
  width:string;
  top:number;
}
const RoomDropdown: React.FC<title> = (props) => {
  const typeofGuest = useAppSelector(guests);
  const availableTypeOfGuest = useAppSelector(availableTypeOfGuests);
  const guestCount = useAppSelector(guestsCount);

  return (
    <>
      <FormControl sx={{ m: props.margin, width: props.width, mt: props.top }}>
        <Select
          value="none"
          renderValue={() => {
            return (
              <div>
                {props.isInside?<Box>Guests</Box>:""}
                <b>{guestCount[0]} Adult {guestCount[1]} Child</b>
              </div>
            );
          }}
        >
          {availableTypeOfGuest.map((guest) => {
            return (
              <Guests
                guestTitle={typeofGuest[guest].title}
                guest_min_count={typeofGuest[guest].min}
                guest_max_count={typeofGuest[guest].max}
                guest_maxAge={typeofGuest[guest].maxAge}
              />
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};
export default RoomDropdown;
