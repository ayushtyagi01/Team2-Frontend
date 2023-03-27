import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addDays, format } from "date-fns";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "./CalenderDropdown.scss";
import Calender from "./Calender";
import { useAppSelector } from "../../../redux/hooks";
import { end_date, start_date } from "../../../redux/slice/SearchFormSlice";
import { useEffect, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Alert } from "@mui/material";
import { FormattedMessage } from "react-intl";

interface CalenderDropdownProps {
  register: UseFormRegister<FieldValues>;
  required: boolean;
  errors: FieldErrors<FieldValues>;
}
const CalenderDropdown: React.FC<CalenderDropdownProps> = (props) => {
  const [showSelect, setShowSelect] = useState(false);
  const [showDate, setshowDate] = useState<number>(0);
  const startDate = useAppSelector(start_date);
  const endDate = useAppSelector(end_date);
  const startdate = format(new Date(startDate), "yyyy-MM-dd");
  const enddate = format(new Date(endDate), "yyyy-MM-dd");

  useEffect(() => {
    if (
      startdate !== format(new Date(), "yyyy-MM-dd") &&
      enddate !== format(addDays(new Date(), 2), "yyyy-MM-dd") &&
      enddate !== startdate &&
      enddate !== startdate
    ) {
      setShowSelect(false);
      setshowDate(1);
    }
  }, [startdate, enddate]);
  return (
    <div>
      <FormControl sx={{ m: 3, width: "90%", mt: -1.5 }}>
        <Select
          className="select-calenders"
          displayEmpty
          value="Select dates"
          open={showSelect}
          onOpen={() => {setShowSelect(true);}}
          onClose={() => {setShowSelect(false);}}
          inputProps={{ IconComponent: () => null }}
          id = "calender"
          {...props.register("calender", { required: props.required })}
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
                {!showDate? (
                  <div>Check-in</div>
                ) : (
                  <div>{startdate}</div>
                )}
                <ArrowForwardIcon />
                {!showDate ? <div>Check-out</div> : <div>{enddate}</div>}
                <CalendarMonthIcon />
              </div>
            );
          }}
        >
          <Calender />
        </Select>
        {(
          showDate === 0 && props.errors.startDate && <Alert severity="error">
            <FormattedMessage id="errorMessage" defaultMessage="This field is required" />
          </Alert>
        )}
      </FormControl>
    </div>
  );
};
export default CalenderDropdown;
