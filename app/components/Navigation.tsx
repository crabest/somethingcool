import { Link, useLocation } from "@remix-run/react";
import { MinecraftIcon } from "~/components/Icons";
import { useState, useRef, useEffect } from "react";
import { UserMenu } from "~/components/UserMenu";

export function Navigation() {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<'vote' | 'support' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when navigating
  useEffect(() => {
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (dropdown: 'vote' | 'support') => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav 
      ref={navRef} 
      className={`fixed top-0 z-50 w-full border-b border-gray-800 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md' 
          : 'bg-black/70 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Left Section: Logo and Main Navigation */}
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="group flex items-center gap-2 font-minecraft text-2xl text-white"
          >
            <div className="transition-transform duration-300 group-hover:scale-110">
              <MinecraftIcon />
            </div>
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              QWMC
            </span>
          </Link>

          <div className="flex gap-6">
            <NavLink to="/rules" active={location.pathname === "/rules"}>Rules</NavLink>
            
            {/* Support Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('support')}
                className={`group flex items-center gap-1 font-minecraft transition-all hover:-translate-y-0.5 hover:text-emerald-400 ${
                  location.pathname.startsWith('/support') || activeDropdown === 'support'
                    ? "text-emerald-400"
                    : "text-gray-400"
                }`}
              >
                Support
                <span className={`transition-transform duration-200 ${activeDropdown === 'support' ? 'rotate-180' : ''}`}>
                  ▾
                </span>
              </button>
              
              {/* Support Dropdown Menu */}
              {activeDropdown === 'support' && (
                <div className="absolute left-0 top-full mt-1 animate-fadeIn">
                  <div className="rounded-lg border border-gray-800 bg-black/95 p-1.5 shadow-xl">
                    <Link
                      to="/support/tickets"
                      className={`block rounded-md px-6 py-2 text-sm transition-all hover:bg-emerald-500/10 hover:text-emerald-400 ${
                        location.pathname === '/support/tickets' ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        Support Tickets
                      </div>
                    </Link>
                    <Link
                      to="/support/ban-appeal"
                      className={`block rounded-md px-6 py-2 text-sm transition-all hover:bg-emerald-500/10 hover:text-emerald-400 ${
                        location.pathname === '/support/ban-appeal' ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        Ban Appeal
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Vote Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('vote')}
                className={`group flex items-center gap-1 font-minecraft transition-all hover:-translate-y-0.5 hover:text-emerald-400 ${
                  location.pathname.startsWith('/vote') || activeDropdown === 'vote'
                    ? "text-emerald-400"
                    : "text-gray-400"
                }`}
              >
                Vote
                <span className={`transition-transform duration-200 ${activeDropdown === 'vote' ? 'rotate-180' : ''}`}>
                  ▾
                </span>
              </button>
              
              {/* Vote Dropdown Menu */}
              {activeDropdown === 'vote' && (
                <div className="absolute left-0 top-full mt-1 animate-fadeIn">
                  <div className="rounded-lg border border-gray-800 bg-black/95 p-1.5 shadow-xl">
                    <Link
                      to="/vote"
                      className={`block rounded-md px-6 py-2 text-sm transition-all hover:bg-emerald-500/10 hover:text-emerald-400 ${
                        location.pathname === '/vote' ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        Vote Now
                      </div>
                    </Link>
                    <Link
                      to="/top-voters"
                      className={`block rounded-md px-6 py-2 text-sm transition-all hover:bg-emerald-500/10 hover:text-emerald-400 ${
                        location.pathname === '/top-voters' ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        Top Voters
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/suggestions" active={location.pathname === "/suggestions"}>Suggestions</NavLink>
            <NavLink to="/team" active={location.pathname === "/team"}>Team</NavLink>
          </div>
        </div>

        {/* Right Section: Store and User Menu */}
        <div className="flex items-center gap-4">
          <a 
            href="https://store.qwmc.net" 
            target="_blank" 
            rel="noopener noreferrer"
            className="minecraft-button bg-emerald-600 hover:bg-emerald-700"
          >
            Store
          </a>
          
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`font-minecraft transition-all hover:-translate-y-0.5 hover:text-emerald-400 ${
        active ? "text-emerald-400" : "text-gray-400"
      }`}
    >
      {children}
    </Link>
  );
} 