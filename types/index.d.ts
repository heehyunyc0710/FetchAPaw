export interface IDog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogSearchContextProps {
  dogs: IDog[];
  setDogs: React.Dispatch<React.SetStateAction<IDog[]>>;

  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  from: number;
  setFrom: React.Dispatch<React.SetStateAction<number>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  ageMin: string;
  setAgeMin: React.Dispatch<React.SetStateAction<string>>;
  ageMax: string;
  setAgeMax: React.Dispatch<React.SetStateAction<string>>;
  breeds: string[];
  setBreeds: React.Dispatch<React.SetStateAction<string[]>>;
  zipCodes: string;
  setZipCodes: React.Dispatch<React.SetStateAction<string>>;
  selectedBreeds: string[];
  setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>;
  searchResults: ISearchResults | null;
  setSearchResults: React.Dispatch<React.SetStateAction<ISearchResults | null>>;
  matchResult: IDog | null;
  setMatchResult: React.Dispatch<React.SetStateAction<IDog | null>>;
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


export interface IFilterBarProps {
  breeds: string[];
  selectedBreeds: string[];
  setSelectedBreeds: (breeds: string[]) => void;
  city: string;
  setCity: (city: string) => void;
  state: string;
  setState: (state: string) => void;
  zipCodes: string;
  setZipCodes: (zipCodes: string) => void;
  ageMin: string;
  setAgeMin: (ageMin: string) => void;
  ageMax: string;
  setAgeMax: (ageMax: string) => void;
  // size: string;
  // setSize: (size: string) => void;
}

export interface IMatchDialogProps {

  onClose: () => void;
}



export interface ISearchResultHeaderProps{
  city: string;
  state: string;
  selectedBreeds: string[];
  ageMin: string;
  ageMax: string;
  zipCodes: string;
  dogs: IDog[];
}

export interface IBreedListProps {
  breeds: string[];
  selectedBreeds: string[];
  setSelectedBreeds: (breeds: string[]) => void;
  handleSelectAll: (checked: boolean) => void;
}

export interface IFavoritesActionsProps {
  // favorites: string[]; 
  generateMatch: () => void;
  // setFavorites: (favorites: string[]) => void;
}

export interface IUser {
  name: string;
  email: string;
}

export interface HeroLeftProps {
  user: IUser | null;
  setLoginModalOpen: (open: boolean) => void;
}