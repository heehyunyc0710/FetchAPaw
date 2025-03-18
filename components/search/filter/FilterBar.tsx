import { ILocation, ILocationSearchParams } from "@/types";
import { useEffect, useState } from "react";
import { searchLocations } from "../../../utils/getData";
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
    zipCodes,
    setZipCodes,
  } = useDogSearch();
  const [open, setOpen] = useState(false);
  const [clearFiltersClicked, setClearFiltersClicked] = useState(false);

  useEffect(() => {
    if (clearFiltersClicked) {
      searchDogs();
      setClearFiltersClicked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearFiltersClicked]);

  useEffect(() => {
    const fetchLocations = async (zipCodes: string) => {
      if (!city && !state) return;
      setZipCodes("");

      try {
        const params: ILocationSearchParams = {};
        if (city) params.city = city;
        if (state) params.states = [state];

        const response = await searchLocations(params);
        console.log("response000", response);

        if (response.results.length > 0) {
          const zipCodesResponse = response.results
            .map((location: ILocation) => location.zip_code)
            .join(",");
          if (zipCodes) {
            setZipCodes(zipCodes);
          } else {
            setZipCodes(zipCodesResponse);
          }
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    if (!open) fetchLocations(zipCodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, state, open]);

  useEffect(() => {
    if (!city && !state) setZipCodes("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, state]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBreeds(breeds);
    } else {
      setSelectedBreeds([]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
      {/* Breed filter */}
      <div>
        <h2 className="font-semibold mb-2">Breeds</h2>
        <BreedList
          breeds={breeds}
          selectedBreeds={selectedBreeds}
          setSelectedBreeds={setSelectedBreeds}
          handleSelectAll={handleSelectAll}
        />
      </div>

      {/* location filter */}
      <LocationFilter open={open} setOpen={setOpen} />

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
