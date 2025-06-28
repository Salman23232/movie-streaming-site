'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { useGenreStore, useMovieStore } from "@/store/movieStore"
import { useRouter } from "next/navigation"
import { useState } from "react"

const genreList = [
  { id: 28, name: "Action" },
  { id: 12, name: "Abenteuer" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Komödie" },
  { id: 80, name: "Krimi" },
  { id: 99, name: "Dokumentarfilm" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Familie" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "Historie" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Musik" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Liebesfilm" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV-Film" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "Kriegsfilm" },
  { id: 37, name: "Western" }
]

function Genre() {
  const { genre, setGenre } = useGenreStore()
  const {setSearchValue} = useMovieStore()
  const [genreName, setGenreName] = useState("Genre")
  const router = useRouter()

  const handleChange = (value: string) => {
    const genreId = Number(value)
    const selected = genreList.find(g => g.id === genreId)

    if (selected) {
    setSearchValue('') 
      setGenreName(selected.name)
      setGenre(genreId)
      router.push("/movie")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{genreName}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <RadioGroup
          value={genre !== null ? genre.toString() : undefined}
          onValueChange={handleChange}
        >
          {genreList.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <RadioGroupItem
                value={item.id.toString()}
                id={`genre-${item.id}`}
              />
              <Label htmlFor={`genre-${item.id}`}>{item.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Genre
