import { useGamesGet } from "@shared/api/games/useGamesGet.ts";

function MainPage() {
  const gamesData = useGamesGet()

  if ( gamesData.isLoading ) {
    return <div>Loading...</div>
  }

  if ( gamesData.isError ) {
    return <div>Error: { gamesData.error.message }</div>
  }

  return <section>
    <h1>Success data</h1>
  </section>
}

export default MainPage;