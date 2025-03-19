import { useEffect, useState } from "react";
import BreedList from "./BreedFilter";

import { useDogSearch } from "@/contexts/DogContext";
import AgeFilter from "./AgeFilter";
import FilterActionButtons from "./FilterActionButtons";
import LocationFilter from "./LocationFilter";
const FilterBar = ({
  loading,
  searchDogs,
}: {
  loading: boolean;
  searchDogs: () => void;
}) => {
  const {
    breeds,
    selectedBreeds,
    setSelectedBreeds,
    city,
    state,

    setZipCodes,
  } = useDogSearch();

  const [clearFiltersClicked, setClearFiltersClicked] = useState(false);

  useEffect(() => {
    if (clearFiltersClicked) {
      searchDogs();
      setClearFiltersClicked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearFiltersClicked]);

  useEffect(() => {
    if (!city && !state) setZipCodes("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, state]);

  const clearFilter = () => {
   
      setSelectedBreeds([]);
    
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
      {/* Breed filter */}
      <div>
        <h2 className="font-semibold mb-2">Breeds</h2>
        <BreedList
          breeds={breeds}
          selectedBreeds={selectedBreeds}
          setSelectedBreeds={setSelectedBreeds}
          clearFilter={clearFilter}
        />
      </div>

      {/* location filter */}
      <LocationFilter />

      {/* Age range filters */}
      <AgeFilter loading={loading} />
      {/* search and clear filters button */}
      <FilterActionButtons
        setClearFiltersClicked={setClearFiltersClicked}
        searchDogs={searchDogs}
        loading={loading}
      />
    </div>
  );
};

export default FilterBar;
