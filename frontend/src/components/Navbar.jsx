

import { useState } from "react";
import { Link, NavLink } from "react-router";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="w-full border-b border-zinc-800 bg-black text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="flex justify-center items-center gap-2 text-xl font-bold tracking-tight "
        >
            <img src="/job-search.png" alt="logo" className="w-10 h-full" />
            <span>ResumeAI</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm transition ${
                isActive
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/my-resumes"
            className={({ isActive }) =>
              `text-sm transition ${
                isActive
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`
            }
          >
            My Resumes
          </NavLink>

          <Link
            to="/analyze"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Analyze Resume
          </Link>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `text-sm transition ${
                isActive
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`
            }
          >
            Profile
          </NavLink>
        </div>
      <button
        className="text-white md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
      </div>
      {menuOpen && (
    <div className="border-t border-zinc-800 bg-black px-4 py-4 md:hidden">
      <div className="flex flex-col gap-4">
        <Link to="/">Home</Link>
        <Link to="/my-resumes">My Resumes</Link>
        <Link to="/analyze">Analysis</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  )}
    </nav>

  );
}

export default Navbar;

