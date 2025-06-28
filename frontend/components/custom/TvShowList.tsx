import useTvShows from '@/hooks/useTvShow'
import React from 'react'
import MovieCard from './MovieCard'

const TvShowList = () => {
    const movieList = useTvShows()
  return (
<div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 p-2">
      {movieList?.map((movie, i)=>(
        <MovieCard key={i} movie={movie}/>
      ))}
    </div>
  )
}

export default TvShowList
