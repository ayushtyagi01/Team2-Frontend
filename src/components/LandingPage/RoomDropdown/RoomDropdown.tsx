import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppSelector } from "../../../redux/hooks";
import { noOfRooms } from "../../../redux/slice/SearchFormSlice";
import { Box } from "@mui/material";

interface title {
  isInside:boolean;
  margin:number;
  width:string;
  top:number;
}
const RoomDropdown: React.FC<title> = (props) => {
  const [noofRoom, setnoOfRoom] = React.useState<string>("1");

  const handleChange = (event: SelectChangeEvent<typeof noofRoom>) => {
    const {
      target: { value },
    } = event;
    setnoOfRoom(value);
  };

  const rooms = useAppSelector(noOfRooms);
  let roomsArray = Array.from({ length: rooms }, (_, index) => index + 1);

  return (
    <>
      <FormControl sx={{ m: props.margin, width: props.width, mt: props.top }}>
        <Select displayEmpty value={noofRoom} onChange={handleChange}
        renderValue={() => {
          return (
            <div>
              {props.isInside?<Box>Rooms</Box>:""}
              <b>{noofRoom}</b>
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
