import {create} from 'zustand'

interface GenreStore {
    genre:number | null;
    setGenre: (genre:number) => void
}
interface MovieStore {
    searchValue:string;
    setSearchValue: (input:string) => void
}

export const useGenreStore = create<GenreStore>((set)=>({
genre: null,
setGenre: (genre:number) => set({genre})
}))

export const useMovieStore = create<MovieStore>((set)=>({
searchValue: '',
setSearchValue: (input:string) => set({searchValue:input})
}))