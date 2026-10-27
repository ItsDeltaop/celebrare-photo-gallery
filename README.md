
# Celebrare Photo Gallery

A responsive photo gallery built with React, Vite and Tailwind CSS
as part of the Celebrare Frontend Intern pre-screening assignment.

## Features

- Fetches 30 photos from the Picsum Photos API.
- Displays photos in a responsive grid.
- Filters photos by author name as the user types.
- Allows users to add and remove favourite photos.
- Persists favourite photo IDs using localStorage.
- Shows loading and error states during API fetching.
- Uses a custom useFetchPhotos hook.
- Uses useReducer for favourite state management.
- Uses useCallback and useMemo for the required search logic.

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- Picsum Photos API
- Browser localStorage

## Getting Started

### Prerequisites

Install Node.js and npm.

### Installation

Clone this repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Open the project directory:

cd celebrare-gallery

Install dependencies:

npm install

Start the development server:

npm run dev

Open the local URL printed by Vite in your terminal.

## Production Build

Run:

npm run build

Vite generates the production files in the dist directory.

## Project Structure

src/
  components/
    PhotoCard.jsx
  hooks/
    useFetchPhotos.js
    useFavorites.js
  App.jsx
  index.css
  main.jsx

## API

The gallery uses:

https://picsum.photos/v2/list?limit=30

The API provides photo information including the ID, author, dimensions and image download URL.

## State Management

Photo data, loading and error states are managed by the
useFetchPhotos custom hook.

Favourite IDs are managed using useReducer and persisted
in localStorage.

The search handler uses useCallback, while useMemo computes
the filtered photo list from the fetched data and search query.

## Limitations

- An internet connection is required to fetch photos.
- Favourites are stored locally in the current browser.
- Clearing browser storage can remove saved favourites.