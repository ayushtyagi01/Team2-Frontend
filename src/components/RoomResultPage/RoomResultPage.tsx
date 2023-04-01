import './RoomResultPage.scss'
import BedTypeForm from "./BedTypeForm/BedTypeForm";
import RoomCards from "./RoomCards/RoomCards";
import { bannerImage } from "../../redux/slice/landingPageSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useEffect } from "react";
import { setBeds, setEndDate, setRooms, setStartDate } from "../../redux/slice/SearchFormSlice";
import { getRoomData } from "../../redux/slice/PostDataSlice";
import SearchForm from './SearchForm/SeacrhForm';
import { roomPostData } from '../../util/roomPostData';
import { useSearchParams } from 'react-router-dom';
import { getRoomConfig } from '../../redux/slice/RoomResultConfigSlice';

const steps = [
  '1. Choose Room',
  '2. Choose add on',
  '3. Checkout',
];

const RoomResultPage: React.FC = () => {
  const banner_image = useAppSelector(bannerImage);
  const reduxDispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(()=>{
    console.log("hhhahdsakjhd");
    reduxDispatch(getRoomConfig());
  },[]);

  const getFormData = ()=>{
    // if(searchParams.get('property')!==null){
    //   roomPostData.propertyId=parseInt(searchParams.get('property')!);
    //   reduxDispatch(setProperty(searchParams.get('property')))
    // }
    // else if(localStorage.getItem('property')!==null){
    //   roomPostData.propertyId= parseInt(localStorage.getItem('property')!);
    //   reduxDispatch(setProperty(localStorage.getItem('property')));
    // }
    if(searchParams.get('room')!==null){
      console.log('rooms',(parseInt(JSON.parse(searchParams.get('room')!))));
      roomPostData.requiredRoomsCount=parseInt(JSON.parse(searchParams.get('room')!));
      reduxDispatch(setRooms(searchParams.get('room')))
    }
    else if(localStorage.getItem('room')!==null){
      roomPostData.requiredRoomsCount=JSON.parse(localStorage.getItem('room')!);
      reduxDispatch(setRooms(localStorage.getItem('room')));
    }
    if(searchParams.get('start_date')!==null && searchParams.get('end_date')!=null){
      roomPostData.checkInDate=(searchParams.get('start_date')+"T00:00:00Z");
      roomPostData.checkOutDate=(searchParams.get('end_date')+"T00:00:00Z");
      roomPostData.duration= new Date(searchParams.get('end_date')!).getDate() - new Date(searchParams.get('start_date')!).getDate()+1
      reduxDispatch(setStartDate(searchParams.get('start_date')));
      reduxDispatch(setEndDate(searchParams.get('end_date')));
    }
    else if(localStorage.getItem('startDate')!==null && localStorage.getItem('endDate')!==null){
      roomPostData.checkInDate=(localStorage.getItem('startDate')+"T00:00:00Z");
      roomPostData.checkOutDate=(localStorage.getItem('endDate')+"T00:00:00Z");
      roomPostData.duration= new Date(localStorage.getItem('endDate')!).getDate() - new Date(localStorage.getItem('startDate')!).getDate()
      reduxDispatch(setStartDate(localStorage.getItem('startDate')));
      reduxDispatch(setEndDate(localStorage.getItem('endDate')));
    }
    if(searchParams.get('beds')!==null){
      reduxDispatch(setBeds(searchParams.get('beds')))
    }
    else if(localStorage.getItem('beds')!==null){
      reduxDispatch(setBeds(localStorage.getItem('beds')));
    }
    console.log("data",roomPostData);
    return roomPostData;
  }

  useEffect(()=>{
    reduxDispatch(getRoomData(getFormData()))
  },[]);

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
        <RoomCards/>
       </div>
       </div>
      </>
    );
  }
  
  export default RoomResultPage;