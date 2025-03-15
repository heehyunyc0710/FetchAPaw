"use client";
import { Dog } from "@/types";
import { createContext, useContext, useState } from "react";

interface DogSearchContextProps {
  dogs: Dog[];
  setDogs: (dogs: Dog[]) => void;

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
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
 



  return (
    <DogSearchContext.Provider
      value={{ dogs, setDogs,  favorites, setFavorites }}
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
