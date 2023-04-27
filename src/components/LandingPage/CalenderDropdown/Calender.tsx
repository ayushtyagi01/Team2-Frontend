import "./Calender.scss";
import { useEffect, useState } from "react";
import { addDays, format, isBefore, isSameDay } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch } from "react-redux";
import { DateRange } from "react-date-range";
import {
  beds,
  end_date,
  guestsCount,
  noOfRooms,
  property_name,
  setEndDate,
  setStartDate,
  start_date,
  wheelchair,
} from "../../../redux/slice/SearchFormSlice";
import axios from "axios";
import { useAppSelector } from "../../../redux/hooks";
import {
  selectedcurrency,
  selectedFactor,
} from "../../../redux/slice/InternationalisationSlice";
import { getCurrencyLogo } from "../../../util/GetCurrencyLogo";
import { FormattedMessage } from "react-intl";
import { maxLengthOfStay } from "../../../redux/slice/landingPageSlice";
import { formatDate } from "../../../util/formatDate";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function Calender(props:any) {
  const reduxDispatch = useDispatch();
  const priceFactor = useAppSelector(selectedFactor);
  const currency = useAppSelector(selectedcurrency);
  const maxLengthofStay = useAppSelector(maxLengthOfStay);
  const startDate = useAppSelector(start_date);
  const endDate = useAppSelector(end_date);

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

  const [searchParams, setSearchParams] = useSearchParams();

  const startdate =
    searchParams.get("start_date") !== null
      ? new Date(searchParams.get("start_date")!)
      : localStorage.getItem("startDate") !== null
      ? new Date(localStorage.getItem("startDate")!)
      : new Date();

  const enddate =
    searchParams.get("end_date") !== null
      ? new Date(searchParams.get("end_date")!)
      : localStorage.getItem("endDate") !== null
      ? new Date(localStorage.getItem("endDate")!)
      : addDays(new Date(), 2);

  useEffect(() => {
    setDateRange([
      {
        startDate: startdate,
        endDate: enddate,
        key: "selection",
      },
    ]);
  }, [startDate,endDate]);

  useEffect(() => {
    setCurrencyLogo(getCurrencyLogo(currency));
  }, []);

  const getMinNightlyRates = (day: Date) => {
    if (
      isBefore(addDays(new Date(), -1), day) &&
      minimumNightlyRates[formatDate(day)]
    ) {
      const formattedDate = formatDate(day);

      return `${currencyLogo} ${Math.round(
        minimumNightlyRates[formattedDate] * priceFactor
      )}`;
    } else {
      return "_";
    }
  };

  const getMinimumPrice = () => {
    for (let [key, value] of Object.entries(minimumNightlyRates)) {
      setMinimumRate(
        Math.min(Math.round((value as number) * priceFactor), minimumRate)
      );
    }
  };

  const fetchMinimumNightlyRates = async () => {
    const minimumNightlyRatesFetched = await axios.get(
      process.env.REACT_APP_NIGHTLY_RATES!
    );
    setMinimumNightlyRates(minimumNightlyRatesFetched.data);
  };
  const [months,setMonths] = useState(2);

  useEffect(() => {
    fetchMinimumNightlyRates();
    if(window.innerWidth<1000){
      setMonths(1);
    }
  }, []);

  useEffect(() => {
    setMinimumRate(Number.MAX_VALUE);
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
  const navigate = useNavigate();
  const location = useLocation();
  const property = useAppSelector(property_name);
  const guests = useAppSelector(guestsCount);
  const rooms = useAppSelector(noOfRooms);
  const bed = useAppSelector(beds);
  const accessability = useAppSelector(wheelchair);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (location.pathname === "/room-search-results") {
      navigate({
        pathname: "/room-search-results",
        search: `?property=2&start_date=${formatDate(
          dateRange[0].startDate
        )}&end_date=${formatDate(
          dateRange[0].endDate
        )}&guest=${guests}&room=${rooms}&beds=${bed}&wheelchair=${accessability}`,
      });
    }
    localStorage.setItem("startDate", formatDate(dateRange[0].startDate));
    localStorage.setItem("endDate", formatDate(dateRange[0].endDate));
    reduxDispatch(setStartDate(formatDate(dateRange[0].startDate)));
    reduxDispatch(setEndDate(formatDate(dateRange[0].endDate)));
    props.showCalender(false);
  };

  return (
    <div className="calender">
      <DateRange
        onChange={(item: any) => {
          setDateRange([item.selection]);
        }}
        showPreview={false}
        moveRangeOnFirstSelection={false}
        months={months}
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
