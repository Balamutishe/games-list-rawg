import { Link } from "@tanstack/react-router";
import { LayoutContent } from "@widgets/layout.tsx";

export const Header = () => {
  return <header className="border-b-2">
    <LayoutContent>
      <nav className="flex gap-4">
        <Link
          to="/"
        >
          Home
        </Link>{ ' ' }
        <Link
          to="/games"
        >
          Games
        </Link>
      </nav>
    </LayoutContent>
  </header>
}