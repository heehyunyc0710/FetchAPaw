"use client";
import { IDog, ISearchResults } from "@/types";
import { createContext, useContext, useState, useMemo } from "react";

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

const DogSearchContext = createContext<DogSearchContextProps | undefined>(
  undefined
);

export const DogContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dogs, setDogs] = useState<IDog[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [size, setSize] = useState<string>("25");
  const [sort, setSort] = useState<string>("breed:asc");
  const [from, setFrom] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [ageMin, setAgeMin] = useState<string>("");
  const [ageMax, setAgeMax] = useState<string>("");
  const [breeds, setBreeds] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState<string>("");
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [searchResults, setSearchResults] = useState<ISearchResults | null>(null);
    const [matchResult, setMatchResult] = useState<IDog | null>(null);
  
  const value = useMemo(
    () => ({
      dogs,
      setDogs,
      favorites,
      setFavorites,
      size,
      setSize,
      sort,
      setSort,
      from,
      setFrom,
      city,
      setCity,
      state,
      setState,
      ageMin,
      setAgeMin,
      ageMax,
      setAgeMax,
      breeds,
      setBreeds,
      zipCodes,
      setZipCodes,
      selectedBreeds,
      setSelectedBreeds,
      searchResults,
      setSearchResults,
      matchResult,
      setMatchResult,
    }),
    [
      dogs,
      favorites,
      size,
      sort,
      from,
      city,
      state,
      ageMin,
      ageMax,
      breeds,
      zipCodes,
      selectedBreeds,
      searchResults,
      setSearchResults,
      matchResult,
      setMatchResult,
    ]
  );

  return (
    <DogSearchContext.Provider value={value}>
      {children}
    </DogSearchContext.Provider>
  );
};

export const useDogSearch = () => {
  const context = useContext(DogSearchContext);
  if (!context) {
    throw new Error("useDogSearch must be used within a DogContextProvider");
  }
  return context;
};
