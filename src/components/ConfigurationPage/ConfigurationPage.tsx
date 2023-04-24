import { Alert, Button, Checkbox, FormControlLabel, Snackbar, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { LandingPageConfigUtil } from "../../util/configurationUtil/LandingPageConfigUtil";
import RoomResultConfig from "./RoomResultsConfig";
import "./ConfigurationPage.scss";
import CheckoutPageConfig from "./CheckoutPageConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { jwtToken } from "../../redux/slice/UserSlice";
import { error } from "console";
import { FormattedMessage } from "react-intl";
import {user} from "../../redux/slice/UserSlice";
import { Authenticator } from "@aws-amplify/ui-react";

const ConfigurationPage: React.FC = () => {
  const bannerImageRef = useRef<HTMLInputElement>(null);
  const headerLogoRef = useRef<HTMLInputElement>(null);
  const maxStayDaysRef = useRef<HTMLInputElement>(null);
  const pageTitleRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const token = useAppSelector(jwtToken);
  const [snackbar,setSnackbar]=useState(false);
  const [open1, setOpen1] = useState(true);
  const username = useAppSelector(user);

  const handleClose1 = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen1(false);
  };
  

  const updateConfig = async ()=>{
    console.log({
      token:token,
      fileName: "LandingPage.txt",
      folderName:"hotel-1/",
      fileContent: LandingPageConfigUtil
  })
    await axios.post(process.env.REACT_APP_UPDATE_CONFIG!, {
        token:token,
        fileName: "LandingPage.txt",
        folderName:"hotel-1/",
        fileContent: JSON.stringify(LandingPageConfigUtil)
    }).then(response=>response.data)
    .catch(error=>console.log("error"));
    setSnackbar(true);
  }

  const getRoles = async () => {
    const response = await axios.post(process.env.REACT_APP_GET_ROLE!, {
      email: JSON.parse(
        localStorage.getItem(
          "CognitoIdentityServiceProvider.5mas2rith8mta1sa61a1eui38n.dbc46219-21b0-444d-ab18-f3869aec0896.userData"
        )!
      ).UserAttributes[3].Value,
    });
    if(response.data.role!=='ADMIN'){
      console.log("res",response.data);
      navigate('/');
    }
    
  };
  useEffect(() => {
    getRoles();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    const checkbox = e.target as HTMLInputElement;
    if (checkbox.checked) {
      const checkboxValue = checkbox.value;
      if (checkboxValue === "Room") {
        LandingPageConfigUtil.rooms = "true";
      } else if (checkboxValue === "Accessibility") {
        LandingPageConfigUtil.accessibility = ["wheelchair"];
      } else if (checkboxValue === "Guest") {
        LandingPageConfigUtil.availableTypeOfGuests = [
          "adult",
          "children"
          ];
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
    <Authenticator signUpAttributes={["email", "name"]}>
      {({ signOut, user }) => (
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
          control={<Checkbox value="Room"/>}
          label="Room"
          labelPlacement="end"
          onClick={(e) => handleClick(e)}
          className="checkbox-from"
        />
        <FormControlLabel
          value="End"
          control={<Checkbox value="Accessibility"/>}
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
      {snackbar && (
      <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="error" sx={{ width: "100%" ,top:0}}>
        <FormattedMessage id="UploadSuccessful" defaultMessage="Upload Successfull" />
        </Alert>
      </Snackbar>
      )}
    </>
  )}
  </Authenticator>
  );
};
export default ConfigurationPage;
