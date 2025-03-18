import { useDogSearch } from "@/contexts/DogContext";
import { fetchDogMatch, fetchDogs } from "@/utils/getData";
import handleError from "@/utils/handleError";
const FavoritesActions = () => {
  // favorites,
  // setFavorites,
  // generateMatch,
  
  const { setMatchResult } = useDogSearch();
  
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
  const { favorites, setFavorites } = useDogSearch();
  return (
    <div>
      {favorites?.length > 0 && (
        <div>
          <button
            onClick={generateMatch}
            disabled={favorites.length === 0}
            className={`bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:shadow-lg ${
              favorites.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            Generate Pawfect Match
          </button>
          <button
            onClick={() => setFavorites([])}
            disabled={favorites.length === 0}
            className={`ml-4 bg-white/70 border border-orange-600 text-orange-600 px-4 py-2 rounded disabled:opacity-50 hover:shadow-lg ${
              favorites.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            Clear Favorites
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritesActions;
