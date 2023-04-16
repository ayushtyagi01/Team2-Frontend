import * as yup from "yup";

export const PaymentSchema = yup.object().shape({
  CardName: yup
    .string()
    .matches(/^\d{15,16}$/, "Please enter a valid Card Name"),
  ExpMM: yup.string()
  .matches(/^(0[1-9]|1[0-2])$/, "Please enter a valid expiry month"),
  ExpYY: yup
    .string()
    .matches(/^\d{4}$/, "Please enter a valid expiry year")
    .test(
      "expiryYear",
      "Expiry year must be greater than current year",
      function (value) {
        const currentYear = new Date().getFullYear();
        const expiryYear = parseInt(value!, 10);
        return expiryYear >= currentYear;
      }
    ),
  CVV: yup.string().matches(/^\d{3,4}$/, "Please enter a valid CVV Code"),
  Terms:yup.boolean().oneOf([true], 'Please agree to Terms and Conditions'),
});
