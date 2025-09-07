import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const LayoutContent: FC<Props> = ( { children } ) => {
  return <div
    className="px-10 py-5 mx-auto my-0 max-w-[1440px]"
  >{ children }</div>
}