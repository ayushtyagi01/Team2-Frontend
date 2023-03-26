import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Alert, Checkbox, ListItemText } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { setProperty } from "../../../redux/slice/SearchFormSlice";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface PropertyDropdownProps {
  register: UseFormRegister<FieldValues>;
  required: boolean;
  errors: FieldErrors<FieldValues>;
}
const names = ["Property 2"];

const PropertyDropdown: React.FC<PropertyDropdownProps> = (props) => {
  const [propertyName, setPropertyName] = React.useState<string[]>([]);
  const reduxDispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent<typeof propertyName>) => {
    const {
      target: { value },
    } = event;
    setPropertyName(typeof value === "string" ? value.split(",") : value);
    reduxDispatch(setProperty(propertyName));
  };

  return (
    <>
      <FormControl sx={{ m: 3, width: "90%", mt: -1.5 }}>
        <Select
          multiple
          displayEmpty
          value={propertyName}
          id="property"
          input={<OutlinedInput />}
          {...props.register("property", { required: props.required })}
          renderValue={(selected: any) => {
            if (selected.length === 0) {
              return <div>Select all properties</div>;
            }
            return selected.join(", ");
          }}
          inputProps={{ "aria-label": "Without label" }}
          onChange={handleChange}
        >
          {names.map((name: any) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={propertyName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
        {props.errors.property && (
          <Alert severity="error">
            This field is required
          </Alert>
        )}
      </FormControl>
    </>
  );
};
export default PropertyDropdown;
