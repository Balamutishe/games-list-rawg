import type { FC } from "react";
import type { SchemaGenre } from "@shared/api/schema.ts";
import List from "@widgets/list.tsx";
import { useGenresGet } from "@shared/api/genres/useGenresGet.ts";
import { Link } from "@tanstack/react-router";

export const GenresView = () => {
  const { data, isLoading, isError, error } = useGenresGet()

  if ( isLoading ) {
    return <div>Loading...</div>
  }

  if ( isError ) {
    return <div>Error: { error.message }</div>
  }

  return <div>
    <GenresList genresList={ data?.results } />
  </div>
}

const GenresList: FC<{
  genresList?: SchemaGenre[]
}> = ( { genresList } ) => {
  return <List variant={ "list" }>
    { genresList && genresList.length !== 0 && genresList.map( ( genre ) => (
      <li key={ genre.id }><Link
        to={ "/games" }
        search={ { genres: genre.slug } }
      >{ genre.name }</Link></li>
    ) ) }
  </List>
}