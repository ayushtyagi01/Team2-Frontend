import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { noOfRooms, setRooms } from "../../../redux/slice/SearchFormSlice";
import { Box } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface title {
  isInside:boolean;
  margin:number;
  width:string;
  top:number;
}
const RoomDropdown: React.FC<title> = (props) => {
  const [noofRoom, setnoOfRoom] = useState<string>("1");
  const [searchParams, setSearchParams] = useSearchParams();

  const reduxDispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  if(searchParams.get('room')!==null){
    reduxDispatch(setRooms(searchParams.get('room')))
  }
  else if(localStorage.getItem('room')!==null){
    reduxDispatch(setRooms(localStorage.getItem('room')));
  }
  else if(location.pathname==='/room-search-results'){
    navigate("/");
  }
 
  const rooms = useAppSelector(noOfRooms);

  useEffect(() => {
    rooms?setnoOfRoom(typeof rooms==="string"?rooms:JSON.stringify(rooms)):setnoOfRoom("1");
  },[rooms])

  const handleChange = (event: SelectChangeEvent<typeof noofRoom>) => {
    const {
      target: { value },
    } = event;
    setnoOfRoom(value);
    localStorage.setItem('room',value);
  };

  let roomsArray = Array.from({ length: rooms }, (_, index) => index + 1);

  return (
    <>
      <FormControl sx={{ m: props.margin, width: props.width, mt: props.top }}>
        <Select displayEmpty value={noofRoom} onChange={handleChange}
        renderValue={() => {
          return (
            <div>
              {props.isInside?<Box>Rooms</Box>:""}
              <b>{JSON.parse(noofRoom)}</b>
            </div>
          );
        }}>
          <MenuItem disabled value=""></MenuItem>
          {roomsArray.map((name,index) => (
            <MenuItem key={index+name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
export default RoomDropdown;
