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
import './Filter.scss';

interface FilterInterface {
  heading: string;
  types: string[];
}
const Filters: React.FC<FilterInterface> = (props) => {
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
                  control={<Checkbox />}
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
