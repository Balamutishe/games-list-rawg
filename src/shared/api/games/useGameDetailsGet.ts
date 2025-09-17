import { useQuery } from "@tanstack/react-query";
import { client } from "@shared/api/client.ts";
import { apiKey } from "@shared/api/apiConfig.ts";
import type { SchemaGameSingle } from "@shared/api/schema.ts";

export const useGameDetailsGet = ( id: number | null ) => {
  return useQuery( {
    queryKey: [ "game", id ],
    queryFn: async (): Promise<SchemaGameSingle> => {
      const response = await client.GET( `/games/{id}`,
        {
          params: {
            path: {
              id: id!.toString()
            },
            //@ts-ignore
            query: {
              key: `${ apiKey }`
            }
          },
          signal: AbortSignal.timeout( 10000 )
        } )

      if ( !response.response.ok ) {
        console.error( "Error fetching games" )
      }

      return response.data!
    },
    enabled: !!id
  } )
}