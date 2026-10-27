import { useEffect, useReducer } from "react";

const STORAGE_KEY = "celebrare-favorites";

function favoritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE": {
      const isAlreadyFavorite = state.includes(action.id);

      if (isAlreadyFavorite) {
        return state.filter((id) => id !== action.id);
      }

      return [...state, action.id];
    }

    default:
      return state;
  }
}

function getInitialFavorites() {
  try {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);

    if (!savedFavorites) {
      return [];
    }

    const parsedFavorites = JSON.parse(savedFavorites);

    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    const validFavorites = parsedFavorites.filter(
      (id) =>
        typeof id === "string" ||
        (typeof id === "number" && Number.isFinite(id))
    );

    return [...new Set(validFavorites)];
  } catch {
    return [];
  }
}

export default function useFavorites() {
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    getInitialFavorites
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch (err) {
      console.error("Unable to save favourites:", err);
    }
  }, [favorites]);

  function toggleFavorite(id) {
    dispatch({
      type: "TOGGLE",
      id,
    });
  }

  return {
    favorites,
    toggleFavorite,
  };
}