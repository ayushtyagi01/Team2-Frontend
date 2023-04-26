import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { jwtToken } from "../../redux/slice/UserSlice";
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
const PaymentInfo = ["Card Name", "Exp MM", "Exp YY", "CVV"];

const CheckoutPageConfig: React.FC = () => {
  const [checkoutConfig, setCheckoutConfig] = useState<any>(null);

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
  const token = useAppSelector(jwtToken);

  const updateConfig = async (filteredCheckoutPageConfigUtil: any) => {
    await axios
      .post(process.env.REACT_APP_UPDATE_CONFIG!, {
        token: token,
        fileName: "CheckoutConfig.txt",
        folderName: "hotel-1/",
        fileContent: filteredCheckoutPageConfigUtil,
      })
      .then((response) => response.data)
      .catch((error) => console.log("error"));
    console.log("value", filteredCheckoutPageConfigUtil);
  };

  const handleConfig = () => {
    const filteredCheckoutPageConfigUtil = checkoutPageConfigUtil.INFO.map(
      (page) => {
        const filteredInputs = page.inputs.map((inputsArray) => {
          return inputsArray
            .filter((input) => input.present)
            .map(({ present, ...rest }) => rest);
        });
        return { ...page, inputs: filteredInputs };
      }
    );

    updateConfig(filteredCheckoutPageConfigUtil);
  };

  useEffect(() => {
    axios
      .get(
        "https://team2-configuration.s3.ap-south-1.amazonaws.com/hotel-1/CheckoutConfig.txt"
      )
      .then((config) => {
        const result = config.data.INFO.map((obj: any) => {
          const flattenedInputs = obj.inputs.reduce(
            (acc: any, curr: any) => acc.concat(curr),
            []
          );
          return flattenedInputs.map((input: any) => ({
            label: input.label,
            type: input.type,
          }));
        });

        result[0].map((res: any) => {
          checkoutPageConfigUtil.INFO[0].inputs.forEach((label) =>
            label.forEach(
              (type) => type.label === res.label && (type.present = true)
            )
          );
        });
        result[1].map((res: any) => {
          checkoutPageConfigUtil.INFO[1].inputs.forEach((label) =>
            label.forEach(
              (type) => type.label === res.label && (type.present = true)
            )
          );
        });
        result[2].map((res: any) => {
          checkoutPageConfigUtil.INFO[2].inputs.forEach((label) =>
            label.forEach(
              (type) => type.label === res.label && (type.present = true)
            )
          );
        });

        setCheckoutConfig(result);
      });
  }, []);

  return (
    <>
      <div className="heading-config">Checkout Page Configuration</div>
      <div className="info-label">Traveller Info</div>
      {checkoutConfig &&
        checkoutConfig[0] &&
        TravellerInfo.map((type: any) => (
          <FormControlLabel
            value="End"
            control={
              <Checkbox
                value={type}
                defaultChecked={
                  checkoutConfig[0].filter((val: any) => val.label == type)
                    .length > 0
                }
              />
            }
            label={type}
            labelPlacement="end"
            onClick={(e) => handleClickTraveller(e)}
            className="info-check"
          />
        ))}

      <div className="info-label">Billing Info</div>
      {checkoutConfig &&
        checkoutConfig[1] &&
        BillingInfo.map((type: any) => (
          <FormControlLabel
            value="End"
            control={
              <Checkbox
                value={type}
                defaultChecked={
                  checkoutConfig[1].filter((val: any) => val.label == type)
                    .length > 0
                }
              />
            }
            label={type}
            labelPlacement="end"
            onClick={(e) => handleClickBilling(e)}
            className="info-check"
          />
        ))}
      <div className="info-label">Payment Info</div>
      {checkoutConfig &&
        checkoutConfig[2] &&
        PaymentInfo.map((type: any) => (
          <FormControlLabel
            value="End"
            control={
              <Checkbox
                value={type}
                defaultChecked={
                  checkoutConfig[2].filter((val: any) => val.label == type)
                    .length > 0
                }
              />
            }
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
