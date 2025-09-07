import { useQuery } from "@tanstack/react-query";
import { client } from "@shared/api/client.ts";
import { apiKey } from "@shared/api/apiConfig.ts";

export const useGamesGet = () => {
  return useQuery( {
    queryKey: [ "games" ],
    queryFn: async () => await client.GET( `/games`,
      {
        params: {
          query: {
            page: "1",
            page_size: "10",
            // @ts-ignore
            key: `${ apiKey }`
          }
        },
        signal: AbortSignal.timeout( 10000 )
      } )
  } )
}