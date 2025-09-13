import { useGamesGet } from "@shared/api/games/useGamesGet.ts";
import type { SchemaGame } from "@shared/api/schema.ts";
import List from "@widgets/list.tsx";
import { filterPlatformName } from "@shared/utils/filterPlatformName.ts";
import { useState } from "react";

export const GamesList = () => {
  const [ page, setPage ] = useState( "1" )
  const { data, isError, isLoading, error } = useGamesGet( page )

  const handleSetPage = ( url: string ) => {
    const params = new URLSearchParams( url );
    const page = params.get( "page" ) || "1"
    setPage( page )
  }

  if ( isLoading ) {
    return <div>Loading...</div>
  }

  if ( isError ) {
    return <div>Error: { error.message }</div>
  }

  return <div className="w-full">
    <div className="flex justify-end mb-6">
      { data?.previous && <button
        onClick={ () => handleSetPage( data.previous ) }
        className="px-4 py-2 bg-gray-600 mr-4 rounded-xl"
      >Prev</button> }
      { data?.next && <button
        onClick={ () => handleSetPage( data.next ) }
        className="px-4 py-2 bg-gray-600 rounded-xl"
      >Next</button> }
    </div>
    <List>
      { data && data.results.length && data.results.map( ( game ) => (
        <li
          key={ game.id }
        >
          <GameCard game={ game } />
        </li>
      ) ) }
    </List>
  </div>
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