import * as yup from "yup";

export const TravellerSchema = yup.object().shape({
  FirstName: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Z]+$/,
      "First name must only contain alphabetic characters"
    )
    .required("First name is required"),
  LastName: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Z]*$/,
      "Last name must only contain alphabetic characters"
    ),
  Phone: yup
    .string()
    .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  Email: yup
    .string()
    .email()
    .matches(/@[^.]*\./, "Please enter a valid email")
    .matches(/^(?!.*@[^,]*,)/, "Please enter a valid email"),
});
