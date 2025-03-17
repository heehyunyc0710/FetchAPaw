"use client";
import FavoritesActions from "@/components/dogs/FavoritesActions";
import FilterBar from "@/components/dogs/FilterBar";
import { MatchDialog } from "@/components/dogs/MatchDialog";
import SearchResult from "@/components/dogs/SearchResult";
import SortBy from "@/components/dogs/SortBy";
import { useDogSearch } from "@/contexts/DogContext";
import { IDog, ISearchResults } from "@/types";
import {
  fetchDogBreeds,
  fetchDogMatch,
  fetchDogs,
  handleDogSearch,
} from "@/utils/getData";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState<string>("");

  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [ageMin, setAgeMin] = useState<string>("");
  const [ageMax, setAgeMax] = useState<string>("");
  const [size, setSize] = useState<string>("25");
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

  // function toget dogs by ids and update the dogs state
  const fetchDogsByIds = async (resultIds: string[]) => {
    if (resultIds.length > 0) {
      const dogsResponse = await fetchDogs({
        dogIds: resultIds,
      });
      setDogs(dogsResponse);
    } else {
      setDogs([]);
    }
  };

  // function to search dogs
  const searchDogs = async () => {
    console.log("zipcodes", zipCodes);

    setLoading(true);
    try {
      const params = new URLSearchParams();

      params.set("sort", sort);
      params.set("from", from.toString());
      params.set("size", size);

      if (selectedBreeds.length > 0) {
        selectedBreeds.forEach((breed) => {
          params.append("breeds", breed);
        });
      }

      if (zipCodes) {
        
        zipCodes.split(",").forEach((zip) => {
          params.append("zipCodes", zip.trim());
        });
      }

      if (ageMin) params.append("ageMin", ageMin);
      if (ageMax) params.append("ageMax", ageMax);
      console.log("params", params.toString());
      const searchResponse = await handleDogSearch(params.toString());
      setSearchResults(searchResponse);
      console.log("searchResponse", searchResponse);

      fetchDogsByIds(searchResponse.resultIds);
    } catch (error) {
      console.error("Error searching dogs:", error);
    } finally {
      setLoading(false);
    }
  };
  // load dogs when sort
  useEffect(() => {
    searchDogs();
  }, [sort, from]);

  // load dogs when page loads
  useEffect(() => {
    const fetchAllDogs = async () => {
      const params = new URLSearchParams();

      const response = await handleDogSearch(params.toString());
      setSearchResults(response);

      fetchDogsByIds(response?.resultIds);
    };
    fetchAllDogs();
  }, []);

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
        {/* clear and search buttons */}
        <div className="flex gap-4 mb-6 items-center justify-start w-full">
          <button
            onClick={() => {
              setSelectedBreeds([]);
              setZipCodes("");
              setAgeMin("");
              setAgeMax("");
              setSize("25");
              searchDogs();
              setCity("");
              setState("");
            }}
            className="bg-black/80 text-white px-4 py-2 rounded mb-8 cursor-pointer  hover:shadow-lg "
            disabled={loading}
          >
            Clear Filters
          </button>
          <button
            onClick={searchDogs}
            className="bg-orange-600 text-white px-4 py-2 rounded mb-8 cursor-pointer  hover:shadow-lg "
            disabled={loading}
          >
            Search
          </button>
        </div>

        {/* match and clear favorites */}
        {searchResults && (
          <div className="flex gap-4 mb-6 items-center justify-between w-full">
            <FavoritesActions
              favorites={favorites}
              generateMatch={generateMatch}
              setFavorites={setFavorites}
            />
            {/* sort by */}
            <SortBy sort={sort} setSort={setSort} />
          </div>
        )}
      </motion.div>

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
