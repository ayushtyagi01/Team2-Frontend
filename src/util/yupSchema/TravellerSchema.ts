import * as yup from "yup";

export const TravellerSchema = yup.object().shape({
  FirstName: yup.string().trim().notOneOf([''],"First Name cannot be empty"),
  Phone: yup
    .string()
    .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  Email: yup
    .string()
    .email()
    .matches(/@[^.]*\./, "Please enter a valid email")
    .matches(/^(?!.*@[^,]*,)/, "Please enter a valid email"),
});
