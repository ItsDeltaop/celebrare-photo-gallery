export default function PhotoCard({
  photo,
  isFavorite,
  onToggleFavorite,
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden bg-stone-100">
        <img
          src={photo.download_url}
          alt={`Photography by ${photo.author}`}
          loading="lazy"
          className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          aria-label={
            isFavorite
              ? `Remove photo by ${photo.author} from favourites`
              : `Add photo by ${photo.author} to favourites`
          }
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl shadow-md transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 ${
            isFavorite
              ? "text-rose-600"
              : "text-stone-500 hover:text-rose-600"
          }`}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
            Photographer
          </p>

          <h2 className="mt-1 truncate font-semibold text-stone-800">
            {photo.author}
          </h2>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            isFavorite
              ? "bg-rose-100 text-rose-700"
              : "bg-stone-100 text-stone-600"
          }`}
        >
          {isFavorite ? "Favourite" : "Photo"}
        </span>
      </div>
    </article>
  );
}