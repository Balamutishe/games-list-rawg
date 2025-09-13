import { createFileRoute } from '@tanstack/react-router'
import { GamesView } from "@features/games/gamesList.tsx";

export const Route = createFileRoute( '/games/' )( {
  component: GamesPage,
} )

function GamesPage() {
  return <section>
    <GamesView />
  </section>
}