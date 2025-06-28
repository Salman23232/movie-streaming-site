
'use client'
import api from "@/service/api-client"
import { useMovieStore } from "@/store/movieStore"
import { Movie } from "@/types/movie"
import { useEffect, useState } from "react"


const useTvShows = () => {
    const {searchValue} = useMovieStore()
    const endpoint = searchValue !== '' ? '/search/tv' : '/discover/tv'
    const [tvShowList, setTvShowList] = useState<Movie[]>()
    const fetchTvShows = async () => {
        const res = await api.get(endpoint, {
            params:{
                query:searchValue
            }
        }
        )
        setTvShowList(res.data.results)
        
    }
    useEffect(() => {
    fetchTvShows()
    }, [searchValue])
    return tvShowList
}

export default useTvShows