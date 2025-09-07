import { useQuery } from "@tanstack/react-query";
import { client } from "@shared/api/client.ts";
import { apiKey } from "@shared/api/apiConfig.ts";

export const useGameDetailsGet = ( id: string ) => {
  return useQuery( {
    queryKey: [ "game", id ],
    queryFn: async () => await client.GET( `/games/{id}`,
      {
        params: {
          // @ts-ignore
          query: {
            key: `${ apiKey }`
          }
        },
        signal: AbortSignal.timeout( 10000 )
      } )
  } )
}