import useTvShows from '@/hooks/useTvShow'
import React from 'react'
import TvShowCard from './TvShowCard'

const TvShowList = () => {
    const tvShowList = useTvShows()
  return (
<div className="grid  lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 p-2">
      {tvShowList?.map((show, i)=>(
        <TvShowCard key={i} tvShow={show}/>
      ))}
    </div>
  )
}

export default TvShowList
