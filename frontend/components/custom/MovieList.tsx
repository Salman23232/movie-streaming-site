'use client'

import useMovies from '@/hooks/useMovies'
import MovieCard from './MovieCard'
import { useGenreStore, useMovieStore } from '@/store/movieStore'
import { useState } from 'react'
import Loading from './Loading'

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

  if (loading) return <Loading />

  return (
    // Netflix's classic dark background and edge-to-edge feel
    <div className="flex flex-col min-h-[80vh] w-full bg-[#141414] px-4 md:px-12 py-8">
      {/* Minimalist Error State */}
      {error && (
        <div className="w-full py-10 text-center">
          <p className="text-red-600 font-semibold text-lg">{error}</p>
        </div>
      )}

      {/* Netflix-style Grid: Tight horizontal gaps, larger vertical gaps */}
      {!error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-10">
          {movieList?.length > 0 ? (
            movieList.map((movie, i) => (
              // The iconic Netflix hover scale effect
              <div
                key={i}
                className="relative group cursor-pointer transition-transform duration-300 ease-out hover:scale-110 hover:z-20 delay-75"
              >
                <MovieCard movie={movie} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500 text-lg">
              No movies match your criteria.
            </div>
          )}
        </div>
      )}

      {/* Ultra-Minimal Pagination */}
      {!error && movieList?.length > 0 && (
        <div className="mt-16 mb-8 flex justify-center items-center gap-8 text-gray-400">
          <button
            className="group flex items-center gap-2 text-lg font-medium transition-colors hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 disabled:cursor-not-allowed"
            onClick={handlePrev}
            disabled={page === 1}
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            Previous
          </button>

          <span className="text-lg font-semibold text-white">{page}</span>

          <button
            className="group flex items-center gap-2 text-lg font-medium transition-colors hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 disabled:cursor-not-allowed"
            onClick={handleNext}
          >
            Next
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default MovieList
