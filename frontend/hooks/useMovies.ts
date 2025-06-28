'use client'

import { useEffect, useState } from "react"
import api from "@/service/api-client"
import { useMovieStore } from "@/store/movieStore"
import { Movie } from "@/types/movie"

const useMovies = (genre?: number, searchValue?: string, page: number = 1) => {
  const [movieList, setMovieList] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchMovies = async () => {
      try {
        setLoading(true)
        setError(null)

        const endpoint = searchValue ? '/search/multi' : '/discover/movie'
        const res = await api.get(endpoint, {
          signal: controller.signal,
          params: {
            with_genres: genre,
            query: searchValue,
            page, // ✅ pass page to API
          },
        })

        setMovieList(res.data.results || [])
      } catch (err: any) {
        if (err.name !== "CanceledError") {
          setError(err.message || "Something went wrong")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()

    return () => controller.abort()
  }, [genre, searchValue, page]) // ✅ trigger when page changes

  return { movieList, loading, error }
}


export default useMovies
