import "./Calender.scss";
import { useEffect, useState } from "react";
import { addDays, format, isBefore, isSameDay } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useDispatch } from "react-redux";
import { setEndDate, setStartDate } from "../../../redux/slice/SearchFormSlice";
import axios from "axios";
import { useAppSelector } from "../../../redux/hooks";
import {
  selectedcurrency,
  selectedFactor,
} from "../../../redux/slice/InternationalisationSlice";
import { getCurrencyLogo } from "../../../util/GetCurrencyLogo";
import { FormattedMessage } from "react-intl";

export default function Calender() {
  const reduxDispatch = useDispatch();
  const priceFactor = useAppSelector(selectedFactor);
  const currency = useAppSelector(selectedcurrency);

  const [minimumNightlyRates, setMinimumNightlyRates] = useState<any>({});
  const [minimumRate, setMinimumRate] = useState<number>(Number.MAX_VALUE);
  const [currencyLogo, setCurrencyLogo] = useState<string>("$");

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: "selection",
    },
  ]);
  useEffect(() => {
    setCurrencyLogo(getCurrencyLogo(currency));
  }, []);

  const getMinNightlyRates = (day: Date) => {
    if (
      isBefore(addDays(new Date(), -1), day) &&
      minimumNightlyRates[format(day, "yyyy-MM-dd")]
    ) {
      const formattedDate = format(day, "yyyy-MM-dd");
      setMinimumRate(
        Math.min(
          minimumRate,
          Math.round(minimumNightlyRates[formattedDate] * priceFactor)
        )
      );
      return `${currencyLogo} ${Math.round(
        minimumNightlyRates[formattedDate] * priceFactor
      )}`;
    } else {
      return "_";
    }
  };
  const fetchMinimumNightlyRates = async () => {
    const minimumNightlyRatesFetched = await axios.get(
      process.env.REACT_APP_NIGHTLY_RATES!
    );
    setMinimumNightlyRates(minimumNightlyRatesFetched.data);
  };

  useEffect(() => {
    fetchMinimumNightlyRates();
  }, []);

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
          isSameDay(state[0].startDate, state[0].endDate)
            ? state[0].startDate
            : new Date()
        }
        maxDate={
          isSameDay(state[0].startDate, state[0].endDate)
            ? addDays(state[0].startDate, 14)
            : new Date("2023-05-31")
        }
        fixedHeight={true}
      />
      <button
        className="apply-dates-button"
        onClick={(e) => handleClick(e)}
        disabled={isSameDay(state[0].startDate, state[0].endDate)}
      >
        APPLY DATES
      </button>
      {isSameDay(state[0].startDate, state[0].endDate) && (
        <p className="calender-footer-text">
          <FormattedMessage id="errorMessageEndDate" defaultMessage="Please select end date. Max. length of stay: {14} days" />
        </p>
      )}
      {!isSameDay(state[0].startDate, state[0].endDate) && (
        <p className="calender-footer-price">
          from {currencyLogo}
          {minimumRate}<FormattedMessage id="night" defaultMessage="/night"/>
        </p>
      )}
    </div>
  );
}
