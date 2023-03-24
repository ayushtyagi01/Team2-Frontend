import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppSelector } from "../../../redux/hooks";
import { noOfRooms } from "../../../redux/slice/SearchFormSlice";

const RoomDropdown: React.FC = () => {
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
    <div>
      <FormControl sx={{ m: 2.5, width: "100%", mt: -1.5 }}>
        <Select displayEmpty value={noOfRoom} onChange={handleChange}>
          <MenuItem disabled value=""></MenuItem>
          {roomsArray.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default RoomDropdown;
