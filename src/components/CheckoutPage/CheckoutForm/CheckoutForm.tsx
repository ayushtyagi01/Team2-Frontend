import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  checkoutData,
  getCheckoutData,
} from "../../../redux/slice/CheckoutConfigSlice";
import "./CheckoutForm.scss";
import { TravellerSchema } from "../../../util/yupSchema/TravellerSchema";
import { BilingSchema } from "../../../util/yupSchema/BilingSchema";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const CheckoutForm = () => {
  const reduxDispatch = useAppDispatch();
  useEffect(() => {
    reduxDispatch(getCheckoutData());
  }, []);

  const [index, setIndex] = useState<number>(2);

  const checkoutConfig = useAppSelector(checkoutData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:
      index===0?yupResolver(TravellerSchema):yupResolver(BilingSchema)
  });
  const [error,showError] = useState<boolean>(false);
  const [Country, setCountry] = useState<string>("");
  const [State, setState] = useState<string>("");

  const onSubmitHandler = (data: any) => {
    if(index===1 && (Country===''||State==='')){
      showError(true);
      return;
    }
    console.log({ ...data,Country,State });
    setIndex(index + 1);
  };


  const selectCountry = (val: string) => {
    setCountry(val);
  };
  const selectState = (val: string) => {
    setState(val);
  };

  return (
    <>
      <div className="payment-header">Payment Info</div>
      {checkoutConfig.map((item: any, ind: number) => {
        return (
          <>
            <div className="payment-header-section">{item.title}</div>
            {index === ind && (
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                {item.inputs.map((input: any) => (
                  <div className="payment-header-section-input">
                    {input.map((field: any) => (
                     <div key={field.label} className={`input-container ${field.label.replace(" ", "")}`}>
                        <div className="input-header " >{field.label}</div>
                        <FormControl
                          sx={{ mr: 0, width: "100%" }}
                          variant="outlined"
                        >
                          {field.type === "text" ? (
                            <TextField 
                              {...register(field.label.replace(" ", ""))}
                              error={!!errors[field.label.replace(" ", "")]}
                              helperText={
                                errors[field.label.replace(" ", "")]
                                  ? errors[
                                      field.label.replace(" ", "")
                                    ]?.message?.toString()
                                  : " "
                              }
                            />
                          ) : field.label === "Country" ? (
                            <><CountryDropdown
                              {...register(field.label.replace(" ", ""), {
                                required: true,
                              })
                            }
                              value={Country}
                              onChange={(val) => selectCountry(val)}
                              onBlur={() => {}
                            }
                            />
                            {error && Country==='' && (
                              <span className="error-message">
                                This field is required
                              </span>
                            )}</>
                          ) : (
                            <><RegionDropdown
                            {...register(field.label.replace(" ", ""), {
                              required: true,
                            })}
                              country={Country}
                              value={State}
                              onChange={(val) => selectState(val)}
                              onBlur={() => {}}
                            />
                            {error && State==='' && (
                              <span className="error-message">
                                This field is required
                              </span>
                            )}</>
                          )}
                        </FormControl>
                      </div>
                    ))}
                  </div>
                ))}

                {
                  index===2 && <><div className="checkbox-container"><input type="checkbox" className="checkbox"/>
                  <p>Send me special offer</p></div>
                  <div className="checkbox-container"><input type="checkbox" className="checkbox"/>
                  <p>I agree to Terms and Policies of travel</p></div>
                  <div className="price-container">
                    <div className="due-amount">Total Due</div><div>$ XXX.XX</div></div>
                  </>
                }
                <div className="prev-next-btn">
                  {ind === index && item.previous && (
                    <p
                      className="previous-btn"
                      onClick={() => setIndex(index - 1)}
                    >
                      {item.previous}
                    </p>
                  )}
                  {ind === index && (
                    <Button
                      type="submit"
                      variant="contained"
                      className="btn-checkout-form"
                    >
                      {item.next}
                    </Button>
                  )}
                </div>
              </form>
            )}
          </>
        );
      })}
    </>
  );
};

export default CheckoutForm;
