import SearchForm from "./SearchForm/SeacrhForm";
import './RoomResultPage.scss'
import BedTypeForm from "./BedTypeForm/BedTypeForm";
import { bannerImage } from "../../redux/slice/landingPageSlice";
import { useAppSelector } from "../../redux/hooks";
import { Box, Step, StepLabel, Stepper } from "@mui/material";

const steps = [
  '1. Choose Room',
  '2. Choose add on',
  '3. Checkout',
];

const RoomResultPage: React.FC = () => {
  const banner_image = useAppSelector(bannerImage);
    return (
      <>
      <div className = "room-banner" style={{
          backgroundImage: `url(${banner_image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
      </div>
      <div className="stepper-container" >
      <Stepper activeStep={2} alternativeLabel className="stepper">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
      <div className="form-container">
       <SearchForm/>
       <div className="body-container">
        <BedTypeForm/>
       </div>
       </div>
      </>
    );
  }
  
  export default RoomResultPage;