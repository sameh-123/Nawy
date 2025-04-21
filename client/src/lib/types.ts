export interface Apartment {
  _id: string;
  unitName: string;
  unitNumber: number;
  project: string;
  location: string;
  description?: string;
  area: number;
  price: number;
  bedRooms: number;
  bathRooms: number;
  images: string[];
}

export interface Query {
  page: string;
  priceFrom: string;
  priceTo: string;
  areaFrom: string;
  areaTo: string;
  unitName: string;
  unitNumber: string;
  project: string;
}
