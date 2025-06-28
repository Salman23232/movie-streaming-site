export interface Movie {
    adult:boolean;
    id:number;
    original_language:string;
    original_title:string;
    title:string;
    backdrop_path:string;
    poster_path:string;
    overview:string;
    name?:string;
}