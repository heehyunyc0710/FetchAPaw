import React from 'react'
import DogInfoCard from './DogInfoCard'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Bone } from 'lucide-react'
import { ISearchResultProps } from '@/types'


const SearchResult = ({
  loading,
  dogs,
  favorites,
  toggleFavorite,
  handleViewDog,
  handlePagination,
  searchResults,
  from,
  size,
}: ISearchResultProps) => {
  
  return (
    <div className="w-full h-[50vh] min-h-[fit-content]">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[500px]">
                {dogs.map((dog, index) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    key={index}
                    onClick={() => handleViewDog(dog.id)}
                    className="dog-card relative bg-white p-6 rounded-lg border border-transparent hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(dog.id);
                      }}
                      className="absolute top-2 right-2 bg-white border border-yellow-500 rounded-full p-2 cursor-pointer transition-all duration-300 z-10   "
                    >
                      <Heart
                        className={`hover:text-red-500 fill-current z-5 ${
                          favorites.includes(dog.id)
                            ? "text-red-500 fill-current z-5"
                            : "text-yellow-500 fill-current z-5"
                        }`}
                      />
                    </button>
                    <DogInfoCard dog={dog} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
        {!loading && searchResults && searchResults.total > 0 && (
          <div className="flex gap-4 items-center w-full justify-center my-10">
            <button
              onClick={() => handlePagination("prev")}
              disabled={!searchResults.prev}
              className="bg-yellow-500 text-zinc-700 px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>

            <span>
              {from + 1} -{" "}
              {Math.min(from + parseInt(size), searchResults.total)} of{" "}
              {searchResults.total}
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
      </div>
  );
};

export default SearchResult;
