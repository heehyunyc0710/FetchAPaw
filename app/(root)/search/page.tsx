"use client";
import FilterBar from "@/components/dogs/FilterBar";
import { MatchDialog } from "@/components/dogs/MatchDialog";
import SearchResult from "@/components/dogs/SearchResult";
import SearchResultHeader from "@/components/dogs/SearchResultHeader";
import SortBy from "@/components/dogs/SortBy";
import { useDogSearch } from "@/contexts/DogContext";
import { IDog, ISearchResults } from "@/types";
import {
  fetchDogBreeds,
  fetchDogMatch,
  fetchDogs,
  handleDogSearch,
} from "@/utils/getData";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Search = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState<string>("");
 
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [ageMin, setAgeMin] = useState<string>("");
  const [ageMax, setAgeMax] = useState<string>("");
  const [size, setSize] = useState<string>("25");
  // const [selectOpen, setSelectOpen] = useState<boolean>(false);
  // const selectRef = useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState<ISearchResults | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("breed:asc");

  const [matchResult, setMatchResult] = useState<IDog | null>(null);
  const router = useRouter();
  const [from, setFrom] = useState<number>(0);
  const { dogs, setDogs } = useDogSearch();
  const { favorites, setFavorites } = useDogSearch();

  // Debounce the search inputs
  const debouncedBreeds = useDebounce(selectedBreeds, 1000);
  const debouncedZipCodes = useDebounce(zipCodes, 1000);
  const debouncedAgeMin = useDebounce(ageMin, 1000);
  const debouncedAgeMax = useDebounce(ageMax, 1000);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const breeds = await fetchDogBreeds();
        setBreeds(breeds.sort((a: string, b: string) => a.localeCompare(b)));
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };
    getBreeds();
  }, []);

  const searchDogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      params.set("sort", sort);
      params.set("from", from.toString());
      params.set("size", size);

      if (debouncedBreeds.length > 0) {
        debouncedBreeds.forEach((breed) => {
          params.append("breeds", breed);
        });
      }

      if (debouncedZipCodes) {
        debouncedZipCodes.split(",").forEach((zip) => {
          params.append("zipCodes", zip.trim());
        });
      }

      if (debouncedAgeMin) params.append("ageMin", debouncedAgeMin);
      if (debouncedAgeMax) params.append("ageMax", debouncedAgeMax);

      const searchResponse = await handleDogSearch(params.toString());
      setSearchResults(searchResponse);
      console.log("searchResponse", searchResponse);

      if (searchResponse.resultIds.length > 0) {
        const dogsResponse = await fetchDogs({
          dogIds: searchResponse.resultIds,
        });

        setDogs(dogsResponse);
      } else {
        setDogs([]);
      }
    } catch (error) {
      console.error("Error searching dogs:", error);
    } finally {
      setLoading(false);
    }
  }, [
    debouncedBreeds,
    debouncedZipCodes,
    debouncedAgeMin,
    debouncedAgeMax,
    from,
    size,
    sort,
    setDogs,
  ]);

  useEffect(() => {
    searchDogs();
  }, [
    debouncedBreeds,
    debouncedZipCodes,
    debouncedAgeMin,
    debouncedAgeMax,
    from,
    size,
    sort,
    searchDogs,
  ]);

  // useEffect(() => {
  //   const handleClickOutside = async (event: MouseEvent) => {
  //     if (
  //       selectRef.current &&
  //       !selectRef.current.contains(event.target as Node)
  //     ) {
  //       setSelectOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [from]);

  const handlePagination = (direction: "prev" | "next") => {
    if (!searchResults) return;

    const nextFrom =
      direction === "next"
        ? searchResults.next?.split("from=")[1]?.split("&")[0]
        : searchResults.prev?.split("from=")[1]?.split("&")[0];

    if (nextFrom) {
      setFrom(parseInt(nextFrom, 10));
    }
  };

  const toggleFavorite = (dogId: string) => {
    setFavorites((prev: string[]) =>
      prev.includes(dogId)
        ? prev.filter((id: string) => id !== dogId)
        : [...prev, dogId]
    );
  };

  const generateMatch = async () => {
    try {
      const response = await fetchDogMatch({ favorites });

      // Fetch matched dog details
      const matchResponse = await fetchDogs({ dogIds: [response.match] });

      setMatchResult(matchResponse[0]);
    } catch (error) {
      console.error("Error generating match:", error);
    }
  };

  const handleViewDog = async (dogId: string) => {
    router.push(`/dogs/${dogId}`);
  };

  return (
    <div className="container mx-auto p-4 h-[fit-content] overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center items-center w-full my-10">
          <h1 className="text-3xl font-bold mb-6">Find Your Perfect Dog</h1>
        </div>
        {/* filter bar */}
        <FilterBar
          breeds={breeds}
          selectedBreeds={selectedBreeds}
          setSelectedBreeds={setSelectedBreeds}
          // selectOpen={selectOpen}
          // setSelectOpen={setSelectOpen}
          // selectRef={selectRef as React.RefObject<HTMLDivElement>}
          zipCodes={zipCodes}
          setZipCodes={setZipCodes}
        
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          ageMin={ageMin}
          setAgeMin={setAgeMin}
          ageMax={ageMax}
          setAgeMax={setAgeMax}
          size={size}
          setSize={setSize}
        />

        {(selectedBreeds.length > 0 || zipCodes || ageMin || ageMax) && (
          <button
            onClick={() => {
              setSelectedBreeds([]);
              setZipCodes("");
              setAgeMin("");
              setAgeMax("");
              setSize("25");
              searchDogs();
            }}
            className="bg-black/80 text-white px-4 py-2 rounded mb-8 cursor-pointer  hover:shadow-lg "
            disabled={loading}
          >
            Clear Filters
          </button>
        )}
        {/* match and clear favorites */}
        {searchResults && (
          <div className="flex gap-4 mb-6 items-center justify-between w-full">
            <div>
              {favorites?.length > 0 && (
                <>
                  <button
                    onClick={generateMatch}
                    disabled={favorites.length === 0}
                    className={` bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:shadow-lg  ${
                      favorites.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    View Match
                  </button>
                  <button
                    onClick={() => setFavorites([])}
                    disabled={favorites.length === 0}
                    className={`ml-4 bg-white/70 border border-orange-600 text-orange-600 px-4 py-2 rounded disabled:opacity-50 hover:shadow-lg  ${
                      favorites.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    Clear Favorites
                  </button>
                </>
              )}
            </div>
            {/* sort by */}
            <SortBy sort={sort} setSort={setSort} />
          </div>
        )}
      </motion.div>
      {!loading && (selectedBreeds.length > 0 || city || state || ageMin || ageMax || zipCodes) && (
        <div>
          <SearchResultHeader city={city} state={state} selectedBreeds={selectedBreeds} ageMin={ageMin} ageMax={ageMax} zipCodes={zipCodes}            />
        </div>
      )}
      {/* Dog results grid */}
      <SearchResult
        loading={loading}
        dogs={dogs}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        handleViewDog={handleViewDog}
        handlePagination={handlePagination}
        searchResults={searchResults as ISearchResults}
        from={from}
        size={size}
      />

      {!loading && matchResult && (
        <MatchDialog dog={matchResult} onClose={() => setMatchResult(null)} />
      )}
    </div>
  );
};

export default Search;
