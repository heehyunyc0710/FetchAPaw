import { useDogSearch } from "@/contexts/DogContext";

import { Dialog } from "@/components/ui/dialog";
import { IDog } from "@/types";
import { fetchDogMatch, fetchDogs } from "@/utils/getData";
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
  const [allDogs, setAllDogs] = useState<IDog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const onClose = () => {
    setFavoritedDogs([]);
    onOpenChange();
  };

  const generateMatch = async () => {
    setLoading(true);
    try {
      const response = await fetchDogMatch({ favorites });

      // Fetch matched dog details
      const matchResponse = await fetchDogs({ dogIds: [response.match] });

      setMatchResult(matchResponse[0]);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllDogs = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchAllDogs();
    }
  }, [open]);

  useEffect(() => {
    setLoading(true);
    if (open && allDogs.length > 0) {
      const favDogs = allDogs.filter((dog) => favorites.includes(dog.id));

      setFavoritedDogs(favDogs);
    }
    setLoading(false);
  }, [open, allDogs, favorites]);

  return (
    <div className="p-4">
      <Dialog open={open && !loading} onOpenChange={onOpenChange}>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200">
          <div className="relative bg-white rounded-lg w-[90vw] md:w-[60vw] h-[90vh] md:h-[60vh] overflow-hidden p-10">
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-2 right-2 font-bold bg-transparent text-yellow-600 p-2 rounded hover:bg-gray-100 z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex justify-center items-center mb-6 mt-2">
              <h2 className="text-2xl font-bold">Your Favorite Dogs</h2>
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

            <div className="overflow-y-auto max-h-[40vh] pb-8">
              {favorites.length === 0 ? (
                <p className="text-center">No favorite dogs found.</p>
              ) : (
                <div
                  className={`grid gap-6 ${
                    favoritedDogs.length === 1
                      ? "grid-cols-1"
                      : favoritedDogs.length === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 "
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
