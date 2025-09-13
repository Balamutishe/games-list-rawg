import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute( '/games/$gameId' )( {
  component: GameDetailsPage,
} )

function GameDetailsPage() {
  const { gameId } = Route.useParams()

  return <div>GameId: { gameId }</div>
}
