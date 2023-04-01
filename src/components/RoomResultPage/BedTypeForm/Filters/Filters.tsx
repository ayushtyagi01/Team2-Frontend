import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormattedMessage } from "react-intl";
import { RoomPostData, roomPostData } from "../../../../util/roomPostData";
import "./Filter.scss";
import { useAppDispatch } from "../../../../redux/hooks";
import { getRoomData } from "../../../../redux/slice/PostDataSlice";

interface FilterInterface {
  heading: string;
  types: string[];
  name: string;
}
const Filters: React.FC<FilterInterface> = (props) => {
  const reduxDispatch = useAppDispatch();

  const removeType = () => {
    const index = roomPostData.filterTypes.findIndex(obj=>obj.filterTypeName===props.name)
    roomPostData.filterTypes.splice(index, 1);
  };
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    let found = false;
    const target: string = e.target.value;
    roomPostData.filterTypes.forEach((filters) => {
      if (filters.filterTypeName === props.name) {
        found = true;
        if (filters.filterOptions.includes(e.target.value)) {
          if (filters.filterOptions.length === 1) {
            removeType();
          } else {
            filters.filterOptions.splice(
              filters.filterOptions.indexOf(e.target.value),
              1
            );
          }
          reduxDispatch(getRoomData(roomPostData));
        } else {
          filters.filterOptions.push(e.target.value);
          reduxDispatch(getRoomData(roomPostData));
        }
      }
    });
    if (found === false) {
      const filterType = {
        filterTypeName: props.name,
        maxAttributes: 2,
        filterOptions: [target],
      };
      roomPostData.filterTypes.push(filterType);
      reduxDispatch(getRoomData(roomPostData));
    }
  };
  return (
    <>
      <Accordion className="accordion-container">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props.heading}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {props.types.map(
              (type, index): React.ReactNode => (
                <div>
                  <FormControlLabel
                    key={index}
                    value={type}
                    control={<Checkbox onChange={(e) => handleClick(e)} />}
                    label={
                      <span>
                        <FormattedMessage id={type} defaultMessage={type} />
                      </span>
                    }
                    labelPlacement="end"
                  />
                </div>
              )
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Filters;
