import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getRoomData,
  isLoading,
  maxContents,
  roomResults,
} from "../../../redux/slice/PostDataSlice";
import { roomPostData } from "../../../util/roomPostData";
import Card from "./Card/Card";
import Price from "./Price/Price";
import "./RoomCard.scss";

const RoomCards: React.FC = () => {
  const roomData = useAppSelector(roomResults);
  const maxCount = useAppSelector(maxContents);
  const loader = useAppSelector(isLoading);
  const reduxDispatch = useAppDispatch();

  const [isNext, setNext] = useState(false);
  const [isPrevious, setPrevious] = useState(false);
  useEffect(() => {
    (roomPostData.pageNumber-1)*3+roomData.length === (maxCount)
      ? setNext(true)
      : setNext(false);
    roomPostData.pageNumber === 1 ? setPrevious(true) : setPrevious(false);
  }, [roomPostData.pageNumber]);

  const handleNext = () => {
    roomPostData.pageNumber = roomPostData.pageNumber + 1;
    (roomPostData.pageNumber-1)*3+roomData.length === (maxCount)
      ? setNext(true)
      : setNext(false);
      roomPostData.pageNumber === 1 ? setPrevious(true) : setPrevious(false);
    reduxDispatch(getRoomData(roomPostData));
  };
  const handlePrevious = () => {
    roomPostData.pageNumber = roomPostData.pageNumber - 1;
    roomPostData.pageNumber === (maxCount/roomData.length)
      ? setNext(true)
      : setNext(false);
      roomPostData.pageNumber === 1 ? setPrevious(true) : setPrevious(false);
    reduxDispatch(getRoomData(roomPostData));
  };
  return (
    <div className="room-card-container">
      <div className="room-header">
        <div className="room-results"><FormattedMessage id="room_result" defaultMessage="Room Results" /></div>
        <div className="sort-heading">
          <div className="page-heading">
            Showing {(roomPostData.pageNumber-1)*3+1}-{(roomPostData.pageNumber-1)*3+roomData.length} of {maxCount} Results
          </div>
          <Price />
        </div>
      </div>
      <div className="room-card">
        {loader?<CircularProgress />:roomData.map((room) => (
          <Card result={room} />
        ))}
      </div>
      <div className="pagination-btn">
        <Button
          type="submit"
          variant="contained"
          className="btn-page"
          onClick={handlePrevious}
          disabled={isPrevious}
        >
          <FormattedMessage id="previous" defaultMessage="Previous" />
        </Button>
        <Button
          type="submit"
          variant="contained"
          className="btn-page"
          onClick={handleNext}
          disabled={isNext}
        >
          <FormattedMessage id="next" defaultMessage="Next" />
        </Button>
      </div>
    </div>
  );
};

export default RoomCards;
