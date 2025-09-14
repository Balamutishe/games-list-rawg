import { useQuery } from "@tanstack/react-query";
import { client } from "@shared/api/client.ts";
import { apiKey } from "@shared/api/apiConfig.ts";
import type { ResponseGenresList } from "@shared/types/genres.ts";

export const useGenresGet = () => {
  return useQuery( {
    queryKey: [ "genres" ],
    queryFn: async ( { signal } ): Promise<ResponseGenresList> => {
      const response = await client.GET( "/genres", {
        params: {
          query: {
            // @ts-ignore
            key: `${ apiKey }`
          }
        },
        signal
      } );

      if ( !response.response.ok ) {
        console.error( "Error fetching genres" )
      }

      return response.data!
    },
  }, )
}