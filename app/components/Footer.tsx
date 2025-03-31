import { Link } from "@remix-run/react";
import { DiscordIcon, Twitter, YouTube, Instagram } from "./Icons";

// Define icon components inline to fix type errors
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

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

        {/* Bottom Bar with QWMC Labs */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} QWMC. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Powered by{" "}
              <a 
                href="https://labs.qwmc.net" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                QWMC Labs
              </a>
            </p>
          </div>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Not affiliated with Mojang AB
          </p>
        </div>
      </div>
    </footer>
  );
} 