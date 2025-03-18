import { useDogSearch } from "@/contexts/DogContext";
import { motion } from "framer-motion";
import { Bone, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import DogInfoCard from "./DogInfoCard";
import Image from "next/image";

const SearchResult = ({ loading }: { loading: boolean }) => {
  const router = useRouter();
  const { dogs, favorites, setFavorites, searchResults, from, setFrom, size } =
    useDogSearch();
  const toggleFavorite = (dogId: string) => {
    setFavorites((prev: string[]) =>
      prev.includes(dogId)
        ? prev.filter((id: string) => id !== dogId)
        : [...prev, dogId]
    );
  };
  const handleViewDog = async (dogId: string) => {
    router.push(`/dogs/${dogId}`);
  };
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
            <>
              <p className="text-center py-8 font-bold text-xl">No dogs found</p>
              <Image
                src="/images/404.png"
                alt="Lost dog"
                width={300}
                height={300}
                className="mx-auto mb-8"
              />
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[500px]">
              {dogs.length && dogs.sort((a, b) => a.breed.localeCompare(b.breed)).map((dog, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  key={index}
                  onClick={() => handleViewDog(dog.id)}
                  className="border border-zinc-500 shadow-lg dog-card relative bg-white p-6 rounded-lg  hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(dog.id);
                    }}
                    className="absolute top-2 right-2 bg-black/90 border-2 border-white/90 rounded-full p-2 cursor-pointer transition-all duration-300 z-10   "
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
    </div>
  );
};

export default SearchResult;
