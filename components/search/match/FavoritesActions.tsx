import { useDogSearch } from "@/contexts/DogContext";
import { useState } from "react";
import FavoriteDialog from "./FavoriteDialog";
const FavoritesActions = () => {
  const {  favorites, setFavorites } = useDogSearch();
  const [favoriteDialogOpen, setFavoriteDialogOpen] = useState(false);

  return (
    <div className="w-full sm:w-[fit-content]">
      {favorites?.length > 0 && (
        <div className="flex items-center justify-center h-[40px]">
          <button
            onClick={() => {
              setFavoriteDialogOpen(true);
            }}
            disabled={favorites.length === 0}
            className={`h-[40px] flex-1 sm:ml-4 border bg-orange-600 text-white px-2 lg:px-4 py-2 rounded disabled:opacity-50 hover:shadow-lg text-sm lg:text-base ${
              favorites.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            View Favorites
          </button>
          <button
            onClick={() => setFavorites([])}
            disabled={favorites.length === 0}
            className={`h-[40px] flex-1 ml-4 bg-white/70 border border-orange-600 text-orange-600 px-2 lg:px-4 py-2 rounded disabled:opacity-50 hover:shadow-lg text-sm lg:text-base min-w-[fit-content]  ${
              favorites.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            Clear Favorites
          </button>
        </div>
      )}
      {favoriteDialogOpen && (
        <FavoriteDialog
          open={favoriteDialogOpen}
          onOpenChange={() => setFavoriteDialogOpen(!favoriteDialogOpen)}
        />
      )}
    </div>
  );
};

export default FavoritesActions;
