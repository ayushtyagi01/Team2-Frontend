import Filters from "./Filters/Filters";
import './BedTypeForm.scss';

const BedTypeForm: React.FC = () => {
  return (
    <>
      <div className="filter-container">
        <div className="filter-heading">Narrow your results</div>
            <Filters heading={"Bed Type"} types={["2 Queen beds","1 King bed"]}/>
            <Filters heading={"Room Type"} types={["Casino Tower Rooms","Skyrise"]}/>
      </div>
    </>
  );
};

export default BedTypeForm;
