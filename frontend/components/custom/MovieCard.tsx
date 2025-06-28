
import {
  Card,
  CardContent,

} from "@/components/ui/card"
import { Movie } from "@/types/movie"
import Image from "next/image"
import { useRouter } from "next/navigation"

const MovieCard = ({movie}:{movie:Movie}) => {
    const router = useRouter()
  return (
    <Card className="m-2 cursor-pointer" onClick={()=> router.push(`/movie/${movie.id}`)}>
      <CardContent>
        <div><Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} width={1200} height={1200} alt={movie.title}/></div>
        <div className="flex flex-col">
            <h1 className="font-bold font-sans w-40 text-center">{movie.title}</h1>
        </div>
      </CardContent>

    </Card>
  )
}

export default MovieCard
