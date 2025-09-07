import { createFileRoute } from '@tanstack/react-router'
import MainPage from "@pages/mainPage.tsx";

export const Route = createFileRoute( '/' )( {
  component: MainPage,
} )