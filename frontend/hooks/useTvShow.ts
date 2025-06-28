
'use client'
import api from "@/service/api-client"
import { Movie } from "@/types/movie"
import { useEffect, useState } from "react"


const useTvShows = () => {
    const [tvShowList, setTvShowList] = useState<Movie[]>()
    const fetchTvShows = async () => {
        const res = await api.get('/discover/tv')
        setTvShowList(res.data.results)
        
    }
    useEffect(() => {
    fetchTvShows()
    }, [])
    return tvShowList
}

export default useTvShows