export const checkoutPageConfigUtil = {
  INFO: [
    {
      title: "1. Traveler Info",
      inputs: [
        [
          {
            label: "First Name",
            type: "text",
            present: true,
          },
          {
            label: "Middle Name",
            type: "text",
            present: true,
          },
          {
            label: "Last Name",
            type: "text",
            present: true,
          },
        ],
        [
          {
            label: "Phone",
            type: "text",
            present: true,
          },
        ],
        [
          {
            label: "Email",
            type: "text",
            present: true,
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
            present: true,
          },
          {
            label: "Middle Name",
            type: "text",
            present: true,
          },
          {
            label: "Last Name",
            type: "text",
            present: true,
          },
        ],
        [
          {
            label: "Mailing Address 1",
            type: "text",
            present: true,
          },
          {
            label: "Mailing Address 2",
            type: "text",
            present: true,
          },
        ],
        [
          {
            label: "Country",
            type: "select",
            present: true,
          },
        ],
        [
          {
            label: "State",
            type: "select",
            present: true,
          },
          {
            label: "City",
            type: "text",
            present: true,
          },
          {
            label: "Zip",
            type: "text",
            present: true,
          },
        ],
        [
          {
            label: "Phone",
            type: "text",
            present: true,
          },
        ],
        [
          {
            label: "Email",
            type: "text",
            present: true,
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
            present: true,
          },
          {
            label: "Exp MM",
            type: "text",
            present: true,
          },
          {
            label: "Exp YY",
            type: "text",
            present: true,
          },
        ],
        [
          {
            label: "CVV",
            type: "text",
            present: true,
          },
        ],
      ],
      previous: "Edit Billing Info",
      next: "PURCHASE",
    },
  ],
};
