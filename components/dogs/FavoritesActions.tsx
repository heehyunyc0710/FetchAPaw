import React from "react";
import { IFavoritesActionsProps } from "@/types";


const FavoritesActions: React.FC<IFavoritesActionsProps> = ({
  favorites,
  generateMatch,
  setFavorites,
}) => {
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
            View Match
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
