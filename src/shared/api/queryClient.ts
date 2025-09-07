import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient( {
  defaultOptions: {
    queries: {
      staleTime: Infinity, // устаревание данных (бесконечное)
      gcTime: 1000 * 60 * 60 // время жизни данных в кэше (1 час)
    }
  }
} );

export default queryClient;