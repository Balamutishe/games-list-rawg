import { useGamesGet } from "@shared/api/games/useGamesGet.ts";
import type { SchemaGame } from "@shared/api/schema.ts";
import List from "@widgets/list.tsx";
import { filterPlatformName } from "@shared/utils/filterPlatformName.ts";
import { type FC, useState } from "react";
import { Pagination } from "@widgets/pagination.tsx";
import { Link } from "@tanstack/react-router";
import { Route } from "@app/routes/games/index.tsx";

export const GamesView = () => {
  // @ts-ignore
  const { genres } = Route.useSearch()
  const [ page, setPage ] = useState( "1" )
  const { data, isError, isLoading, error } = useGamesGet( page, genres )

  if ( isLoading ) {
    return <div>Loading...</div>
  }

  if ( isError ) {
    return <div>Error: { error.message }</div>
  }

  return <div className="w-full">
    <Pagination
      setPage={ setPage }
      nextUrl={ data?.next }
      previousUrl={ data?.previous }
    />
    <GamesList gamesList={ data?.results } />
  </div>
}

const GamesList: FC<{
  gamesList: SchemaGame[] | undefined
}> = ( { gamesList } ) => {
  return <List variant={ "grid" }>
    { gamesList && gamesList.length &&
      gamesList.map( ( game: SchemaGame ) => (
        <li
          key={ game.id }
        >
          <Link
            to={ `/games/$gameId` }
            params={ { gameId: game.id.toString() } }
          >
            <GameCard game={ game } />
          </Link>
        </li>
      ) ) }
    { ( !gamesList || gamesList.length === 0 ) && <li>Список пуст</li> }
  </List>
}

const GameCard = ( { game }: { game: SchemaGame } ) => {
  return <div className="rounded-xl bg-gray-700 flex flex-col h-50">
    <img
      src={ game.background_image }
      alt={ game.name }
      className="rounded-t-xl w-full h-[60%]"
    />
    <div className="flex flex-col justify-between h-[40%] bg-gray-800 px-2 py-3 rounded-b-xl">
      <p className="flex items-center text-xs">
        { filterPlatformName( game.platforms ).map( ( platform ) => (
          <span className="mr-2">{ platform }</span> )
        ) }
      </p>
      <p className="flex items-center">
        { game.name }
      </p>
    </div>

  </div>
}