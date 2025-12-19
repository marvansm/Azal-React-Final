export interface Location {
  id: number;
  documentId?: string;
  city: string;
  code: string;
  country: string;
}

export interface Flight {
  id: number;
  documentId: string;
  flightNumber: string;
  departureDate: string;
  arrivalDate: string;
  priceEconomy: number;
  priceBusiness: number;
  origin: Location;
  destination: Location;
  // Support for legacy Strapi 4 structure if needed during transition
  attributes?: any;
}

export interface Booking {
  id: number;
  flight: Flight;
  passengerDetails: any;
  status: "pending" | "confirmed" | "cancelled";
  totalPrice: number;
  attributes?: any;
}
