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

const RoomDropdown: React.FC = () => {
  const typeofGuest = useAppSelector(guests);
  const availableTypeOfGuest = useAppSelector(availableTypeOfGuests);
  const guestCount = useAppSelector(guestsCount);

  return (
    <div>
      <FormControl sx={{ m: 3, width: "100%", mt: -1.5 }}>
        <Select
          value="none"
          renderValue={() => {
            return (
              <div>
                {guestCount[0]} Adult {guestCount[1]} Child
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
    </div>
  );
};
export default RoomDropdown;
