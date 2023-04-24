import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { LandingPageConfigUtil } from "../../util/configurationUtil/LandingPageConfigUtil";
import RoomResultConfig from "./RoomResultsConfig";
import "./ConfigurationPage.scss";
import CheckoutPageConfig from "./CheckoutPageConfig";
import { getRoles } from "@testing-library/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { jwtToken } from "../../redux/slice/UserSlice";
import { error } from "console";

const ConfigurationPage: React.FC = () => {
  const bannerImageRef = useRef<HTMLInputElement>(null);
  const headerLogoRef = useRef<HTMLInputElement>(null);
  const maxStayDaysRef = useRef<HTMLInputElement>(null);
  const pageTitleRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const token = useAppSelector(jwtToken);
  

  const updateConfig = async ()=>{
    console.log({
      token:token,
      fileName: "LandingPage.txt",
      folderName:"hotel-1/",
      fileContent: LandingPageConfigUtil
  })
    const response = await axios.post(process.env.REACT_APP_UPDATE_CONFIG!, {
        token:token,
        fileName: "LandingPage.txt",
        folderName:"hotel-1/",
        fileContent: JSON.stringify(LandingPageConfigUtil)
    }).then(response=>response.data)
    .catch(error=>console.log("error"));
    console.log(response);
  }

  const getRoles = async () => {
    const response = await axios.post(process.env.REACT_APP_GET_ROLE!, {
      email: JSON.parse(
        localStorage.getItem(
          "CognitoIdentityServiceProvider.5mas2rith8mta1sa61a1eui38n.dbc46219-21b0-444d-ab18-f3869aec0896.userData"
        )!
      ).UserAttributes[3].Value,
    });
    if(response.data==='NON_ADMIN'){
      navigate('/');
    }
  };
  useEffect(() => {
    getRoles();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    const checkbox = e.target as HTMLInputElement;
    if (!checkbox.checked) {
      const checkboxValue = checkbox.value;
      if (checkboxValue === "Room") {
        LandingPageConfigUtil.rooms = "false";
      } else if (checkboxValue === "Accessibility") {
        LandingPageConfigUtil.accessibility = [];
      } else if (checkboxValue === "Guest") {
        LandingPageConfigUtil.availableTypeOfGuests = [];
      }
    }
    
  };

  const handleConfig = () => {
    if (bannerImageRef.current?.value)
      LandingPageConfigUtil.bannerImage = bannerImageRef.current?.value!;
    if (headerLogoRef.current?.value)
      LandingPageConfigUtil.headerLogo = headerLogoRef.current?.value!;
    if (maxStayDaysRef.current?.value)
      LandingPageConfigUtil.maxLengthOfStay = parseInt(
        maxStayDaysRef.current?.value!
      );
    if (pageTitleRef.current?.value)
      LandingPageConfigUtil.pageTitle = pageTitleRef.current?.value!;

      updateConfig();
  };
  return (
    <>
      <div className="heading-config">Landing Page Configuration</div>
      <div className="config-container">
        Select field to show on Landing Page
        <FormControlLabel
          value="End"
          control={<Checkbox value="Guest" />}
          label="Guest"
          labelPlacement="end"
          onClick={(e) => handleClick(e)}
          className="checkbox-from"
        />
        <FormControlLabel
          value="End"
          control={<Checkbox />}
          label="Room"
          labelPlacement="end"
          onClick={(e) => handleClick(e)}
          className="checkbox-from"
        />
        <FormControlLabel
          value="End"
          control={<Checkbox />}
          label="Accessibility"
          labelPlacement="end"
          onClick={(e) => handleClick(e)}
          className="checkbox-from"
        />
      </div>
      <div className="text-label">
        <div className="label">Enter Banner image</div>{" "}
        <TextField className="textfield-label" inputRef={bannerImageRef} />
      </div>
      <div className="text-label">
        <div className="label">Enter Header Logo</div>{" "}
        <TextField className="textfield-label" inputRef={headerLogoRef} />
      </div>
      <div className="text-label">
        <div className="label">Enter Maximum day of stay</div>
        <TextField
          className="textfield-label"
          inputRef={maxStayDaysRef}
          type="number"
        />
      </div>
      <div className="text-label">
        <div className="label">Enter page Title</div>{" "}
        <TextField className="textfield-label" inputRef={pageTitleRef} />
      </div>
      <Button
        variant="contained"
        onClick={() => handleConfig()}
        className="button-config"
      >
        Save Landing Page Config
      </Button>
      <RoomResultConfig />
      <CheckoutPageConfig />
    </>
  );
};
export default ConfigurationPage;
