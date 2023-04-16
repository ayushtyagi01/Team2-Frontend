import * as yup from "yup";

export const BilingSchema = yup.object().shape({
  FirstName: yup.string().trim().notOneOf([''],"First Name cannot be empty"),
  "MailingAddress 1": yup.string().trim().notOneOf([''],"Address cannot be empty"),
  
  City: yup.string().trim().notOneOf([""],"City is required"),
  Zip: yup.string().matches(/^\d{5,6}$/, "Please enter a valid Zip Code"),
  Phone: yup
    .string()
    .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  Email: yup
    .string()
    .email()
    .matches(/@[^.]*\./, "Please enter a valid email")
    .matches(/^(?!.*@[^,]*,)/, "Please enter a valid email"),
});