import { Link } from "react-router-dom";
import { Logo } from "./";

function Header() {
  return (
    <header className="absolute top-0 left-0 w-full py-6 px-8 bg-transparent z-50">
      <div>
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
    </header>
  );
}

export default Header;
