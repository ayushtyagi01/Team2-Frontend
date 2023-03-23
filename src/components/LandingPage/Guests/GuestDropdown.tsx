import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Guests from "./Guests";
import { useAppSelector } from "../../../redux/hooks";
import { guests } from "../../../redux/slice/landingPageSlice";
import { guestsCount } from "../../../redux/slice/SearchForm";

const RoomDropdown: React.FC = () => {
  const typeofGuests = useAppSelector(guests);
  const guestCount = useAppSelector(guestsCount);

  return (
    <div>
      <FormControl sx={{ m: 3, width: 235, mt: -1.5 }}>
        <Select
          value="none"
          renderValue={() => {
             return <div>{guestCount[0]} Adult {guestCount[1]} Child</div>;
          }}
        >
          {typeofGuests.map((guest) => {
            return <Guests guestTitle = {guest.title} guest_min_count = {+guest.min}/>
          })}
        </Select>
      </FormControl>
    </div>
  );
};
export default RoomDropdown;
