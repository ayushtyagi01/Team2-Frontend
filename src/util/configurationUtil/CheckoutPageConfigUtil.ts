export const checkoutPageConfigUtil = {
  INFO: [
    {
      title: "1. Traveler Info",
      inputs: [
        [
          {
            label: "First Name",
            type: "text",
            present: false,
          },
          {
            label: "Middle Name",
            type: "text",
            present: false,
          },
          {
            label: "Last Name",
            type: "text",
            present: false,
          },
        ],
        [
          {
            label: "Phone",
            type: "text",
            present: false,
          },
        ],
        [
          {
            label: "Email",
            type: "text",
            present: false,
          },
        ],
      ],
      previous: "",
      next: "NEXT:BILLING INFO",
    },
    {
      title: "2. Billing Info",
      inputs: [
        [
          {
            label: "First Name",
            type: "text",
            present: false,
          },
          {
            label: "Middle Name",
            type: "text",
            present: false,
          },
          {
            label: "Last Name",
            type: "text",
            present: false,
          },
        ],
        [
          {
            label: "Mailing Address 1",
            type: "text",
            present: false,
          },
          {
            label: "Mailing Address 2",
            type: "text",
            present: false,
          },
        ],
        [
          {
            label: "Country",
            type: "select",
            present: false,
          },
        ],
        [
          {
            label: "State",
            type: "select",
            present: false,
          },
          {
            label: "City",
            type: "text",
            present: false,
          },
          {
            label: "Zip",
            type: "text",
            present: false,
          },
        ],
        [
          {
            label: "Phone",
            type: "text",
            present: false,
          },
        ],
        [
          {
            label: "Email",
            type: "text",
            present: false,
          },
        ],
      ],
      previous: "Edit Traveller Info",
      next: "NEXT:PAYMENT INFO",
    },
    {
      title: "3. Payment Info",
      inputs: [
        [
          {
            label: "Card Name",
            type: "text",
            present: false,
          },
          {
            label: "Exp MM",
            type: "text",
            present: false,
          },
          {
            label: "Exp YY",
            type: "text",
            present: false,
          },
        ],
        [
          {
            label: "CVV",
            type: "text",
            present: false,
          },
        ],
      ],
      previous: "Edit Billing Info",
      next: "PURCHASE",
    },
  ],
};
