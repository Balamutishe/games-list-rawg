import { useGamesGet } from "@shared/api/games/useGamesGet.ts";
import type { SchemaGame, SchemaTag } from "@shared/api/schema.ts";
import List from "@widgets/list.tsx";
import { filterPlatformName } from "@shared/utils/filterPlatformName.ts";
import { type FC, type RefObject, useEffect, useRef } from "react";
import { Pagination } from "@widgets/pagination.tsx";
import {
  type ParsedLocation, useLocation, useNavigate
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

  return <>
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

    { isSuccess && <div className='flex gap-4'>
      <div className='w-[70%]'>
        <GamesList gamesList={ data.results } />
      </div>
      <div className='w-[30%] h-[30rem]'>
        <GameDetails />
      </div>
    </div> }
  </>
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
      className={ "bg-gray-800 outline-3 outline-gray-600" +
        " hover:outline-gray-400" +
        " rounded-xl px-2" +
        " py-2 cursor-pointer" }
    />
  </div>
}

const GamesList: FC<{
  gamesList: SchemaGame[] | undefined
}> = ( { gamesList } ) => {
  return <List variant={ "list" }>
    { gamesList && gamesList.length > 0 &&
      gamesList.map( ( game: SchemaGame ) => (
        <li
          key={ game.id }
          className="flex gap-4"
        >
          <GameCard game={ game } />
        </li>
      ) ) }
    { gamesList?.length === 0 && <li>Game not founded</li> }
  </List>
}

const GameCard = ( { game }: { game: SchemaGame } ) => {
  return <div
    className="relative flex gap-2"
  >
    <div
      className="rounded-xl bg-gray-700 flex"
    >
      <img
        src={ game.background_image }
        alt={ game.name }
        className="rounded-l-xl w-1/5"
      />
      <div className="flex flex-col justify-between w-4/5 bg-gray-800 px-4 py-2 rounded-r-xl">
        <p className="flex items-center">
          { game.name }
        </p>
        <p className="flex flex-wrap items-center text-[0.45rem] leading-3">
          { game.platforms &&
            filterPlatformName( game.platforms ).map( ( platform ) => (
              <span
                key={ crypto.randomUUID() }
                className="mr-2"
              >{ platform }</span> )
            ) }
        </p>
        <p className="text-[0.45rem] leading-3">{
          // @ts-ignore
          game.tags.map( ( tag: SchemaTag, index: number ) => {
            if ( index < 3 ) return <span
              key={ crypto.randomUUID() }
              className="mr-1"
            >{ tag.name }</span>
          } )
        }</p>
      </div>

    </div>
  </div>
}

const GameDetails = ( { game }: { game?: SchemaGame } ) => {
  return <div className="bg-gray-600 h-full p-4 rounded-xl">
    {//@ts-ignore
      game && game.short_screenshots.map( ( screenshot, index ) => {
        if ( index < 3 ) return <img
          src={ screenshot.image }
          alt={ screenshot.image }
        />
      } ) }
    { !game && <div>Game not founded</div> }
  </div>
}