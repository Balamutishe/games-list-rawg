import { useGamesGet } from "@shared/api/games/useGamesGet.ts";
import type { SchemaGame } from "@shared/api/schema.ts";
import List from "@widgets/list.tsx";
import { filterPlatformName } from "@shared/utils/filterPlatformName.ts";
import { type FC, type RefObject, useEffect, useRef } from "react";
import { Pagination } from "@widgets/pagination.tsx";
import {
  Link, type ParsedLocation, useLocation, useNavigate
} from "@tanstack/react-router";
import { useDebouncedCallback } from 'use-debounce'

export const GamesView = () => {
  const location: ParsedLocation<{
    search?: string,
    page?: string,
    genres?: string
  }> = useLocation()
  const { genres, page, search } = location.search

  const { data, isError, isPending, isSuccess, error } = useGamesGet(
    { page, genres, search } )

  return <div className="w-full">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">{ genres ?
        `${ genres.charAt( 0 ).toUpperCase() + genres.slice( 1 ) }` :
        'Games all' }</h1>
      <GamesSearch />
      <Pagination
        path={ "/games" }
        nextUrl={ data?.next }
        previousUrl={ data?.previous }
      />
    </div>

    { isPending && <div>Loading...</div> }
    { isError && <div>Error: { error.message }</div> }
    { isSuccess && <GamesList gamesList={ data.results } /> }
  </div>
}

const GamesSearch = () => {
  const location: ParsedLocation<{ search?: string }> = useLocation()
  const navigate = useNavigate()
  const ref: RefObject<HTMLInputElement | null> = useRef( null )

  const handleChangeSearchName = useDebouncedCallback(
    async ( event: React.ChangeEvent<HTMLInputElement> ) => {
      const query = event.target.value.trim()
      let nextSearch = { ...location.search }

      if ( query.length > 0 && query !== '' ) {
        nextSearch = { ...location.search, search: query }
      } else {
        delete nextSearch.search
      }

      await navigate( {
        replace: true,
        to: '/games',
        search: nextSearch
      } )
    }, 400 )

  useEffect( () => {
    if ( ref.current ) {
      ref.current.focus()
    }
  } )

  return <div>
    <input
      ref={ ref }
      type="text"
      defaultValue={ location.search.search || '' }
      onChange={ ( event ) => handleChangeSearchName( event ) }
      placeholder={ "Search game..." }
      className={ "outline-3 outline-gray-600 hover:outline-gray-400" +
        " rounded-xl px-4" +
        " py-2 cursor-pointer" }
    />
  </div>
}

const GamesList: FC<{
  gamesList: SchemaGame[] | undefined
}> = ( { gamesList } ) => {
  return <List variant={ "grid" }>
    { gamesList && gamesList.length > 0 &&
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
    { gamesList?.length === 0 && <li>Game not founded</li> }
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
        { game.platforms &&
          filterPlatformName( game.platforms ).map( ( platform ) => (
            <span
              key={ crypto.randomUUID() }
              className="mr-2"
            >{ platform }</span> )
          ) }
      </p>
      <p className="flex items-center">
        { game.name }
      </p>
    </div>

  </div>
}