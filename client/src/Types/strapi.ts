export interface Flight {
  id: number;
  documentId: string;
  attributes: {
    flightNumber: string;
    departureDate: string;
    arrivalDate: string;
    priceEconomy: number;
    priceBusiness: number;
    origin: {
      data: {
        id: number;
        attributes: {
          city: string;
          code: string;
          country: string;
        };
      };
    };
    destination: {
      data: {
        id: number;
        attributes: {
          city: string;
          code: string;
          country: string;
        };
      };
    };
  };
}

export interface Booking {
  id: number;
  attributes: {
    flight: { data: Flight };
    passengerDetails: any;
    status: "pending" | "confirmed" | "cancelled";
    totalPrice: number;
  };
}
