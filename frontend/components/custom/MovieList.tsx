'use client'

import useMovies from "@/hooks/useMovies"
import MovieCard from "./MovieCard"
import { useGenreStore, useMovieStore } from "@/store/movieStore"
import { useState } from "react"

const MovieList = () => {
  const { genre } = useGenreStore()
  const { searchValue } = useMovieStore()

  const [page, setPage] = useState(1)

  const { movieList, loading, error } = useMovies(genre ?? undefined, searchValue, page)

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  const handleNext = () => {
    setPage((prev) => prev + 1)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Movie Grid */}
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 p-2 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          movieList?.map((movie, i) => (
            <MovieCard key={i} movie={movie} />
          ))
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={handlePrev}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-lg font-medium">Page {page}</span>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default MovieList
