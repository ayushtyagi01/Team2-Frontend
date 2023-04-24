import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import axios from "axios";
import { createRef, useRef } from "react";
import { useAppSelector } from "../../redux/hooks";
import { jwtToken } from "../../redux/slice/UserSlice";
import { LandingPageConfigUtil } from "../../util/configurationUtil/LandingPageConfigUtil";
import { roomResultConfig } from "../../util/configurationUtil/RoomResultConfigUtil";
import "./RoomResultConfig.scss";

const sortType = [
  "Price Low",
  "Price High",
  "Rating Low",
  "Rating High",
  "Area Low",
  "Area High",
  "King Bed Count Low",
  "King Bed Count High",
  "Queen Bed Count Low",
  "Queen Bed Count High",
  "Total Bed Count Low",
  "Total Bed Count High",
  "Name Asc",
  "Name Desc",
];
const filters = ["Room Type", "Bed Type", "Price Range"];
const roomType = [
  "STANDARD_SUITE",
  "GRAND_DELUXE",
  "COUPLE_SUITE",
  "GARDEN_SUITE",
  "FAMILY_DELUXE",
  "SUPER_DELUXE",
];
const RoomResultConfig: React.FC = () => {
  const occupancyTaxRef = useRef<HTMLInputElement>(null);
  const resortTaxRef = useRef<HTMLInputElement>(null);
  const roomImageRef = useRef<HTMLInputElement[]>([]);
  const roomDescriptionRef = useRef<HTMLInputElement[]>([]);
  const roomAmmenitiesRef = useRef<HTMLInputElement[]>([]);

  const token = useAppSelector(jwtToken);


  const handleClickSort = (e: React.MouseEvent<HTMLLabelElement>) => {
    const checkbox = e.target as HTMLInputElement;
    const checkboxValue = checkbox.value;

    for (let i = 0; i < roomResultConfig.sortType.length; i++) {
      if (roomResultConfig.sortType[i].value === checkboxValue) {
        roomResultConfig.sortType[i].present = true;
        break;
      }
    }
  };

  const handleClickFilter = (e: React.MouseEvent<HTMLLabelElement>) => {
    const checkbox = e.target as HTMLInputElement;
    const checkboxValue = checkbox.value;
    roomResultConfig.filterTypes.forEach(
      (label) =>
        label.value === checkboxValue && (label.present = checkbox.checked)
    );
  };

  const updateConfig = async (newRoomResultConfig:any)=>{
    await axios.post(process.env.REACT_APP_UPDATE_CONFIG!, {
        token:token,
        fileName: "SearchResultsPage.txt",
        folderName:"hotel-1/RoomResultsPage/",
        fileContent: newRoomResultConfig
    }).then(response=>response.data)
    .catch(error=>console.log("error"));
  }

  const handleConfig = () => {
    console.log(roomDescriptionRef.current);
    const newRoomResultConfig: any = {
      sortType: roomResultConfig.sortType
        .filter((item) => item.present === true)
        .map((item) => {
          const { present, ...rest } = item;
          return rest;
        }),
      filterTypes: roomResultConfig.filterTypes
        .filter((item) => item.present === true)
        .map((item) => {
          const { present, ...rest } = item;
          return rest;
        }),
      taxes: roomResultConfig.taxes.map((tax) => {
        if (tax.name === "Occupancy Tax") {
          return { ...tax, factor: occupancyTaxRef.current?.value! };
        } else if (tax.name === "Resort Tax") {
          return { ...tax, factor: resortTaxRef.current?.value! };
        }
        return tax;
      }),
      roomImages: roomResultConfig.roomImages.map(
        (roomResults, index: number) => {
          console.log("inside", roomDescriptionRef.current[index]?.value);
          if (
            roomDescriptionRef.current[index]?.value !== null &&
            roomDescriptionRef.current[index]?.value !== ""
          ) {
            console.log("inside", roomDescriptionRef.current[index]?.value);
            roomResultConfig.roomImages[index].description =
              roomDescriptionRef.current[index]?.value!;
          }
          if (
            roomImageRef.current[index]?.value !== null &&
            roomImageRef.current[index]?.value !== undefined
          ) {
            roomResultConfig.roomImages[index].images =
              roomImageRef.current[index]?.value!.split(",");
          }
          if (
            roomAmmenitiesRef.current[index]?.value !== null &&
            roomAmmenitiesRef.current[index]?.value !== undefined
          ) {
            roomResultConfig.roomImages[index].amnetieis =
              roomAmmenitiesRef.current[index]?.value!.split(",");
          }
          return roomResults;
        }
      ),
    };
    updateConfig(newRoomResultConfig);
  };
  return (
    <>
      <div className="heading-config">Room Results Configuration</div>
      <div className="sort-label">Sort Type</div>
      {sortType.map((type: any, index: number) => (
        <>
          <FormControlLabel
            value="End"
            control={<Checkbox value={type} />}
            label={type}
            labelPlacement="end"
            onClick={(e) => handleClickSort(e)}
            className="sort-check"
          />
          {index % 2 !== 0 && <div></div>}
        </>
      ))}
      <div className="sort-label">Filter Type</div>
      {filters.map((filter: any) => (
        <FormControlLabel
          value="End"
          control={<Checkbox value={filter} />}
          label={filter}
          labelPlacement="end"
          onClick={(e) => handleClickFilter(e)}
          className="filter-check"
        />
      ))}

      <div className="text-label">
        <div className="label">Enter Resort Tax</div>{" "}
        <TextField
          className="textfield-label"
          inputRef={resortTaxRef}
          type="number"
        />
      </div>
      <div className="text-label">
        <div className="label">Enter Occupancy Tax</div>{" "}
        <TextField
          className="textfield-label"
          inputRef={occupancyTaxRef}
          type="number"
        />
      </div>
      {roomType.map((type, index: number) => (
        <>
          <div className="room-type">{type}</div>
          <div className="text-label">
            <div className="label images-label">Enter Image Url(, seprated)</div>{" "}
            <TextField
              className="textfield-label"
              inputRef={(input) => {
                roomImageRef.current[index] = input;
              }}
            />
            <div className="label images-label">Enter Description</div>{" "}
            <TextField
              className="textfield-label"
              inputRef={(input) => {
                roomDescriptionRef.current[index] = input;
              }}
            />
            <div className="label images-label">Enter Ammenities(, seprated)</div>{" "}
            <TextField
              className="textfield-label"
              inputRef={(input) => {
                roomAmmenitiesRef.current[index] = input;
              }}
            />
          </div>
        </>
      ))}
      <Button
        variant="contained"
        onClick={() => handleConfig()}
        className="button-config"
      >
        Save Landing Page Config
      </Button>
    </>
  );
};
export default RoomResultConfig;
