import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, CircularProgress, FormControl, Modal, Snackbar, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import CryptoJS from "crypto-js";
import {
  checkoutData,
  getCheckoutData,
} from "../../../redux/slice/CheckoutConfigSlice";
import "./CheckoutForm.scss";
import { TravellerSchema } from "../../../util/yupSchema/TravellerSchema";
import { BilingSchema } from "../../../util/yupSchema/BilingSchema";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { PaymentSchema } from "../../../util/yupSchema/PaymentSchema";
import { Box } from "@mui/system";
import { getBookingData } from "../../../util/getBookingData";
import { bookingStatus, isLoading, postCheckoutData } from "../../../redux/slice/CheckoutDataSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "49.6%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  height: "82%",
  p: 4,
};

const CheckoutForm = () => {
  const reduxDispatch = useAppDispatch();
  useEffect(() => {
    reduxDispatch(getCheckoutData());
  }, []);

  const [index, setIndex] = useState<number>(0);

  const checkoutConfig = useAppSelector(checkoutData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:
      index === 0
        ? yupResolver(TravellerSchema)
        : index === 1
        ? yupResolver(BilingSchema)
        : yupResolver(PaymentSchema),
  });
  const [error, showError] = useState<boolean>(false);
  const [Country, setCountry] = useState<string>("");
  const [State, setState] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const checkboxRef = useRef<HTMLInputElement>(null);

  const isLoadingHere = useAppSelector(isLoading);
  const bookingStatusHere =  useAppSelector(bookingStatus);
  const navigate = useNavigate();
  if(isLoadingHere===2){
    navigate(`/booking?id=${bookingStatusHere.bookingId}`);
  }

  const onSubmitHandler = (data: any) => {
    if (index === 1 && (Country === "" || State === "")) {
      showError(true);
      return;
    }
    if (index === 2) {
      const CardName = CryptoJS.AES.encrypt(
        data.CardName,
        process.env.REACT_APP_SECRET_KEY!
      ).toString();
      const ExpMM = CryptoJS.AES.encrypt(
        data.ExpMM,
        process.env.REACT_APP_SECRET_KEY!
      ).toString();
      const ExpYY = CryptoJS.AES.encrypt(
        data.ExpYY,
        process.env.REACT_APP_SECRET_KEY!
      ).toString();
      const isChecked = checkboxRef.current?.checked ? 1:0;
      const bookingData = getBookingData({ ...data, Country, State, CardName, ExpMM, ExpYY ,isChecked});
      console.log("book",bookingData);
      reduxDispatch(postCheckoutData(bookingData));
    }
    setIndex(index + 1);
  };
  const selectCountry = (val: string) => {
    setCountry(val);
  };
  const selectState = (val: string) => {
    setState(val);
  };
  const totalBill =
  parseInt(localStorage.getItem("averageNightlyRateInDuration")!) *
  parseFloat(localStorage.getItem("priceFactor")!) *
  (new Date(localStorage.getItem("endDate")!).getDate() -
    new Date(localStorage.getItem("startDate")!).getDate() +
    1);
    let totalBillAfterTax = totalBill;
  totalBillAfterTax += totalBill * 0.18;
  totalBillAfterTax += totalBill * 0.08;

  return (
    <>
      <div className="payment-header">Payment Info</div> 
      {checkoutConfig.map((item: any, ind: number) => {
        return (
          <>
            <div className="payment-header-section">
            <FormattedMessage id={1+item.title}  /></div>
            {index === ind && (
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                {item.inputs.map((input: any) => (
                  <div className="payment-header-section-input">
                    {input.map((field: any) => (
                      <div
                        key={field.label}
                        className={`input-container ${field.label.replace(
                          " ",
                          ""
                        )}`}
                      >
                        <div className="input-header ">{field.label}</div>
                        <FormControl
                          sx={{ mr: 0, width: "100%" }}
                          variant="outlined"
                        >
                          {field.type === "text" ? (
                            <TextField
                              {...register(field.label.replace(" ", ""))}
                              error={!!errors[field.label.replace(" ", "")]}
                              type={field.label === "CVV" ? "password" : ""}
                              helperText={
                                errors[field.label.replace(" ", "")]
                                  ? errors[
                                      field.label.replace(" ", "")
                                    ]?.message?.toString()
                                  : " "
                              }
                            />
                          ) : field.label === "Country" ? (
                            <>
                              <CountryDropdown
                                {...register(field.label.replace(" ", ""), {
                                  required: true,
                                })}
                                value={Country}
                                onChange={(val) => selectCountry(val)}
                                onBlur={() => {}}
                              />
                              {error && Country === "" && (
                                <span className="error-message">
                                  This field is required
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              <RegionDropdown
                                {...register(field.label.replace(" ", ""), {
                                  required: true,
                                })}
                                country={Country}
                                value={State}
                                onChange={(val) => selectState(val)}
                                onBlur={() => {}}
                              />
                              {error && State === "" && (
                                <span className="error-message">
                                  This field is required
                                </span>
                              )}
                            </>
                          )}
                        </FormControl>
                      </div>
                    ))}
                  </div>
                ))}

                {index === 2 && (
                  <>
                    <div className="checkbox-container">
                      <input type="checkbox" className="checkbox" ref={checkboxRef}/>
                      <p>Send me special offer</p>
                    </div>
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        className="checkbox"
                        {...register("Terms")}
                      />
                      <p>
                        I agree to{" "}
                        <span
                          className="open-modal"
                          onClick={() => setOpenModal(true)}
                        >
                          Terms and Policies
                        </span>{" "}
                        of travel
                      </p>
                    </div>
                    <div className="checkbox-error">
                      {errors["Terms"] ? (
                        <div className="error-message">
                          {errors["Terms"]?.message?.toString()}
                        </div>
                      ) : (
                        " "
                      )}
                    </div>
                    <div className="price-container">
                      <div className="due-amount">Total Due</div>
                      <div>$ {(totalBillAfterTax * 0.15).toFixed(2)}</div>
                    </div>
                  </>
                )}
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
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {" "}
          <Box sx={style}>
            <div className="terms-header">Terms and Conditions</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            et quibusdam necessitatibus architecto inventore quas molestiae
            rerum voluptas consequuntur quidem? Vero, harum. Labore non
            consequuntur hic illum reprehenderit praesentium! Libero, id. Quo
            harum veritatis vel, sed atque temporibus doloremque deserunt unde
            ad, veniam eius labore praesentium optio est! Omnis facilis illum,
            alias iste ipsam quibusdam quod aliquam velit non! Aliquid suscipit
            voluptatibus dolorum expedita et excepturi eum fuga quas obcaecati,
            aut culpa laborum. Amet optio sapiente in quis dicta. Consequuntur
            aspernatur quasi quos impedit dicta similique ex vitae
            exercitationem quo, sed aut. Eveniet libero enim voluptatem
            distinctio expedita quis voluptatibus debitis repudiandae at, rem
            dolores deserunt eos dolorum alias quasi tempora in et nemo
            consequuntur molestias doloribus non quisquam id! Nam, fugiat magni
            natus cupiditate exercitationem laboriosam est saepe ad doloribus
            voluptatum, dignissimos repellendus iste eaque? Placeat quaerat,
            voluptates possimus numquam voluptate sapiente eos odio nihil! Natus
            ducimus adipisci, dolores nam id quia exercitationem nihil quibusdam
            minima itaque, eaque repellendus, quaerat obcaecati? Vel, possimus
            commodi rem eos sunt quo. Dolorem fugit, obcaecati in officia quia
            debitis perferendis consectetur porro odit! In ipsa quo culpa non!
            Doloribus, perspiciatis. Culpa similique dolor, vitae earum
            veritatis quo consequatur minima rem sed voluptas ipsam beatae error
            recusandae iste fugiat qui veniam a soluta inventore repudiandae
            laboriosam? Nam, impedit? Omnis modi dolorum doloremque excepturi ex
            doloribus nulla facilis amet, adipisci facere sed deleniti incidunt
            voluptatem odio iste sit recusandae qui ut assumenda enim vitae
            perferendis ab libero ipsam? Possimus et eum incidunt, quidem ipsa
            quo libero aliquam atque odit. Dolorem, iure. Soluta eum quaerat
            quidem, obcaecati doloribus delectus fugit non. Voluptatem soluta
            inventore provident explicabo sed. Aliquid non eos obcaecati minima?
            Magni maiores repellat molestias odio nostrum voluptas vitae ea,
            dolore sequi doloremque aspernatur, pariatur quas, non error nobis?
            Sunt autem sed magni nihil. Reiciendis illo odit explicabo vero fuga
            cumque sapiente dolore ullam unde minus veniam nostrum dolorum,
            mollitia provident modi, ipsam delectus, ut enim! Veniam ullam
            eveniet eum placeat quisquam, impedit accusamus fugit ad illum quis
            reprehenderit nisi quo in explicabo aperiam, rem incidunt. Possimus
            hic, vel perferendis pariatur fugiat veniam ea sequi laborum
            deserunt velit voluptatibus, ducimus earum repellat cum illum quod
            ipsam error quia dicta, recusandae distinctio debitis? Id nisi,
            repudiandae itaque sed, natus, magni fugiat quo odio eveniet tempora
            saepe maiores consequuntur? Impedit, nobis. Rerum consequatur
            similique expedita debitis illum excepturi nostrum architecto natus,
            recusandae aliquid amet incidunt officia, reprehenderit in
            distinctio, laboriosam doloribus quidem placeat earum laborum quo et
            enim? Iusto voluptatum
          </Box>
        </>
      </Modal>

      {
          isLoadingHere===1 &&  <CircularProgress />
      }
      
    </>
  );
};

export default CheckoutForm;
