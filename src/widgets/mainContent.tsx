import type { FC, ReactNode } from "react";
import { LayoutContent } from "@widgets/layout.tsx";

interface MainContentProps {
  children: ReactNode;
}

export const MainContent: FC<MainContentProps> = ( { children } ) => {
  return <main className="flex-1">
    <LayoutContent>
      { children }
    </LayoutContent>
  </main>
}