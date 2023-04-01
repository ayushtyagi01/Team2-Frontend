import Filters from "./Filters/Filters";
import './BedTypeForm.scss';
import { useAppSelector } from "../../../redux/hooks";
import { filterTypes } from "../../../redux/slice/RoomResultConfigSlice";

const BedTypeForm: React.FC = () => {
  const filters = useAppSelector(filterTypes);
  return (
    <>
      <div className="filter-container">
        <div className="filter-heading">Narrow your results</div>
        {
          filters.map(filter=>(
            <Filters heading={filter.value} types={filter.filterOptions} name = {filter.filterTypeName}/>
          ))
        }
      </div>
    </>
  );
};

export default BedTypeForm;
