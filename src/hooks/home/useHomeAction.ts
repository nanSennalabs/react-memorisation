import { plainToInstance } from "class-transformer";
import { movieList } from "./movieList";
import { MovieType } from "models/Movie/MovieType";

export function useHomeAction() {
  async function getMovieList(): Promise<MovieType[]> {
    return plainToInstance(MovieType, movieList);
  }

  async function getMovieById(id: string): Promise<MovieType> {
    const result = movieList.find((movie) => movie.id === id);

    return plainToInstance(MovieType, result);
  }

  return { getMovieList, getMovieById };
}
