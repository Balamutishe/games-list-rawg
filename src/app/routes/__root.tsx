import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Header } from "@widgets/header.tsx";
import { Footer } from "@widgets/footer.tsx";
import { MainContent } from "@widgets/mainContent.tsx";

const RootLayout = () => (
  <>
    <Header />
    <MainContent>
      <Outlet />
    </MainContent>
    <Footer />
    <ReactQueryDevtools initialIsOpen={ false } />
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute( { component: RootLayout } )