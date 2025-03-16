"use client";
import { IDog } from "@/types";
import { createContext, useContext, useState } from "react";

interface DogSearchContextProps {
  dogs: IDog[];
  setDogs: React.Dispatch<React.SetStateAction<IDog[]>>;

  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
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

  return (
    <DogSearchContext.Provider
      value={{ dogs, setDogs, favorites, setFavorites }}
    >
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
