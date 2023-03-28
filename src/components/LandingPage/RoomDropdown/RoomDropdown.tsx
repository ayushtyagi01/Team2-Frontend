import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppSelector } from "../../../redux/hooks";
import { noOfRooms } from "../../../redux/slice/SearchFormSlice";

interface title {
  isInside:boolean;
  margin:number;
  width:string;
  top:number;
}
const RoomDropdown: React.FC<title> = (props) => {
  const [noOfRoom, setnoOfRoom] = React.useState<string>("1");

  const handleChange = (event: SelectChangeEvent<typeof noOfRoom>) => {
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
        <Select displayEmpty value={noOfRoom} onChange={handleChange}>
          <MenuItem disabled value=""></MenuItem>
          {roomsArray.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
export default RoomDropdown;
