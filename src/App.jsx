import { useCallback, useMemo, useState } from 'react';

import PhotoCard from './components/PhotoCard';
import useFetchPhotos from './hooks/useFetchPhotos';
import useFavorites from './hooks/useFavorites';

export default function App() {
  // Fetch photos using our custom hook.
  const { photos, loading, error } = useFetchPhotos();

  // Manage search text separately from favourites.
  const [search, setSearch] = useState("");

  // Favourites are managed by useReducer inside this hook.
  const { favorites, toggleFavorite } = useFavorites();

  // Keep the same handler function between renders.
  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  // Recalculate filtered photos only when photos or search changes.
  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase();

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, search]);

  return (
    <main className="min-h-screen bg-[#faf9f6] text-stone-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Page heading */}
        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-rose-700">
            Photography Collection
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Discover beautiful photos.
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-stone-600">
            Explore photographs from talented photographers.
            Search by author and save your favourite images.
          </p>
        </header>

        {/* Search section */}
        <section className="mb-8" aria-label="Search photos">
          <label
            htmlFor="photo-search"
            className="mb-2 block text-sm font-semibold text-stone-700"
          >
            Search by author
          </label>

          <div className="relative max-w-xl">
            <input
              id="photo-search"
              type="search"
              value={search}
              onChange={handleSearch}
              placeholder="Enter an author's name..."
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
            />
          </div>
        </section>

        {/* Gallery heading */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">
            Photo Gallery
          </h2>

          {!loading && !error && (
            <p className="text-sm text-stone-500">
              {filteredPhotos.length}{" "}
              {filteredPhotos.length === 1 ? "photo" : "photos"}
              {search.trim() ? " found" : ""}
            </p>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div
            role="status"
            className="flex min-h-64 flex-col items-center justify-center gap-4"
          >
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-rose-600" />

            <p className="text-stone-600">
              Loading beautiful photos...
            </p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div
            role="alert"
            className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800"
          >
            <h2 className="font-semibold">
              Unable to load photos
            </h2>

            <p className="mt-2 text-sm">
              {error}
            </p>

            <p className="mt-2 text-sm">
              Check your internet connection and refresh the page.
            </p>
          </div>
        )}

        {/* Successful fetch with no search matches */}
        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="rounded-xl border border-stone-200 bg-white px-5 py-12 text-center">
            <h2 className="text-lg font-semibold">
              No photos found
            </h2>

            <p className="mt-2 text-stone-600">
              Try searching with a different author name.
            </p>
          </div>
        )}

        {/* Responsive photo grid */}
        {!loading && !error && filteredPhotos.length > 0 && (
          <section
            aria-label="Photo results"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavorite={favorites.includes(photo.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </section>
        )}

        {/* Small footer */}
        <footer className="mt-14 border-t border-stone-200 py-6 text-center text-sm text-stone-500">
          Built with React, Vite and Tailwind CSS.
        </footer>
      </div>
    </main>
  );
}

