"use client";
import { DogSearchContextProps, IDog, ISearchResults } from "@/types";
import { createContext, useContext, useState, useMemo } from "react";


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
    const [favoritedDogs, setFavoritedDogs] = useState<IDog[]>([]);
    const [zipCodeLoading, setZipCodeLoading] = useState<boolean>(false);
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
      favoritedDogs,
      setFavoritedDogs,
      zipCodeLoading,
      setZipCodeLoading,
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
      favoritedDogs,
      setFavoritedDogs,
      zipCodeLoading,
      setZipCodeLoading,
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
