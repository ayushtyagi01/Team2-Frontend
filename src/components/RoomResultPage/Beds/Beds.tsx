import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { setBeds } from "../../../redux/slice/SearchFormSlice";

const Beds: React.FC = () => {
    const [noofBeds, setnoOfBeds] = useState<string>("1");

    const bedsArray = Array.from({ length: 3 }, (_, index) => index + 1);
    const reduxDispatch = useAppDispatch();

    const handleChange = (event: SelectChangeEvent<typeof noofBeds>)=>{
        const {
            target: { value },
          } = event;
          setnoOfBeds(value);
          reduxDispatch(setBeds(value));
          
    }
  return (
    <>
      <FormControl sx={{ m: 2.5, width:"15%", mt: 1.5 }}>
        <Select
          displayEmpty
          value={noofBeds}
          onChange={handleChange}
          renderValue={() => {
            return (
              <div>
                {<Box>Beds</Box>}
                <b>{noofBeds}</b>
              </div>
            );
          }}
        >
          <MenuItem disabled value=""></MenuItem>
          {bedsArray.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Beds;
