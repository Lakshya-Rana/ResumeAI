import { Link } from "react-router";

function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">

        <Link
          to="/"
          className="text-lg font-bold tracking-tight"
        >
          ResumeAI
        </Link>

        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <Link to="/dashboard" className="transition hover:text-white">
            Dashboard
          </Link>

          <Link to="/resumes" className="transition hover:text-white">
            Resumes
          </Link>

          <Link to="/analyze" className="transition hover:text-white">
            Analyze
          </Link>
        </div>

        <div className="text-sm text-zinc-500">
          © 2026 ResumeAI
        </div>

        <div className="text-sm text-zinc-500">
          Built with React & Node.js
        </div>

      </div>
    </footer>
  );
}

export default Footer;