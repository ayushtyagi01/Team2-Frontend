interface RoomTypeFilter {
  filterTypeName: string;
  maxAttributes: number;
  filterOptions: string[];
}

export interface RoomPostData {
  checkInDate: string;
  checkOutDate: string;
  propertyId: number;
  requiredRoomsCount: number;
  duration: number;
  requiredBedCount: number;
  pageNumber: number;
  sortType: {
    sortValue: string;
    sortOrder: string;
  };
  filterTypes: RoomTypeFilter[];
}

export const roomPostData: RoomPostData = {
  checkInDate: "2023-03-01T00:00:00Z",
  checkOutDate: "2023-03-14T00:00:00Z",
  propertyId: 2,
  requiredRoomsCount: 8,
  duration: 14,
  requiredBedCount: 1,
  pageNumber: 1,
  sortType: {
    sortValue: "Price",
    sortOrder: "DESC",
  },
  filterTypes: [
  //   {
  //     filterTypeName: "Room_Type_Filter",
  //     maxAttributes: 2,
  //     filterOptions: ["Deluxe", "Suite"],
  //   },
  //   {
  //     filterTypeName: "Bed_Type_Filter",
  //     maxAttributes: 2,
  //     filterOptions: ["Queen"]
  // },
  // {
  //     filterTypeName: "Price_Type_Filter",
  //     maxAttributes: 2,
  //     filterOptions: ["Price 50-100","Price 120-140"]
  // }
  ]
};
