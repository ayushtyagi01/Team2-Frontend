import "./RoomResultPage.scss";
import BedTypeForm from "./BedTypeForm/BedTypeForm";
import RoomCards from "./RoomCards/RoomCards";
import { bannerImage } from "../../redux/slice/landingPageSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CircularProgress, Step, StepLabel, Stepper } from "@mui/material";
import { useEffect } from "react";
import {
  setBeds,
  setEndDate,
  setProperty,
  setRooms,
  setStartDate,
} from "../../redux/slice/SearchFormSlice";
import { getRoomData } from "../../redux/slice/PostDataSlice";
import SearchForm from "./SearchForm/SeacrhForm";
import { roomPostData } from "../../util/roomPostData";
import { useSearchParams } from "react-router-dom";
import {
  getRoomConfig,
  isLoading,
  showItenaryInCardsPage,
} from "../../redux/slice/RoomResultConfigSlice";
import { isValid } from "date-fns";

const steps = ["1. Choose Room", "2. Choose add on", "3. Checkout"];

const RoomResultPage: React.FC = () => {
  const banner_image = useAppSelector(bannerImage);
  const loader = useAppSelector(isLoading);
  const reduxDispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    reduxDispatch(getRoomConfig());
  }, []);

  const getFormData = () => {
    if (searchParams.get("property") !== null) {
      roomPostData.propertyId = parseInt(searchParams.get("property")!);
      reduxDispatch(setProperty(roomPostData.propertyId));
    } else if (localStorage.getItem("property") !== null) {
      const id =
        localStorage.getItem("property")!?.length > 1
          ? localStorage.getItem("property")?.substring(1, 2)!
          : localStorage.getItem("property");
      console.log("id", id, "localStorage", localStorage.getItem("property"));
      roomPostData.propertyId = parseInt(id!);
      reduxDispatch(
        setProperty(localStorage.getItem("property")?.substring(1, 2))
      );
    }
    if (searchParams.get("room") !== null) {
      roomPostData.requiredRoomsCount = parseInt(searchParams.get("room")!);
      reduxDispatch(setRooms(searchParams.get("room")));
    } else if (localStorage.getItem("room") !== null) {
      const roomCnt =
        localStorage.getItem("room")!.length > 1
          ? localStorage.getItem("room")?.substring(1, 2)!
          : localStorage.getItem("room");
      roomPostData.requiredRoomsCount = parseInt(roomCnt!);
      reduxDispatch(setRooms(localStorage.getItem("room")?.substring(1, 2)));
    }
    if (
      searchParams.get("start_date") !== null &&
      searchParams.get("end_date") != null &&
      isValid(searchParams.get("start_date")) &&
      isValid(searchParams.get("end_date"))
    ) {
      roomPostData.checkInDate = searchParams.get("start_date") + "T00:00:00Z";
      roomPostData.checkOutDate = searchParams.get("end_date") + "T00:00:00Z";
      roomPostData.duration =
        new Date(searchParams.get("end_date")!).getDate() -
        new Date(searchParams.get("start_date")!).getDate() +
        1;
      reduxDispatch(setStartDate(searchParams.get("start_date")));
      reduxDispatch(setEndDate(searchParams.get("end_date")));
    } else if (
      localStorage.getItem("startDate") !== null &&
      localStorage.getItem("endDate") !== null
    ) {
      roomPostData.checkInDate =
        localStorage.getItem("startDate") + "T00:00:00Z";
      roomPostData.checkOutDate =
        localStorage.getItem("endDate") + "T00:00:00Z";
      roomPostData.duration =
        new Date(localStorage.getItem("endDate")!).getDate() -
        new Date(localStorage.getItem("startDate")!).getDate();
      reduxDispatch(setStartDate(localStorage.getItem("startDate")));
      reduxDispatch(setEndDate(localStorage.getItem("endDate")));
    }
    if (searchParams.get("beds") !== null) {
      reduxDispatch(setBeds(searchParams.get("beds")));
    } else if (localStorage.getItem("beds") !== null) {
      reduxDispatch(setBeds(localStorage.getItem("beds")));
    }

    return roomPostData;
  };

  useEffect(() => {
    reduxDispatch(getRoomData(getFormData()));
  }, []);

  return (
    <>
      <div
        className="room-banner"
        style={{
          backgroundImage: `url(${banner_image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="stepper-container">
        <Stepper activeStep={1} alternativeLabel className="stepper">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      {loader ? (
        <CircularProgress />
      ) : (
        <div className="form-container">
          <SearchForm />
          <div className="body-container">
            <BedTypeForm />
            <RoomCards />
          </div>
        </div>
      )}
    </>
  );
};

export default RoomResultPage;
