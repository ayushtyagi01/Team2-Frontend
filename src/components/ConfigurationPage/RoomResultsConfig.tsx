import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import axios from "axios";
import { createRef, useEffect, useRef, useState } from "react";
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
  "Name ASC",
  "Name DESC",
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
  const sortTypeRef = useRef<HTMLInputElement[]>([]);
  const filterTypeRef = useRef<HTMLInputElement[]>([]);

  const [currentConfig, setCurrentConfig] = useState<any>(null);

  const token = useAppSelector(jwtToken);

  const handleClickSort = (e: React.MouseEvent<HTMLLabelElement>) => {
    const checkbox = e.target as HTMLInputElement;
    const checkboxValue = checkbox.value;

    roomResultConfig.sortType.forEach(
      (label) =>
        label.value === checkboxValue && (label.present = checkbox.checked)
    );
  };

  const handleClickFilter = (e: React.MouseEvent<HTMLLabelElement>) => {
    const checkbox = e.target as HTMLInputElement;
    const checkboxValue = checkbox.value;

    roomResultConfig.filterTypes.forEach(
      (label) =>
        label.value === checkboxValue && (label.present = checkbox.checked)
    );
  };

  const updateConfig = async (newRoomResultConfig: any) => {
    console.log("token", token);
    await axios
      .post(process.env.REACT_APP_UPDATE_CONFIG!, {
        token: token,
        fileName: "SearchResultsPage.txt",
        folderName: "hotel-1/RoomResultsPage/",
        fileContent: JSON.stringify(newRoomResultConfig),
      })
      .then((response) => response.data)
      .catch((error) => console.log("error"));
  };

  const handleConfig = () => {
    const checkedLabels: any[] = [];
    sortTypeRef.current.map((input) => {
      if (input.checked) {
        checkedLabels.push(input.value.trim());
      }
    });
    checkedLabels.map((checkboxValue: any) => {
      roomResultConfig.sortType.forEach(
        (label) => label.value == checkboxValue && (label.present = true)
      );
    });

    const checkedLabelsFilter: any[] = [];
    filterTypeRef.current.map((input) => {
      if (input.checked) {
        checkedLabelsFilter.push(input.value);
      }
    });
    checkedLabelsFilter.map((checkboxValue: any) => {
      roomResultConfig.filterTypes.forEach(
        (label) => label.value == checkboxValue && (label.present = true)
      );
    });

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
          if (
            roomDescriptionRef.current[index]?.value !== null &&
            roomDescriptionRef.current[index]?.value !== ""
          ) {
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

  useEffect(() => {
    axios
      .get(
        "https://team2-configuration.s3.ap-south-1.amazonaws.com/hotel-1/RoomResultsPage/SearchResultsPage.txt"
      )
      .then((data: any) => {
        console.log("data", data.data);
        setCurrentConfig(data.data);
      });
  }, []);

  return (
    <>
      <div className="heading-config">Room Results Configuration</div>
      <div className="sort-label">Sort Type</div>
      {currentConfig &&
        sortType.map((type: any, index: number) => (
          <>
            <FormControlLabel
              value="End"
              control={
                <Checkbox
                  value={type}
                  defaultChecked={
                    currentConfig.sortType.filter(
                      (val: any) => val.value == type
                    ).length > 0
                  }
                  inputRef={(ref) => (sortTypeRef.current[index] = ref!)}
                />
              }
              label={type}
              labelPlacement="end"
              onClick={(e) => handleClickSort(e)}
              className="sort-check"
            />
            {index % 2 !== 0 && <div></div>}
          </>
        ))}
      <div className="sort-label">Filter Type</div>
      {currentConfig &&
        filters.map((filter: any, index: number) => (
          <FormControlLabel
            value="End"
            control={
              <Checkbox
                value={filter}
                defaultChecked={
                  currentConfig.filterTypes.filter(
                    (val: any) => val.value == filter
                  ).length > 0
                }
                inputRef={(ref) => (filterTypeRef.current[index] = ref!)}
              />
            }
            label={filter}
            labelPlacement="end"
            onClick={(e) => handleClickFilter(e)}
            className="filter-check"
          />
        ))}

      <div className="text-label">
        <div className="label">Enter Resort Tax</div>{" "}
        {currentConfig && (
          <TextField
            className="textfield-label"
            inputRef={resortTaxRef}
            type="number"
            defaultValue={
              currentConfig.taxes
                ? currentConfig.taxes[0].factor
                : roomResultConfig.taxes[0].factor
            }
          />
        )}
      </div>
      <div className="text-label">
        <div className="label">Enter Occupancy Tax</div>{" "}
        {currentConfig && (
          <TextField
            className="textfield-label"
            inputRef={occupancyTaxRef}
            type="number"
            defaultValue={
              currentConfig.taxes
                ? currentConfig.taxes[1].factor
                : roomResultConfig.taxes[1].factor
            }
          />
        )}
      </div>
      {roomType.map((type, index: number) => (
        <>
          <div className="room-type">{type}</div>
          <div className="text-label">
            <div className="label images-label">
              Enter Image Url(, seprated)
            </div>{" "}
            <TextField
              className="textfield-label"
              inputRef={(input) => {
                roomImageRef.current[index] = input;
              }}
              defaultValue={
                currentConfig && currentConfig.roomImages
                  ? currentConfig.roomImages.filter(
                      (val: any) => val.customeName == type
                    )[0].images
                  : roomResultConfig.roomImages.filter(
                      (val: any) => val.customeName == type
                    )[0].images
              }
            />
            <div className="label images-label">Enter Description</div>{" "}
            <TextField
              className="textfield-label"
              inputRef={(input) => {
                roomDescriptionRef.current[index] = input;
              }}
              defaultValue={
                currentConfig && currentConfig.roomImages
                  ? currentConfig.roomImages.filter(
                      (val: any) => val.customeName == type
                    )[0].description
                  : roomResultConfig.roomImages.filter(
                      (val: any) => val.customeName == type
                    )[0].description
              }
            />
            <div className="label images-label">
              Enter Ammenities(, seprated)
            </div>{" "}
            <TextField
              className="textfield-label"
              inputRef={(input) => {
                roomAmmenitiesRef.current[index] = input;
              }}
              defaultValue={
                currentConfig && currentConfig.roomImages
                  ? currentConfig.roomImages.filter(
                      (val: any) => val.customeName == type
                    )[0].amnetieis
                  : roomResultConfig.roomImages.filter(
                      (val: any) => val.customeName == type
                    )[0].amnetieis
              }
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
