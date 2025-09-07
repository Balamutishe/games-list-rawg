import { Link } from "@tanstack/react-router";
import { LayoutContent } from "@widgets/layout.tsx";

export const Header = () => {
  return <header className="border-b-2">
    <LayoutContent>
      <Link
        to="/"
      >
        Home
      </Link>{ ' ' }
      <Link
        to="/about"
      >
        About
      </Link>
    </LayoutContent>
  </header>
}