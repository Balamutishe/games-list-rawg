import type { ReactNode } from "react";
import { clsx } from "clsx";

interface ListProps {
  children: ReactNode;
  variant?: "grid" | "list";
}

function List( { children, variant }: ListProps ) {
  return <ul
    className={ clsx( {
      "grid grid-cols-3 gap-4": variant === "grid",
      "flex flex-col gap-4": variant === "list"
    } ) }
  >
    { children }
  </ul>
}

export default List