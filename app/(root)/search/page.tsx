"use client";
import BreedList from "@/components/dogs/BreedList";
import DogInfoCard from "@/components/dogs/DogInfoCard";
import { MatchDialog } from "@/components/dogs/MatchDialog";
import { useDogSearch } from "@/contexts/DogContext";
import { Dog, SearchResults } from "@/types";
import {
  fetchDogBreeds,
  fetchDogMatch,
  fetchDogs,
  handleDogSearch,
} from "@/utils/getData";
import { motion } from "framer-motion";
import { Bone, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDebounce } from "@/utils/hooks/useDebounce";

const Search = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState<string>("");
  const [ageMin, setAgeMin] = useState<string>("");
  const [ageMax, setAgeMax] = useState<string>("");
  const [size, setSize] = useState<string>("25");
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("breed:asc");

  const [matchResult, setMatchResult] = useState<Dog | null>(null);
  const router = useRouter();
  const [from, setFrom] = useState<number>(0);
  const { dogs, setDogs } = useDogSearch();
  const { favorites, setFavorites } = useDogSearch();

  // Debounce the search inputs
  const debouncedBreeds = useDebounce(selectedBreeds, 1000);
  const debouncedZipCodes = useDebounce(zipCodes, 1000);
  const debouncedAgeMin = useDebounce(ageMin, 1000);
  const debouncedAgeMax = useDebounce(ageMax, 1000);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBreeds(breeds);
    } else {
      setSelectedBreeds([]);
    }
  };
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

  useEffect(() => {
    const handleClickOutside = async (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    <div className="container mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center items-center w-full my-10">
          <h1 className="text-3xl font-bold mb-6">Find Your Perfect Dog</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Breed filter */}
          <div>
            <h2 className="font-semibold mb-2">Breeds</h2>
            <BreedList
              breeds={breeds}
              selectedBreeds={selectedBreeds}
              setSelectedBreeds={setSelectedBreeds}
              handleSelectAll={handleSelectAll}
              selectOpen={selectOpen}
              setSelectOpen={setSelectOpen}
              selectRef={selectRef as React.RefObject<HTMLDivElement>}
            />
          </div>

          {/* Zip codes filter */}
          <div>
            <h2 className="font-semibold mb-2">Zip Codes</h2>
            <input
              type="text"
              value={zipCodes}
              onChange={(e) => setZipCodes(e.target.value)}
              placeholder="Comma-separated zip codes"
              className="w-full p-2 border rounded h-[40px] border-yellow-300 bg-white/70 text-sm "
            />
          </div>

          {/* Age range filters */}
          <div>
            <h2 className="font-semibold mb-2">Age Range</h2>
            <div className="flex gap-2">
              <input
                type="number"
                value={ageMin}
                min={0}
                onChange={(e) => setAgeMin(e.target.value)}
                placeholder="Min age"
                className="w-full p-2 border rounded h-[40px] border-yellow-300 bg-white/70 text-sm "
              />
              <input
                type="number"
                value={ageMax}
                min={0}
                max={30}
                onChange={(e) => setAgeMax(e.target.value)}
                placeholder="Max age"
                className="w-full p-2 border rounded h-[40px] border-yellow-300 bg-white/70 text-sm "
              />
            </div>
          </div>

          {/* Results size */}
          <div>
            <h2 className="font-semibold mb-2">Results per page</h2>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full p-2 border rounded h-[40px] border-yellow-300 bg-white/70 text-sm cursor-pointer"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedBreeds([]);
            setZipCodes("");
            setAgeMin("");
            setAgeMax("");
            setSize("25");
            searchDogs();
          }}
          className="bg-white/50 text-zinc-700 px-4 py-2 rounded mb-8 cursor-pointer border border-yellow-600 hover:text-black "
          disabled={loading}
        >
          Clear Filters
        </button>
        {/* Pagination */}
        {searchResults && (
          <div className="flex gap-4 mb-6 items-center justify-between w-full">
            <div>
              <button
                onClick={generateMatch}
                disabled={favorites.length === 0}
                className={` bg-orange-500 text-white px-4 py-2 rounded disabled:opacity-50  ${
                  favorites.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                View Match ({favorites.length})
              </button>
              <button
                onClick={() => setFavorites([])}
                disabled={favorites.length === 0}
                className={`ml-4 bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50  ${
                  favorites.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Clear Favorites
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm ">Sort by</p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-white border-yellow-300 rounded h-[40px] px-2 cursor-pointer"
              >
                <option value="breed:asc">Breed (A-Z)</option>
                <option value="breed:desc">Breed (Z-A)</option>
                <option value="age:asc">Age (Youngest first)</option>
                <option value="age:desc">Age (Oldest first)</option>
                <option value="name:asc">Name (A-Z)</option>
                <option value="name:desc">Name (Z-A)</option>
              </select>
            </div>
          </div>
        )}
      </motion.div>

      {/* Dog results grid */}
    <div className="w-full h-[50vh]">
    {loading ? (
        <div className="text-center w-full  flex justify-center items-center fixed top-[60%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <Bone className="text-yellow-500  fill-current z-5 animate-pulse mr-2" /> 
          <p className="text-md">Loading...</p>
        </div>
      ) : (
        <motion.div
        
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {!dogs.length ? (
            <p className="text-center py-8">No dogs found</p>
          ) : (
            <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[500px]">
            {dogs.map((dog, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                key={index}
                onClick={() => handleViewDog(dog.id)}
                className="dog-card relative bg-white/70 p-4 rounded-lg border border-transparent hover:border-yellow-300 transition-all duration-300 cursor-pointer"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(dog.id);
                  }}
                  className="absolute top-2 right-2 bg-white border border-yellow-500 rounded-full p-2 cursor-pointer transition-all duration-300 z-10"
                >
                  {favorites.includes(dog.id) ? (
                    <Heart className="text-red-500 fill-current z-5" />
                  ) : (
                    <Heart className="text-yellow-500 fill-current z-5" />
                  )}
                </button>
                <DogInfoCard dog={dog} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    )}
    </div>
      {!loading && searchResults && searchResults.total > 0 && (
        <div className="flex gap-4 items-center w-full justify-center mb-10">
          <button
            onClick={() => handlePagination("prev")}
            disabled={!searchResults.prev}
            className="bg-yellow-500 text-zinc-700 px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>

          <span>
            {from + 1} - {Math.min(from + parseInt(size), searchResults.total)}{" "}
            of {searchResults.total}
          </span>

          <button
            onClick={() => handlePagination("next")}
            disabled={!searchResults.next}
            className="bg-yellow-500 text-zinc-700 px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}

      {!loading && matchResult && (
        <MatchDialog dog={matchResult} onClose={() => setMatchResult(null)} />
      )}
    </div>
  );
};

export default Search;
