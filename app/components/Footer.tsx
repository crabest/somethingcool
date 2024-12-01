import { Link } from "@remix-run/react";
import { DiscordIcon, Twitter, YouTube, Instagram } from "./Icons";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black/80 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-minecraft text-emerald-400 text-lg mb-4">About QWMC</h3>
            <p className="text-gray-400 text-sm">
              QWMC is a Minecraft server community focused on providing the best gaming experience for our players.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-minecraft text-emerald-400 text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/rules" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Rules
                </Link>
              </li>
              <li>
                <Link to="/applications" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Join Our Team
                </Link>
              </li>
              <li>
                <a 
                  href="https://store.qwmc.net" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                >
                  Store
                </a>
              </li>
              <li>
                <Link to="/vote" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Vote
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-minecraft text-emerald-400 text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-minecraft text-emerald-400 text-lg mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://discord.gg/qwmc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <DiscordIcon className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com/qwmc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="https://youtube.com/qwmc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <YouTube className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com/qwmc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} QWMC. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Not affiliated with Mojang AB
          </p>
        </div>
      </div>
    </footer>
  );
} 