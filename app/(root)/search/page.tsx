"use client";
import FavoritesActions from "@/components/search/match/FavoritesActions";
import FilterBar from "@/components/search/filter/FilterBar";
import { MatchDialog } from "@/components/search/match/MatchDialog";
import SearchResult from "@/components/search/SearchResult";
import SortBy from "@/components/search/SortBy";
import ViewBySize from "@/components/search/ViewBySize";
import { useDogSearch } from "@/contexts/DogContext";
import { fetchDogBreeds, fetchDogs, handleDogSearch } from "@/utils/getData";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Search = () => {

  const {
    setDogs,
    size,
    sort,
    from,
    ageMin,
    ageMax,
    setBreeds,
    zipCodes,
    selectedBreeds,
    searchResults,
    setSearchResults,
    matchResult,
  } = useDogSearch();

  const [loading, setLoading] = useState<boolean>(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function to get dogs by ids and update the dogs state
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

      const searchResponse = await handleDogSearch(params.toString());
      setSearchResults(searchResponse);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, from, size]);

  // load dogs when page loads
  useEffect(() => {
    const fetchAllDogs = async () => {
      const params = new URLSearchParams();

      const response = await handleDogSearch(params.toString());
      setSearchResults(response);

      fetchDogsByIds(response?.resultIds);
    };
    fetchAllDogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [from]);

  return (
    <div className="container mx-auto  p-4 px-0 h-[fit-content] overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center items-center w-full my-10">
          <h1 className="text-3xl font-bold mb-6">Find Your Perfect Dog</h1>
        </div>
        {/* filter bar */}
        <FilterBar loading={loading} searchDogs={searchDogs} />
   

        {/* match and clear favorites */}
        {searchResults && (
          <div className="flex gap-4 mb-6 items-center justify-between w-full">
            <FavoritesActions />
            <div className="flex gap-4 items-center">
              {/* View by number of results per page */}
              <ViewBySize />
              {/* sort by button */}
              <SortBy />
            </div>
          </div>
        )}
      </motion.div>

      {/* Dog results grid */}
      <SearchResult loading={loading} />

      {!loading && matchResult && <MatchDialog />}
    </div>
  );
};

export default Search;
