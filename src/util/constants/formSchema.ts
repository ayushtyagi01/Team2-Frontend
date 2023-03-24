import * as yup from "yup";

export const schema = yup.object().shape({
  property: yup.array().required(),
  startDate: yup.string().required(),
  endDate: yup.string().required(),
});
