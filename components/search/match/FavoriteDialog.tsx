import { useDogSearch } from "@/contexts/DogContext";

import { Dialog } from "@/components/ui/dialog";
import { fetchDogMatch, fetchDogs, handleDogSearch } from "@/utils/getData";
import handleError from "@/utils/handleError";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import DogInfoCard from "../DogInfoCard";

const FavoriteDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => void;
}) => {
  const { favorites, favoritedDogs, setFavoritedDogs, setMatchResult } =
    useDogSearch();
  const [allDogs, setAllDogs] = useState([]);

  const onClose = () => {
    setFavoritedDogs([]);
    onOpenChange();
  };

  const generateMatch = async () => {
    try {
      const response = await fetchDogMatch({ favorites });

      // Fetch matched dog details
      const matchResponse = await fetchDogs({ dogIds: [response.match] });

      setMatchResult(matchResponse[0]);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    const fetchAllDogs = async () => {
      try {
        const params = new URLSearchParams();
        params.set("sort", "breed:asc");
        params.set("size", "10000");

        const dogsResponse = await fetchDogs({
          dogIds: favorites,
        });
        setAllDogs(dogsResponse);
      } catch (error) {
        console.error("Error fetching all dogs:", error);
      }
    };

    if (open) {
      fetchAllDogs();
    }
  }, [open]);

  useEffect(() => {
    if (open && allDogs.length > 0) {
      console.log("favorites??", favorites);
      console.log("allDogs???", allDogs);
      const favDogs = allDogs.filter((dog) => favorites.includes(dog.id));

      setFavoritedDogs(favDogs);
    }
  }, [open, allDogs, favorites]);

  return (
    <div className="p-4">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200">
          <div className="relative bg-white rounded-lg max-w-[60vw] max-h-[80vh] overflow-hidden p-10">
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-2 right-2 font-bold bg-transparent text-yellow-600 p-2 rounded hover:bg-gray-100 z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex justify-center items-center mb-6 mt-2">
              <h2 className="text-2xl font-bold ml-10">Your Favorite Dogs</h2>
            </div>
            <button
              onClick={generateMatch}
              disabled={favorites.length === 0}
              className={`bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:shadow-lg mb-6 ${
                favorites.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Generate Pawfect Match
            </button>

            <div className="overflow-y-auto max-h-[80vh] rounded-lg h-[fit-content] pb-8">
              {favorites.length === 0 ? (
                <p className="text-center">No favorite dogs found.</p>
              ) : (
                <div
                  className={`grid gap-6 h-[60vh] overflow-y-auto ${
                    favoritedDogs.length === 1
                      ? "grid-cols-1"
                      : favoritedDogs.length === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1 sm:grid-cols-3"
                  }`}
                >
                  {favoritedDogs.map((dog) => (
                    <DogInfoCard key={dog.id} dog={dog} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default FavoriteDialog;
