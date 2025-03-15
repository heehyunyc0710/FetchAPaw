"use client";
import BreedList from "@/components/dogs/BreedList";
import DogInfoCard from "@/components/dogs/DogInfoCard";
import { MatchDialog } from "@/components/dogs/MatchDialog";
import { Dog, SearchResults } from "@/types";
import axios from "axios";
import { motion } from "framer-motion";
import { Heart, SortAsc, SortDesc } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("breed:asc");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [matchResult, setMatchResult] = useState<Dog | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [from, setFrom] = useState<number>(0);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBreeds(breeds);
    } else {
      setSelectedBreeds([]);
    }
  };
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get<string[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/dogs/breeds`,
          { withCredentials: true }
        );
        setBreeds(
          response.data.sort((a: string, b: string) => a.localeCompare(b))
        );
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };
    fetchBreeds();
  }, []);

  const searchDogs = async () => {
 
    // setFrom(page * parseInt(size));
    setLoading(true);
    try {
      const params = new URLSearchParams();

      // Always include sort parameter
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

   
      // Update API call to use pagination and server-side sorting
      const searchResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dogs/search?${params.toString()}`,
        { withCredentials: true }
      );
      console.log("searchResponse", searchResponse.data);
      setSearchResults(searchResponse.data);

      if (searchResponse.data.resultIds.length > 0) {
        const dogsResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/dogs`,
          searchResponse.data.resultIds,
          { withCredentials: true }
        );
       
        setDogs(dogsResponse.data);
      }
    } catch (error) {
      console.error("Error searching dogs:", error);
    } finally {
      setLoading(false);
    }
  };
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
    searchDogs();
  }, [from, size, sort, selectedBreeds, zipCodes, ageMin, ageMax]);
  

  const handlePagination = (direction: "prev" | "next") => {
    if (!searchResults) return;
  
    const nextFrom = direction === "next" 
      ? searchResults.next?.split('from=')[1]?.split('&')[0] 
      : searchResults.prev?.split('from=')[1]?.split('&')[0];
  
    if (nextFrom) {
      setFrom(parseInt(nextFrom, 10));
    }
  };

  const toggleFavorite = (dogId: string) => {
    setFavorites((prev) =>
      prev.includes(dogId)
        ? prev.filter((id) => id !== dogId)
        : [...prev, dogId]
    );
  };

  const generateMatch = async () => {
    try {
      const response = await axios.post<{ match: string }>(
        `${process.env.NEXT_PUBLIC_API_URL}/dogs/match`,
        favorites,
        { withCredentials: true }
      );

      // Fetch matched dog details
      const matchResponse = await axios.post<Dog[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/dogs`,
        [response.data.match],
        { withCredentials: true }
      );

      setMatchResult(matchResponse.data[0]);
    } catch (error) {
      console.error("Error generating match:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-2xl font-bold mb-6">Find Your Perfect Dog</h1>

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
            selectRef={selectRef}
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
            className="w-full p-2 border rounded h-[40px] border-yellow-300 bg-white/70 text-sm "
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
          searchDogs();
        }}
        className=" text-zinc-700 px-4 py-2 rounded mb-8 cursor-pointer border bg-yellow-500 hover:text-black mr-2"
        disabled={loading}
      >
        Search
      </button>
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

      {/* Results count */}
      {searchResults && (
        <p className="mb-4">Found {searchResults.total} dogs</p>
      )}

      {/* Pagination */}
      {searchResults && (
        <div className="flex gap-4 mb-6 items-center justify-between">
          <div className="flex gap-4 items-center">
          <button
      onClick={() => handlePagination('prev')}
      disabled={!searchResults.prev}
      className="bg-yellow-500 text-zinc-700 px-4 py-2 rounded disabled:opacity-50"
    >
      Previous
    </button>

            <span>
      {from + 1} - {Math.min(from + parseInt(size), searchResults.total)} of {searchResults.total}
    </span>

    <button
      onClick={() => handlePagination('next')}
      disabled={!searchResults.next}
      className="bg-yellow-500 text-zinc-700 px-4 py-2 rounded disabled:opacity-50"
    >
      Next
    </button>

            <button
              onClick={generateMatch}
              disabled={favorites.length === 0}
              className="ml-4 bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              View Match ({favorites.length})
            </button>
          </div>
          <div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border-yellow-300 rounded h-[40px] px-2"
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

      {/* Dog results grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {dogs.map((dog) => (
          <div
            key={dog.id}
            className="dog-card relative bg-white/70 p-4 rounded-lg"
          >
            <button
              onClick={() => toggleFavorite(dog.id)}
              className="absolute top-2 right-2 z-10 bg-black/50 rounded-full p-2 cursor-pointer transition-all duration-300"
            >
              {favorites.includes(dog.id) ? (
                <Heart className="text-red-400 fill-current z-10" />
              ) : (
                <Heart className="text-white  fill-current z-10" />
              )}
            </button>
            <DogInfoCard dog={dog} />
          </div>
        ))}
      </motion.div>

      {dogs.length === 0 && !loading && (
        <p className="text-center py-8">No dogs found matching your criteria</p>
      )}

      {matchResult && (
        <MatchDialog dog={matchResult} onClose={() => setMatchResult(null)} />
      )}
    </motion.div>
  );
};

export default Search;
