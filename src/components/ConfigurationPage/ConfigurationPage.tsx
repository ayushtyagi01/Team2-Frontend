import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { LandingPageConfigUtil } from "../../util/configurationUtil/LandingPageConfigUtil";
import RoomResultConfig from "./RoomResultsConfig";
import "./ConfigurationPage.scss";
import CheckoutPageConfig from "./CheckoutPageConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { email, jwtToken, setJwtToken } from "../../redux/slice/UserSlice";
import { FormattedMessage } from "react-intl";
import { user } from "../../redux/slice/UserSlice";
import { Authenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

interface LandingPageConfig {
  propertyName: number;
  headerLogo: string;
  pageTitle: string;
  bannerImage: string;
  maxLengthOfStay: number;
  typeOfGuest: {
    adult: {
      title: string;
      min: number;
      max: number;
      exists: string;
      minAge: string;
    };
    children: {
      title: string;
      min: number;
      max: number;
      exists: string;
      maxAge: string;
    };
  };
  rooms: string;
  accessibility: string[];
  availableTypeOfGuests: string[];
}

const ConfigurationPage: React.FC = () => {
  const bannerImageRef = useRef<HTMLInputElement>(null);
  const headerLogoRef = useRef<HTMLInputElement>(null);
  const maxStayDaysRef = useRef<HTMLInputElement>(null);
  const pageTitleRef = useRef<HTMLInputElement>(null);
  const guestRef = useRef<HTMLInputElement>(null);
  const roomsRef = useRef<HTMLInputElement>(null);
  const accessibilityRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const token = useAppSelector(jwtToken);
  const userEmail = useAppSelector(email);
  const [snackbar, setSnackbar] = useState(false);
  const [open1, setOpen1] = useState(true);
  const username = useAppSelector(user);
  const dispatch = useAppDispatch();
  const [currentConfig, setCurrentConfig] = useState<LandingPageConfig>();

  useEffect(() => {
    Auth.currentSession()
      .then((session) => {
        if (session && session.isValid()) {
          const idToken = session.getIdToken().getJwtToken();
          dispatch(setJwtToken(idToken));
        }
      })
      .catch((error) => {});

    const getData = async () => {
      const config = await axios.get(
        "https://team2-configuration.s3.ap-south-1.amazonaws.com/hotel-1/LandingPage.txt"
      );

      setCurrentConfig(config.data);
    };
    getData();

    console.log("current", currentConfig);
  }, []);

  const handleClose1 = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen1(false);
  };

  const updateConfig = async () => {
    await axios
      .post(process.env.REACT_APP_UPDATE_CONFIG!, {
        token: token,
        fileName: "LandingPage.txt",
        folderName: "hotel-1/",
        fileContent: JSON.stringify(LandingPageConfigUtil),
      })
      .then((response) => response.data)
      .catch((error) => console.log("error"));
    console.log("config", JSON.stringify(LandingPageConfigUtil));
    setSnackbar(true);
  };

  const getRoles = async () => {
    await axios
      .post(process.env.REACT_APP_GET_ROLE!, {
        email: localStorage.getItem("email"),
      })
      .then((response: any) => {
        console.log("res", response.data.role, "new", userEmail);
        if (response.data.role !== "ADMIN") {
          console.log("in");
          navigate("/");
        }
      });
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
        LandingPageConfigUtil.availableTypeOfGuests = ["adult", "children"];
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
    if (guestRef.current?.checked) {
      LandingPageConfigUtil.availableTypeOfGuests = ["adult", "children"];
    }
    if (!guestRef.current?.checked) {
      LandingPageConfigUtil.availableTypeOfGuests = [];
    }
    if (roomsRef.current?.checked) {
      LandingPageConfigUtil.rooms = "true";
    }
    if (!roomsRef.current?.checked) {
      LandingPageConfigUtil.rooms = "false";
    }
    if (accessibilityRef.current?.checked) {
      LandingPageConfigUtil.accessibility = ["wheelchair"];
    }
    if (!accessibilityRef.current?.checked) {
      LandingPageConfigUtil.accessibility = [];
    }

    updateConfig();
  };
  return (
    <Authenticator
      className="login-container"
      signUpAttributes={["email", "name"]}
    >
      {({ signOut, user }) => (
        <>
          <div className="heading-config">Landing Page Configuration</div>
          <div className="config-container">
            Select field to show on Landing Page
            {currentConfig && (
              <FormControlLabel
                value="End"
                control={
                  <Checkbox
                    value="Guest"
                    defaultChecked={
                      currentConfig.availableTypeOfGuests.length > 0
                    }
                    inputRef={guestRef}
                  />
                }
                label="Guest"
                labelPlacement="end"
                onClick={(e) => handleClick(e)}
                className="checkbox-from"
              />
            )}
            {currentConfig && (
              <FormControlLabel
                value="End"
                control={
                  <Checkbox
                    value="Room"
                    defaultChecked={
                      currentConfig && currentConfig.rooms.length > 0
                    }
                    inputRef={roomsRef}
                  />
                }
                label="Room"
                labelPlacement="end"
                onClick={(e) => handleClick(e)}
                className="checkbox-from"
              />
            )}
            {currentConfig && (
              <FormControlLabel
                value="End"
                control={
                  <Checkbox
                    value="Accessibility"
                    defaultChecked={
                      currentConfig && currentConfig.accessibility.length > 0
                    }
                    inputRef={accessibilityRef}
                  />
                }
                label="Accessibility"
                labelPlacement="end"
                onClick={(e) => handleClick(e)}
                className="checkbox-from"
              />
            )}
          </div>
          <div className="text-label">
            <div className="label">Enter Banner image</div>{" "}
            <TextField
              className="textfield-label"
              inputRef={bannerImageRef}
              defaultValue={
                currentConfig && currentConfig.bannerImage
                  ? currentConfig.bannerImage
                  : LandingPageConfigUtil.bannerImage
              }
            />
          </div>
          <div className="text-label">
            <div className="label">Enter Header Logo</div>{" "}
            <TextField
              className="textfield-label"
              inputRef={headerLogoRef}
              defaultValue={
                currentConfig && currentConfig.headerLogo
                  ? currentConfig.bannerImage
                  : LandingPageConfigUtil.headerLogo
              }
            />
          </div>
          <div className="text-label">
            <div className="label">Enter Maximum day of stay</div>
            <TextField
              className="textfield-label"
              inputRef={maxStayDaysRef}
              type="number"
              defaultValue={
                currentConfig && currentConfig.maxLengthOfStay
                  ? currentConfig.bannerImage
                  : LandingPageConfigUtil.maxLengthOfStay
              }
            />
          </div>
          <div className="text-label">
            <div className="label">Enter page Title</div>{" "}
            <TextField
              className="textfield-label"
              inputRef={pageTitleRef}
              defaultValue={
                currentConfig && currentConfig.pageTitle
                  ? currentConfig.bannerImage
                  : LandingPageConfigUtil.pageTitle
              }
            />
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
            <Snackbar
              open={open1}
              autoHideDuration={2000}
              onClose={handleClose1}
            >
              <Alert
                onClose={handleClose1}
                severity="error"
                sx={{ width: "100%", top: 0 }}
              >
                <FormattedMessage
                  id="UploadSuccessful"
                  defaultMessage="Upload Successfull"
                />
              </Alert>
            </Snackbar>
          )}
        </>
      )}
    </Authenticator>
  );
};
export default ConfigurationPage;
