import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Guests from "./Guests";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  guests,
  availableTypeOfGuests,
} from "../../../redux/slice/landingPageSlice";
import {
  guestsCount,
  setfillGuest,
  setGuests,
} from "../../../redux/slice/SearchFormSlice";
import { Box } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface title {
  isInside: boolean;
  margin: number;
  width: string;
  top: number;
}
const RoomDropdown: React.FC<title> = (props) => {
  const typeofGuest = useAppSelector(guests);
  const availableTypeOfGuest = useAppSelector(availableTypeOfGuests);
  const guestsCounts = useAppSelector(guestsCount);

  const [searchParams, setSearchParams] = useSearchParams();

  const reduxDispatch = useAppDispatch();
  const [guestArray, setGuestArray] = useState<number[]>([1,0,0]);

  

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <FormControl sx={{ m: props.margin, width: props.width, mt: props.top }}>
        <Select
          value="none"
          renderValue={() => {
            return (
              <div>
                {props.isInside ? <Box>Guests</Box> : ""}
                <b>
                  {guestsCounts[0]} Adult {guestsCounts[1]} Child
                </b>
              </div>
            );
          }}
        >
          {availableTypeOfGuest.map((guest, index) => {
            return (
              <Guests
                index={index}
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
