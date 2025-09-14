import { createFileRoute } from '@tanstack/react-router'
import { GamesView } from "@features/games/gamesList.tsx";
import { GenresView } from "@features/genres/genresList.tsx";

export const Route = createFileRoute( '/games/' )( {
  component: GamesPage,
} )

function GamesPage() {
  return <section className="flex gap-4">
    <GenresView />
    <GamesView />
  </section>
}