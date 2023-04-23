export const LandingPageConfigUtil = {
  propertyName: 2,
  headerLogo:
    "https://team2-configuration.s3.ap-south-1.amazonaws.com/hotel-1/header-logo.png",
  pageTitle: "Internet Booking Engine",
  bannerImage:
    "https://team2-configuration.s3.ap-south-1.amazonaws.com/hotel-1/banner-image.jpg",
  maxLengthOfStay: 14,
  typeOfGuest: {
    adult: {
      title: "Adult",
      min: 1,
      max: 3,
      exists: "true",
      minAge: "18 years",
    },
    children: {
      title: "Children",
      min: 0,
      max: 2,
      exists: "true",
      maxAge: "0-12 years",
    },
  },
  rooms: "true",
  accessibility: ["wheelchair"],
  availableTypeOfGuests: ["adult", "children"],
};
