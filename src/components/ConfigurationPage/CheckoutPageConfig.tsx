import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useRef } from "react";
import { checkoutPageConfigUtil } from "../../util/configurationUtil/CheckoutPageConfigUtil";
import { LandingPageConfigUtil } from "../../util/configurationUtil/LandingPageConfigUtil";
import "./CheckoutPageConfig.scss";

const TravellerInfo = [
  "First Name",
  "Middle Name",
  "Last Name",
  "Phone",
  "Email",
];
const BillingInfo = [
  "First Name",
  "Middle Name",
  "Mailing Address 1",
  "Mailing Address 2",
  "Country",
  "State",
  "City",
  "Zip",
  "Phone",
  "Email",
];
const PaymentInfo = ["Card Name", "Expiry Month", "Expiry Year", "CVV"];
const CheckoutPageConfig: React.FC = () => {
  const handleClickTraveller = (e: React.MouseEvent<HTMLLabelElement>) => {
    const checkbox = e.target as HTMLInputElement;
    const checkboxValue = checkbox.value;
    checkoutPageConfigUtil.INFO[0].inputs.forEach((label) =>
      label.forEach(
        (type) =>
          type.label === checkboxValue && (type.present = checkbox.checked)
      )
    );
  };
  const handleClickBilling = (e: React.MouseEvent<HTMLLabelElement>) => {
    const checkbox = e.target as HTMLInputElement;
    const checkboxValue = checkbox.value;
    checkoutPageConfigUtil.INFO[1].inputs.forEach((label) =>
      label.forEach(
        (type) =>
          type.label === checkboxValue && (type.present = checkbox.checked)
      )
    );
  };
  const handleClickPayment = (e: React.MouseEvent<HTMLLabelElement>) => {
    const checkbox = e.target as HTMLInputElement;
    const checkboxValue = checkbox.value;
    checkoutPageConfigUtil.INFO[2].inputs.forEach((label) =>
      label.forEach(
        (type) =>
          type.label === checkboxValue && (type.present = checkbox.checked)
      )
    );
  };

  const handleConfig = () => {
    const filteredCheckoutPageConfigUtil = checkoutPageConfigUtil.INFO.map(
      (page) => {
        const filteredInputs = page.inputs.map((inputsArray) =>
          inputsArray
            .filter((input) => input.present)
            .map(({ present, ...rest }) => rest)
        );
        return { ...page, inputs: filteredInputs };
      }
    );
    console.log(filteredCheckoutPageConfigUtil);
  };
  return (
    <>
      <div className="heading-config">Checkout Page Configuration</div>
      <div className="info-label">Traveller Info</div>
      {TravellerInfo.map((type: any) => (
        <FormControlLabel
          value="End"
          control={<Checkbox value={type}/>}
          label={type}
          labelPlacement="end"
          onClick={(e) => handleClickTraveller(e)}
          className="info-check"
        />
      ))}
      <div className="info-label">Billing Info</div>
      {BillingInfo.map((type: any) => (
        <FormControlLabel
          value="End"
          control={<Checkbox value={type}/>}
          label={type}
          labelPlacement="end"
          onClick={(e) => handleClickBilling(e)}
          className="info-check"
        />
      ))}
      <div className="info-label">Payment Info</div>
      {PaymentInfo.map((type: any) => (
        <FormControlLabel
          value="End"
          control={<Checkbox value={type}/>}
          label={type}
          labelPlacement="end"
          onClick={(e) => handleClickPayment(e)}
          className="info-check"
        />
      ))}
      <Button
        variant="contained"
        onClick={() => handleConfig()}
        className="config-btn"
      >
        Save Checkout Page Config
      </Button>
    </>
  );
};
export default CheckoutPageConfig;
