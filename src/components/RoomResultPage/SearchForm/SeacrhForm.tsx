import RoomDropdown from "../../LandingPage/RoomDropdown/RoomDropdown";
import GuestDropdown from "../../LandingPage/Guests/GuestDropdown";
import "./SearchForm.scss";
import CalenderDropdown from "../../LandingPage/CalenderDropdown/CalenderDropdown";
import Beds from "../Beds/Beds";
import { useForm } from "react-hook-form";
import { schema } from "../../../util/constants/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";

const SearchForm: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  return (
    <>
      <div className="search-containers">
        <GuestDropdown isInside={true} margin={3} width={"20%"} top={1.5} />
        <RoomDropdown isInside={true} margin={2} width={"15%"} top={1.5} />
        <Beds />
        <CalenderDropdown
          register={register}
          errors={errors}
          isInside={true}
          margin={3}
          width={"30%"}
          top={1.5}
          start={"Any Date"} end={"Any Date"}
        />
        <Button type="submit" variant="contained" className="room-submit">
          <FormattedMessage id="Searchi" defaultMessage="Search Dates" />
        </Button>
      </div>
    </>
  );
};

export default SearchForm;
