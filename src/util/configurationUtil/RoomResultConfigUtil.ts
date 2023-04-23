export const roomResultConfig = {
  sortType: [
    {
      sortValue: "Price",
      value: "Price Low",
      sortOrder: "ASC",
      present:false
    },
    {
      sortValue: "Price",
      value: "Price High",
      sortOrder: "DESC",
      present:false
    },
    {
      sortValue: "Rating",
      value: "Rating Low",
      sortOrder: "ASC",
      present:false
    },
    {
      sortValue: "Rating",
      value: "Rating High",
      sortOrder: "DESC",
      present:false
    },
    {
      sortValue: "Area",
      value: "Area Low",
      sortOrder: "ASC",
      present:false
    },
    {
      sortValue: "Area",
      value: "Area High",
      sortOrder: "DESC",
      present:false
    },
    {
      sortValue: "Single_Bed_Count",
      value: "King Bed Count Low",
      sortOrder: "ASC",
      present:false
    },
    {
      sortValue: "Single_Bed_Count",
      value: "King Bed Count High",
      sortOrder: "DESC",
      present:false
    },
    {
      sortValue: "Double_Bed_Count",
      value: "Queen Bed Count Low",
      sortOrder: "ASC",
      present:false
    },
    {
      sortValue: "Double_Bed_Count",
      value: "Queen Bed Count High",
      sortOrder: "DESC",
      present:false
    },
    {
      sortValue: "Total_Bed_Count",
      value: "Total Bed Count Low",
      sortOrder: "ASC",
      present:false
    },
    {
      sortValue: "Total_Bed_Count",
      value: "Total Bed Count High",
      sortOrder: "DESC",
      present:false
    },
    {
      sortValue: "Room_Type_Name",
      value: "Name ASC",
      sortOrder: "ASC",
      present:false
    },
    {
      sortValue: "Room_Type_Name",
      value: "Name DESC",
      sortOrder: "DESC",
      present:false
    },
  ],
  filterTypes: [
    {
      filterTypeName: "Room_Type_Filter",
      value: "Room Type",
      maxAttributes: 2,
      filterOptions: ["Deluxe", "Suite"],
      present:false
    },
    {
      filterTypeName: "Bed_Type_Filter",
      value: "Bed Type",
      maxAttributes: 2,
      filterOptions: ["King", "Queen"],
      present:false
    },
    {
      filterTypeName: "Price_Type_Filter",
      value: "Price Range",
      maxAttributes: 2,
      filterOptions: ["Price 50-100", "Price 100-150"],
      present:false
    },
  ],
  taxes: [
    {
      name: "Resort Tax",
      factor: 0.6,
    },
    {
      name: "Occupancy Tax",
      factor: 0.4,
    },
  ],
  roomImages: [
    {
      roomTypeName: "STANDARD_SUITE",
      customeName: "STANDARD_SUITE",
      images: [
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_1_1.jpg",
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_1_2.jpg",
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_1_3.jpg",
      ],
      description:
        "The 29-story Skyrise Tower rooms are smoke free and feature everyday comfort in jewel tones. The 351 sq.ft rooms, located near the pools and the Adventuredome, feature pillow-top mattresses, flat screen TV and Wi-Fi internet access and two queen beds. Wheelchair accessible rooms are available upon request by calling Room Reservations (1-877-434-9175).",
      amnetieis: [
        "Wireless Internet Access",
        "Cable Pay and TV channel",
        "Alarm Clock",
        "In Room Safe",
        "Iron and Ironing Board",
        "Writing Desk and Chair",
        "Hair Dryer",
      ],
    },
    {
      roomTypeName: "GRAND_DELUXE",
      customeName: "GRAND_DELUXE",
      images: [
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_2_1.jpg",
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_2_2.jpg",
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_2_3.jpg",
      ],
      description:
        "Modern comfort meets functional design with smoke free rooms in the 35-story West Tower. The 364 sq.ft rooms located directly above the hotel lobby, with close proximity to the shopping promenade and the Adventuredome, feature contemporary furnishings, vibrant dÃ©cor, pillow-top mattresses, 32 inch flat panel plasma TV, and Wi-Fi internet access. Wheelchair accessible rooms are available upon request by calling Room Reservations (1-877-434-9175).",
      amnetieis: [
        "Wireless Internet Access",
        "Cable Pay and TV channel",
        "Alarm Clock",
        "In Room Safe",
        "Iron and Ironing Board",
      ],
    },
    {
      roomTypeName: "COUPLE_SUITE",
      customeName: "COUPLE_SUITE",
      images: [
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_3_1.jpg",
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_3_2.jpg",
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_2_3.jpg",
      ],
      description:
        "Modern comfort meets functional design smoke free rooms in the 35-story West Tower. The 364 sq.ft rooms located directly above the hotel lobby, with close proximity to the shopping promenade and the Adventuredome, feature contemporary furnishings, vibrant dÃ©cor, pillow-top mattresses, 32 inch flat panel plasma TV, Wi-Fi internet access. Wheelchair accessible rooms are available upon request by calling Room Reservations (1-877-434-9175).",
      amnetieis: [
        "Wireless Internet Access",
        "Cable Pay and TV channel",
        "Iron and Ironing Board",
        "Writing Desk and Chair",
        "Hair Dryer",
      ],
    },
    {
      roomTypeName: "GARDEN_SUITE",
      customeName: "GARDEN_SUITE",
      images: [
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_1_1.jpg",
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_1_2.jpg",
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_1_3.jpg",
      ],
      description:
        "Smoke free and decorated in contemporary jewel and earth tones, the 15-story Casino Tower rooms are located directly above the casino. The 364 sq.ft. Casino Tower rooms are appointed with classic furnishings and include pillow-top mattresses, 40 inch flat panel plasma TV and Wi-Fi internet access.",
      amnetieis: [
        "Wireless Internet Access",
        "Alarm Clock",
        "In Room Safe",
        "Iron and Ironing Board",
        "Writing Desk and Chair",
        "Hair Dryer",
      ],
    },
    {
      roomTypeName: "FAMILY_DELUXE",
      customeName: "FAMILY_DELUXE",
      images: [
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_2_1.jpg",
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_2_2.jpg",
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_2_3.jpg",
      ],
      description:
        "We have special dog-friendly rooms available for guests traveling with their dogs. Must select DOG Friendly room offer at the time of booking. Maximum of 2 dogs per room. Each dog may be no larger than 50lbs. Dog(s) may not be left unattended in the room. Service animals are always welcome. Modern comfort meets functional design with smoke free rooms in the 35-story West Tower. The 364 sq.ft rooms located directly above the hotel lobby. Wheelchair accessible rooms are available upon request by calling Room Reservations (1-877-434-9175).",
      amnetieis: [
        "Wireless Internet Access",
        "Cable Pay and TV channel",
        "In Room Safe",
        "Iron and Ironing Board",
        "Writing Desk and Chair",
        "Hair Dryer",
      ],
    },
    {
      roomTypeName: "SUPER_DELUXE",
      customeName: "SUPER_DELUXE",
      images: [
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_3_1.jpg",
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_3_2.jpg",
        "https://d1o2azog35xlg2.cloudfront.net/hotel-1/RoomResultsPage/room_type_2_3.jpg",
      ],
      description:
        "We have special dog-friendly rooms available for guests traveling with their dogs. Must select DOG Friendly room offer at the time of booking. Maximum of 2 dogs per room. Each dog may be no larger than 50lbs. Dog(s) may not be left unattended in the room. Service animals are always welcome. Modern comfort meets functional design with smoke free rooms in the 35-story West Tower. The 364 sq.ft rooms located directly above the hotel lobby. Wheelchair accessible rooms are available upon request by calling Room Reservations (1-877-434-9175).",
      amnetieis: [
        "Wireless Internet Access",
        "Cable Pay and TV channel",
        "Alarm Clock",
        "In Room Safe",
      ],
    },
  ],
};
