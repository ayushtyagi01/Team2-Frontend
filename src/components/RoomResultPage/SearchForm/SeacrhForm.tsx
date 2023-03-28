import RoomDropdown from "../../LandingPage/RoomDropdown/RoomDropdown";
import GuestDropdown from "../../LandingPage/Guests/GuestDropdown";
import "./SearchForm.scss";

const SearchForm: React.FC = () => {
  return (
    <>
      <div className="search-containers">
        <GuestDropdown isInside={true} margin={3} width={"20%"} top={1.5} />
        <RoomDropdown isInside={true} margin={2} width={"15%"} top={1.5}/>
      </div>
    </>
  );
};

export default SearchForm;
