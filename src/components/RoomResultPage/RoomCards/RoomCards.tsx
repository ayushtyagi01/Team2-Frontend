import Card from "./Card/Card";
import './RoomCard.scss';

const RoomCards: React.FC = () => {
  return <div className="room-card-container">
  <div className="room-header">
    <div className="room-results">Room Results</div>
    <div className="page-heading">Showing 1-4 of 5 Results</div>
  </div>
  <div className="room-card">
   <Card/>
  </div>
  </div>;
};

export default RoomCards;
