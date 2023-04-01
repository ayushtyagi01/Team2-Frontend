import { useAppSelector } from "../../../redux/hooks";
import { roomResults } from "../../../redux/slice/PostDataSlice";
import Card from "./Card/Card";
import "./RoomCard.scss";

const RoomCards: React.FC = () => {
  const roomData = useAppSelector(roomResults);
  return (
    <div className="room-card-container">
      <div className="room-header">
        <div className="room-results">Room Results</div>
        <div className="page-heading">Showing 1-4 of 5 Results</div>
        <div>Price</div>
      </div>
      <div className="room-card">
        {roomData.map((room) => (
          <Card result={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomCards;
