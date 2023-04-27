import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
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
      <FormControl sx={{ m: 3, width:"15%", mt: 1.5 }}>
        <Select
          displayEmpty
          value={noofBeds}
          onChange={handleChange}
          renderValue={() => {
            return (
              <div>
                {<Box><FormattedMessage id="beds" defaultMessage="Beds" /></Box>}
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
