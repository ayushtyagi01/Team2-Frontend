import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { format } from "date-fns";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "./CalenderDropdown.scss";
import Calender from "./Calender";
import { useAppSelector } from "../../../redux/hooks";
import { end_date, start_date } from "../../../redux/slice/SearchFormSlice";
import { useEffect, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Alert } from "@mui/material";

interface CalenderDropdownProps {
  register: UseFormRegister<FieldValues>;
  required: boolean;
  errors: FieldErrors<FieldValues>;
}
const CalenderDropdown: React.FC<CalenderDropdownProps> = (props) => {

  const [showSelect, setShowSelect] = useState(false);
  const startDate = useAppSelector(start_date);
  const endDate = useAppSelector(end_date);
  const startdate = startDate !== ""?format(new Date(startDate), "yyyy-MM-dd"):"";
  const enddate = endDate !== ""?format(new Date(endDate), "yyyy-MM-dd"):"";

  useEffect(() => {
    if (startDate !== "") setShowSelect(false);
  }, [startDate]);
  console.log("startDate",props.errors.startDate);
  return (
    <div>
      <FormControl sx={{ m: 3, width: "90%", mt: -1.5 }}>
        <Select
          className="select-calenders"
          displayEmpty
          value="Select dates"
          open={showSelect}
          onOpen={() => setShowSelect(true)}
          onClose={() => setShowSelect(false)}
          inputProps={{ IconComponent: () => null }}
          {...props.register("startdate", { required: props.required })}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          }}
          renderValue={() => {
            return (
              <div className="calender-content">
                {startDate === "" ? <div>Check-in</div> : <div>{startdate}</div>}
                <ArrowForwardIcon />
                {endDate === "" ? <div>Check-out</div> : <div>{enddate}</div>}
                <CalendarMonthIcon />
              </div>
            );
          }}
        >
          <Calender />
        </Select>
        {props.errors.startDate && (
          <Alert severity="error">
            This field is required
          </Alert>
        )}
      </FormControl>
    </div>
  );
};
export default CalenderDropdown;
