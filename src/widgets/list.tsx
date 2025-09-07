import type { ReactNode } from "react";

interface ListProps {
  children: ReactNode;
}

function List( { children }: ListProps ) {
  return <ul className="grid grid-cols-3 gap-4">
    { children }
  </ul>
}

export default List