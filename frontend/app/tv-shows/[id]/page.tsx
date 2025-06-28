'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const TvShowCard = () => {
    const params = useParams()
    const movieUrl = `https://vidsrc.xyz/embed/tv/${params.id}`
    console.log(movieUrl);
    
  return (
    <iframe src={movieUrl} allowFullScreen allow='autoplay; encrypted-media; gyroscope; picture-in-picture' className='w-full h-screen' ></iframe>
  )
}

export default TvShowCard
