import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { noOfRooms, setRooms } from "../../../redux/slice/SearchFormSlice";
import { Box } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { roomPostData } from "../../../util/roomPostData";
import { FormattedMessage } from "react-intl";

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
  const rooms = useAppSelector(noOfRooms);
  let roomsArray = Array.from({ length: parseInt(noofRoom) }, (_, index) => index + 1);
  
  useEffect(() => {
    if(searchParams.get('room')!==null){
      for(let i = 0; i < parseInt(searchParams.get('room')!); i++){
        roomsArray[i]=i+1;
      }
      setnoOfRoom(searchParams.get('room')!);
    }
    else if(location.pathname!=='/' && localStorage.getItem('room')!==null){
      for(let i = 0; i < JSON.parse(localStorage.getItem('room')!); i++){
        roomsArray[i]=i+1;
      }
      setnoOfRoom(localStorage.getItem('room')!);
    }
    else if(location.pathname==='/room-search-results'){
      navigate("/");
    }
    else if(location.pathname==='/'){
      for(let i = 0; i < rooms; i++){
        roomsArray[i]=(i+1);
      }
      setnoOfRoom(JSON.stringify(rooms));
    }
  },[rooms])
 

  const handleChange = (event: SelectChangeEvent<typeof noofRoom>) => {
    const {
      target: { value },
    } = event;
    setnoOfRoom(value);
    localStorage.setItem('room',value);
    roomPostData.requiredRoomsCount=parseInt(value);
  };


  return (
    <>
      <FormControl sx={{ m: props.margin, width: props.width, mt: props.top }}>
        <Select displayEmpty value={noofRoom} onChange={handleChange}
        renderValue={() => {
          return (
            <div>
              {props.isInside?<Box><FormattedMessage id="Room" defaultMessage="Room" /></Box>:""}
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
