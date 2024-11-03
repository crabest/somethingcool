import { Link, useLocation } from "@remix-run/react";
import { MinecraftIcon } from "~/components/Icons";

export function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link 
          to="/" 
          className="group flex items-center gap-2 font-minecraft text-2xl text-white"
        >
          <MinecraftIcon />
          <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            QWMC
          </span>
        </Link>
        <div className="flex gap-8">
          <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
          <NavLink to="/rules" active={location.pathname === "/rules"}>Rules</NavLink>
          <a 
            href="https://store.qwmc.net" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-minecraft transition-all hover:-translate-y-0.5 hover:text-emerald-400 text-gray-400"
          >
            Store
          </a>
          <NavLink to="/vote" active={location.pathname === "/vote"}>Vote</NavLink>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link
      to={to}
      className={`font-minecraft transition-all hover:-translate-y-0.5 hover:text-emerald-400
        ${active ? 'text-emerald-400' : 'text-gray-400'}`}
    >
      {children}
    </Link>
  );
} 