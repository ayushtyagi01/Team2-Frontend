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
  const [count,setCount] = useState<number[]>([1,0]);
  let guestArray = [];
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(searchParams.get('guest')!==null){
      let res = searchParams.get('guest')!.split(',').map(el => {
        return Number(el);
      });
      setCount(res);
    }
    else if(location.pathname!=='/' && localStorage.getItem('room')!==null){
      setCount(JSON.parse(localStorage.getItem('guest')!));
    }
    else if(location.pathname==='/room-search-results'){
      navigate("/");
    }
    else if(location.pathname==='/'){
      setCount(guestsCounts);
    }
  },[guestsCounts])


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
                  {count[0]} Adult {count[1]} Child
                </b>
              </div>
            );
          }}
        >
          {availableTypeOfGuest.map((guest, index) => {
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
