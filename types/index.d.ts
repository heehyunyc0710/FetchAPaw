export interface IDog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface ISearchResults {
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

export interface IAuthContext {
  user: { name: string; email: string } | null;
  login: (username: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface ILocationSearchParams {
  city?: string;
  states?: string[];
  geoBoundingBox?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    bottom_left?: { lat: number; lon: number };
    top_right?: { lat: number; lon: number };
  };
  size?: number;
  from?: number;
}

