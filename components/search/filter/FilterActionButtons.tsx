import { useDogSearch } from "@/contexts/DogContext";
import React from "react";

const FilterActionButtons = ({
  setClearFiltersClicked,
  searchDogs,
  loading,
}: {
  setClearFiltersClicked: (clearFiltersClicked: boolean) => void;
  searchDogs: () => void;
  loading: boolean;
}) => {
  const {
    setSelectedBreeds,
    setAgeMin,
    setAgeMax,
    setZipCodes,
    setCity,
    setState,
  } = useDogSearch();
  return (
    <div className="flex gap-4 items-end justify-end w-full">
      <button
        onClick={() => {
          setSelectedBreeds([]);
          setAgeMin("");
          setAgeMax("");
          setCity("");
          setState("");
          setZipCodes("");
          setClearFiltersClicked(true);
        }}
        className="flex-1 bg-black hover:bg-black/80 hover:transition-all hover:duration-300 text-white px-4 py-2 rounded cursor-pointer hover:shadow-lg h-10"
        disabled={loading}
      >
        Clear Filters
      </button>
      <button
        onClick={searchDogs}
        className="flex-1 bg-orange-700 hover:bg-orange-600 hover:transition-all hover:duration-300 text-white px-4 py-2 rounded cursor-pointer hover:shadow-lg h-10"
        disabled={loading}
      >
        Search
      </button>
    </div>
  );
};

export default FilterActionButtons;
