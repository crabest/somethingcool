import { useState, useEffect, useRef } from "react";
import { Link, useFetcher } from "@remix-run/react";

interface User {
  username: string;
  role?: string;
}

export function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fetcher = useFetcher();

  useEffect(() => {
    // Handle clicks outside dropdown
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Separate useEffect for user data
  useEffect(() => {
    const storedUser = document.cookie.split('; ').find(row => row.startsWith('userInfo='))?.split('=')[1];
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.username) {  // Verify the parsed data has required fields
          setUser(parsedUser);
        } else {
          console.error('Invalid user data format', typeof parsedUser);
        //   localStorage.removeItem('user');
        }
      } catch (e) {
        console.error('Failed to parse user data:', e);
        localStorage.removeItem('user');
      }
    }
  }, []); // Run only once on mount

  const handleLogout = async () => {
    try {
      // Make a POST request to /logout
      await fetch('/logout', { method: 'POST' });
      
      // Clear cookies manually as backup
      // document.cookie = "userInfo=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      // document.cookie = "__session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      
      // Update UI
      setUser(null);
      setShowDropdown(false);
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return (
      <Link
        to="/login"
        className="minecraft-button bg-gray-700 hover:bg-gray-600"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="group flex items-center gap-2 rounded-lg border border-gray-800 bg-black/50 px-3 py-2 transition-all hover:border-emerald-400/30"
      >
        <div className="relative">
          <img
            src={`https://mc-heads.net/avatar/${user.username}`}
            alt={user.username}
            className="h-8 w-8 rounded transition-transform group-hover:scale-110"
          />
          <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-gray-900 bg-emerald-500"></div>
        </div>
        <span className="font-minecraft text-sm text-gray-400 group-hover:text-emerald-400">
          {user.username}
        </span>
        <span className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-1 w-48 animate-fadeIn">
          <div className="rounded-lg border border-gray-800 bg-black/95 p-1.5 shadow-xl">
            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-400 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
              onClick={() => setShowDropdown(false)}
            >
              <span>👤</span> Profile
            </Link>
            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-400 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
                onClick={() => setShowDropdown(false)}
              >
                <span>⚙️</span> Admin Panel
              </Link>
            )}
            <div className="my-1 border-t border-gray-800"></div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
            >
              <span>🚪</span> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 