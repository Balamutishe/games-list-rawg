import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute( '/' )( {
  component: MainPage,
} )

function MainPage() {
  return <section>
    <h1>MainPage</h1>
  </section>
}