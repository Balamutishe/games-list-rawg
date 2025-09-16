import { createFileRoute } from '@tanstack/react-router'
import { GamesView } from "@features/games/gamesList.tsx";
import { GenresView } from "@features/genres/genresList.tsx";

export const Route = createFileRoute( '/games/' )( {
  component: GamesPage,
} )

function GamesPage() {
  return <section className="flex gap-4">
    <div className="w-1/6 bg-gray-600 p-4 rounded-xl">
      <GenresView />
    </div>
    <div className="w-5/6">
      <GamesView />
    </div>
  </section>
}