import { useGamesGet } from "@shared/api/games/useGamesGet.ts";
import type { Game } from "@shared/types/games.ts";
import List from "@widgets/list.tsx";

export const GamesList = () => {
  const { data, isError, isLoading, error } = useGamesGet()

  if ( isLoading ) {
    return <div>Loading...</div>
  }

  if ( isError ) {
    return <div>Error: { error.message }</div>
  }

  return <div className="w-full">
    <List>
      { data && data.results.length && data.results.map( ( game: Game ) => (
        <li
          key={ game.id }
        >
          <GameCard game={ game } />
        </li>
      ) ) }
    </List>
  </div>
}

const GameCard = ( { game }: { game: Game } ) => {
  return <div className="rounded-xl bg-gray-700 flex flex-col h-50">
    <img
      src={ game.background_image }
      alt={ game.name_original }
      className="rounded-t-xl w-full h-[60%]"
    />
    <p className="h-[40%] flex items-center p-2">
      { game.name }
    </p>
  </div>
}