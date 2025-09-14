import { useQuery } from "@tanstack/react-query";
import { client } from "@shared/api/client.ts";
import { apiKey } from "@shared/api/apiConfig.ts";
import type { ResponseGamesList } from "@shared/types/games.ts";

export const useGamesGet = ( page?: string, genres?: string ) => {
  return useQuery( {
    queryKey: [ "games", page, genres ],
    queryFn: async ( { signal } ): Promise<ResponseGamesList> => {
      const response = await client.GET( `/games`,
        {
          params: {
            query: {
              page: page || "1",
              page_size: "30",
              genres: genres || "",
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