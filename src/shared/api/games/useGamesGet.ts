import { useQuery } from "@tanstack/react-query";
import { client } from "@shared/api/client.ts";
import { apiKey } from "@shared/api/apiConfig.ts";
import type { ResponseGamesList } from "@shared/types/games.ts";

export const useGamesGet = ( page?: string ) => {
  return useQuery( {
    queryKey: [ "games", page ],
    queryFn: async ( { signal } ): Promise<ResponseGamesList> => {
      const response = await client.GET( `/games`,
        {
          params: {
            query: {
              page: page || "2",
              page_size: "30",
              // @ts-ignore
              key: `${ apiKey }`
            }
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