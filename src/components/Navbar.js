// import { PlusCircleIcon } from "@heroicons/react/outline";
// import { ViewListIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="">
      <Link
        to="/"
        className=""
      >
        <span> Create </span>
      </Link>
      <Link
        to="/memes"
        className=""
      >
        <span> View All </span>
      </Link>
    </nav>
  );
}
