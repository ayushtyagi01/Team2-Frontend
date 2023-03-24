import "./Calender.css";
import { useState } from "react";
import { addDays, format, isBefore, isSameDay } from "date-fns";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useDispatch } from "react-redux";
import { setEndDate, setStartDate } from "../../../redux/slice/SearchFormSlice";
export default function Calender() {
  const reduxDispatch = useDispatch();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: "selection",
    },
  ]);

  const getMinNightlyRates = (day: Date) => {
    if (isBefore(addDays(new Date(), -1), day)) {
      return "$122";
    } else {
      return "_";
    }
  };
  function customDayContent(day: any) {
    return (
      <div className="day-tag">
        <div className="day-tag-date">{format(day, "d")}</div>
        <div className="day-tag-price">{getMinNightlyRates(day)}</div>
      </div>
    );
  }
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    reduxDispatch(setStartDate(state[0].startDate));
    reduxDispatch(setEndDate(state[0].endDate));
  };
  return (
    <div className="calender">
      <DateRangePicker
        onChange={(item: any) => setState([item.selection])}
        showPreview={false}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        preventSnapRefocus={true}
        calendarFocus="forwards"
        dayContentRenderer={customDayContent}
        minDate={
          state[0].startDate === state[0].endDate
            ? state[0].startDate
            : new Date()
        }
        maxDate={
          state[0].startDate === state[0].endDate
            ? addDays(state[0].startDate, 14)
            : new Date("2023-05-31")
        }
        fixedHeight={true}
      />
      <button
        className="apply-dates-button"
        onClick={(e) => handleClick(e)}
        disabled={isSameDay(state[0].startDate,state[0].endDate)}
      >
        APPLY DATES
      </button>
      <p className="calender-footer-text">
        Please select end date. Max. length of stay: {14} days
      </p>
    </div>
  );
}
