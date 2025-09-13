import type { FC } from "react";

interface PaginationProps {
  previousUrl?: string;
  nextUrl?: string;
  setPage: ( page: string ) => void;
}

export const Pagination: FC<PaginationProps> = ( {
                                                   previousUrl, nextUrl, setPage
                                                 } ) => {
  const handleSetPage = ( url: string ) => {
    const params = new URLSearchParams( url );
    const page = params.get( "page" ) || "1"
    setPage( page )
  }

  return <div className="flex justify-end mb-6">
    { previousUrl && <button
      onClick={ () => handleSetPage( previousUrl ) }
      className="px-4 py-2 bg-gray-600 hover:bg-gray-400 active:bg-gray-800 transition-colors mr-4 rounded-xl cursor-pointer"
    >Prev</button> }
    { nextUrl && <button
      onClick={ () => handleSetPage( nextUrl ) }
      className="px-4 py-2 bg-gray-600 hover:bg-gray-400 active:bg-gray-800 transition-colors rounded-xl cursor-pointer"
    >Next</button> }
  </div>
}