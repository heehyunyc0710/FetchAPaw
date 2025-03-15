export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface SearchResults {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export interface ILocation {
  city: string;
  county: string;
  latitude: number;
  longitude: number;
  state: string;
  zip_code: string;
}
