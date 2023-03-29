import "./Calender.scss";
import { useEffect, useState } from "react";
import { addDays, format, isBefore, isSameDay } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch } from "react-redux";
import { DateRange } from "react-date-range";
import { setEndDate, setStartDate } from "../../../redux/slice/SearchFormSlice";
import axios from "axios";
import { useAppSelector } from "../../../redux/hooks";
import {
  selectedcurrency,
  selectedFactor,
} from "../../../redux/slice/InternationalisationSlice";
import { getCurrencyLogo } from "../../../util/GetCurrencyLogo";
import { FormattedMessage } from "react-intl";
import { maxLengthOfStay } from "../../../redux/slice/landingPageSlice";

export default function Calender() {
  const reduxDispatch = useDispatch();
  const priceFactor = useAppSelector(selectedFactor);
  const currency = useAppSelector(selectedcurrency);
  const maxLengthofStay = useAppSelector(maxLengthOfStay);

  const [minimumNightlyRates, setMinimumNightlyRates] = useState<any>({});
  const [minimumRate, setMinimumRate] = useState<number>(Number.MAX_VALUE);
  const [currencyLogo, setCurrencyLogo] = useState<string>("$");

  const [dateRange, setDateRange] = useState([
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

      return `${currencyLogo} ${Math.round(
        minimumNightlyRates[formattedDate] * priceFactor
      )}`;
    } else {
      return "_";
    }
  };

  const getMinimumPrice = () => {
    for (let [key, value] of Object.entries(minimumNightlyRates)) {
      setMinimumRate(Math.min(value as number,minimumRate));
  }
    }
  
  const fetchMinimumNightlyRates = async () => {
    const minimumNightlyRatesFetched = await axios.get(
      process.env.REACT_APP_NIGHTLY_RATES!
    );
    setMinimumNightlyRates(minimumNightlyRatesFetched.data);
  };

  useEffect(() => {
    fetchMinimumNightlyRates();
  }, []);

  useEffect(() => {
    getMinimumPrice();
  }, [minimumNightlyRates]);

  function customDayContent(day: any) {
    return (
      <div className="day-tag">
        <div className="day-tag-date">{format(day, "d")}</div>
        <div className="day-tag-price">{getMinNightlyRates(day)}</div>
      </div>
    );
  }
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    reduxDispatch(setStartDate(format(dateRange[0].startDate, "yyyy-MM-dd")));
    reduxDispatch(setEndDate(format(dateRange[0].endDate, "yyyy-MM-dd")));
  };
  
  return (
    <div className="calender">
      <DateRange
        onChange={(item: any) => {
          setDateRange([item.selection]);
        }}
        showPreview={false}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={dateRange}
        direction="horizontal"
        preventSnapRefocus={true}
        calendarFocus="forwards"
        dayContentRenderer={customDayContent}
        minDate={
          isSameDay(dateRange[0].startDate, dateRange[0].endDate)
            ? dateRange[0].startDate
            : new Date()
        }
        maxDate={
          isSameDay(dateRange[0].startDate, dateRange[0].endDate)
            ? addDays(dateRange[0].startDate, maxLengthofStay)
            : new Date("2023-05-31")
        }
        fixedHeight={true}
      />
      <button
        className="apply-dates-button"
        onClick={(e) => handleClick(e)}
        disabled={isSameDay(dateRange[0].startDate, dateRange[0].endDate)}
      >
        APPLY DATES
      </button>
      {isSameDay(dateRange[0].startDate, dateRange[0].endDate) && (
        <p className="calender-footer-text">
          <FormattedMessage
            id="errorMessageEndDate"
            defaultMessage="Please select end date. Max. length of stay: {maxLengthofStay} days"
            values={{ maxLengthofStay }}
          />
        </p>
      )}
      {!isSameDay(dateRange[0].startDate, dateRange[0].endDate) && (
        <p className="calender-footer-price">
          from {currencyLogo}
          {minimumRate}
          <FormattedMessage id="night" defaultMessage="/night" />
        </p>
      )}
    </div>
  );
}
