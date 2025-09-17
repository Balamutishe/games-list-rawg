import { useQuery } from "@tanstack/react-query";
import { client } from "@shared/api/client.ts";
import { apiKey } from "@shared/api/apiConfig.ts";
import type { ResponseGamesList } from "@shared/types/games.ts";

export const useGamesGet = ( queryParams: {
  page?: string, genres?: string, search?: string
} ) => {
  return useQuery( {
    queryKey: [ "games", queryParams.page, queryParams.genres,
      queryParams.search ],
    queryFn: async ( { signal } ): Promise<ResponseGamesList> => {
      const response = await client.GET( `/games`,
        {
          params: {
            query: { ...queryParams, key: `${ apiKey }`, page_size: "10" }
          },
          signal
        } )

      if ( !response.response.ok ) {
        console.error( "Error fetching games" )
      }

      return response.data!
    }
  } )
}