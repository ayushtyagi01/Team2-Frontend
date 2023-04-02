import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { sortType } from "../../../../redux/slice/RoomResultConfigSlice";
import { MenuItem } from "@mui/material";
import { roomPostData } from "../../../../util/roomPostData";
import { getRoomData } from "../../../../redux/slice/PostDataSlice";
import './Price.scss';
import { ClassNames } from "@emotion/react";


const Price: React.FC = () => {
  const sortData = useAppSelector(sortType);
  const reduxDispatch = useAppDispatch();
  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    sortData.forEach(sortType=>{
      if(sortType.value === e.target.value){
        roomPostData.sortType = {
          sortValue: sortType.sortValue,
          sortOrder: sortType.sortOrder,
        };
        roomPostData.pageNumber=1;
        reduxDispatch(getRoomData(roomPostData));
      }
    })
  };

  return (
    <div>
        <select className = "sort-select" onChange={(e)=>handleChange(e)}
        >
          {sortData.map((data) => (
            <option  value={data.value}>
              {data.value}
            </option>
          ))}
        </select>
    </div>
  );
};
export default Price;
