import axios from "axios";

/**
 * Configuring Axios instance using the axios create method and passing the base Url of the interceptor.
 */
export const Axios = axios.create({
  baseURL: process.env.REACT_APP_LANDING_PAGE_URL,
});
export const ConfigAxios=axios.create({
  baseURL: process.env.REACT_APP_SENTRY_DSN,
});

export const CurrencyAxios=axios.create({
  baseURL: process.env.REACT_APP_CURRENCY_CONVERTOR_API,
});

/**
 * The interceptor adds an Authorization header with a JWT token from the current authenticated user's session to each outgoing request using an interceptor.
 */





