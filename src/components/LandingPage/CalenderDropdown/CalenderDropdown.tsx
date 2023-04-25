import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addDays, format } from "date-fns";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "./CalenderDropdown.scss";
import Calender from "./Calender";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { end_date, setEndDate, setStartDate, start_date } from "../../../redux/slice/SearchFormSlice";
import { useEffect, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Alert } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface CalenderDropdownProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  isInside: boolean;
  margin: number;
  width: string;
  top: number;
  start: string;
  end: string;
}
const CalenderDropdown: React.FC<CalenderDropdownProps> = (props) => {
  const [showSelect, setShowSelect] = useState(false);
  const [showDate, setshowDate] = useState<number>(0);
  const startDate = useAppSelector(start_date);
  const endDate = useAppSelector(end_date);
  let startdate = format(new Date(startDate), "yyyy-MM-dd");
  let enddate = format(new Date(endDate), "yyyy-MM-dd");


  useEffect(() => {
    console.log(startdate,enddate);
    if (
      startdate !== format(new Date(), "yyyy-MM-dd") &&
      enddate !== format(addDays(new Date(), 2), "yyyy-MM-dd") &&
      enddate !== startdate &&
      enddate !== startdate
    ) {
      console.log("inside");
      setShowSelect(false);
      setshowDate(1);
    }
  }, [startdate, enddate]);

  const [searchParams, setSearchParams] = useSearchParams();

  const reduxDispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  if(searchParams.get('start_date')!==null && searchParams.get('end_date')!=null){
    reduxDispatch(setStartDate(searchParams.get('start_date')));
    reduxDispatch(setEndDate(searchParams.get('end_date')));
  }
  else if(localStorage.getItem('startDate')!==null && localStorage.getItem('endDate')!==null){
    reduxDispatch(setStartDate(localStorage.getItem('startDate')));
    reduxDispatch(setEndDate(localStorage.getItem('endDate')));
  }
  else if(location.pathname==='/room-search-results'){
    navigate("/");
  }
  
  return (
    <>
      <FormControl sx={{ m: props.margin, width: props.width, mt: props.top }}>
        <Select
          className="select-calenders"
          displayEmpty
          value="Select dates"
          open={showSelect}
          onOpen={() => {
            setShowSelect(true);
          }}
          onClose={() => {
            setShowSelect(false);
          }}
          inputProps={{ IconComponent: () => null }}
          id="calender"
          {...props.register("calender", { required: true })}
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
                <div>
                  {props.isInside ? <div>Check-in</div> : ""}
                  {props.isInside ? (
                    <b>
                      {!localStorage.getItem('startDate') ? (
                        <div>{props.start}</div>
                      ) : (
                        <div>{startdate}</div>
                      )}
                    </b>
                  ) : (
                    <div>{!localStorage.getItem('startDate') ? props.start : startdate}</div>
                  )}
                </div>
                <ArrowForwardIcon />
                <div>
                  {props.isInside ? <div>Check-out</div> : ""}
                  {props.isInside ? (
                    <b>
                      {!localStorage.getItem('endDate') ? (
                        <div>{props.end}</div>
                      ) : (
                        <div>{enddate}</div>
                      )}
                    </b>
                  ) : (
                    <div>{!localStorage.getItem('endDate') ? props.end : enddate}</div>
                  )}
                </div>
                <CalendarMonthIcon />
              </div>
            );
          }}
        >
          <Calender showCalender={setShowSelect}/>
        </Select>
        {showDate === 0 && props.errors.startDate && (
          <Alert severity="error">
            <FormattedMessage
              id="errorMessage"
              defaultMessage="This field is required"
            />
          </Alert>
        )}
      </FormControl>
    </>
  );
};
export default CalenderDropdown;
