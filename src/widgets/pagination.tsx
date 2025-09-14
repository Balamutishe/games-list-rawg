import type { FC } from "react";
import { Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

interface PaginationProps {
  path: string;
  previousUrl?: string;
  nextUrl?: string;
}

export const Pagination: FC<PaginationProps> = ( {
                                                   path, previousUrl, nextUrl
                                                 } ) => {
  const queryClient = useQueryClient()

  const handleSetPage = ( url: string ) => {
    const params = new URLSearchParams( url );
    return Number( params.get( "page" ) || "1" )
  }

  const handleInvalidateQuery = async () => {
    await queryClient.invalidateQueries( { queryKey: [ "games" ] } )
  }

  return <div className="flex">
    <Link
      to={ path }
      search={ ( old ) => ( { ...old, page: handleSetPage( previousUrl! ) } ) }
      onClick={ handleInvalidateQuery }
      className={ `px-4 py-2 bg-gray-600 hover:bg-gray-400 active:bg-gray-800 transition-colors mr-4 rounded-xl cursor-pointer ${ !previousUrl ?
        "opacity-50 pointer-events-none" : "" }` }
    >Prev</Link>
    <Link
      to={ path }
      search={ ( old ) => ( { ...old, page: handleSetPage( nextUrl! ) } ) }
      onClick={ handleInvalidateQuery }
      className={ `px-4 py-2 bg-gray-600 hover:bg-gray-400 active:bg-gray-800 transition-colors rounded-xl cursor-pointer ${ !nextUrl ?
        "opacity-50 pointer-events-none" : "" }` }
    >Next</Link>
    {/*{ previousUrl && <button*/ }
    {/*  onClick={ () => handleSetPage( previousUrl ) }*/ }
    {/*  className="px-4 py-2 bg-gray-600 hover:bg-gray-400 active:bg-gray-800 transition-colors mr-4 rounded-xl cursor-pointer"*/ }
    {/*>Prev</button> }*/ }
    {/*{ nextUrl && <button*/ }
    {/*  onClick={ () => handleSetPage( nextUrl ) }*/ }
    {/*  className="px-4 py-2 bg-gray-600 hover:bg-gray-400 active:bg-gray-800 transition-colors rounded-xl cursor-pointer"*/ }
    {/*>Next</button> }*/ }
  </div>
}