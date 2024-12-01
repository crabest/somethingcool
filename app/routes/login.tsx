import { useState } from "react";
import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Login - QWMC" },
    { name: "description", content: "Login to your QWMC account" },
  ];
};

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // TODO: Implement login logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log('Login attempt:', formData);
    } catch (err) {
      setError('Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-center bg-fixed">
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black/50 to-black/70">
        <div className="w-full max-w-md px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-minecraft text-4xl text-emerald-400">
              Login
            </h1>
            <p className="mt-2 text-gray-400">
              Sign in with your Minecraft account
            </p>
          </div>

          {/* Login Form */}
          <div className="minecraft-border rounded-lg bg-black/50 p-8">
            {error && (
              <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-center text-sm text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Minecraft Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="minecraft-border w-full bg-black/50 p-3 text-white transition-colors focus:border-emerald-400/50"
                  required
                  autoComplete="username"
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="minecraft-border w-full bg-black/50 p-3 text-white transition-colors focus:border-emerald-400/50"
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`minecraft-button relative w-full bg-emerald-600 py-3 text-lg transition-colors
                  ${isLoading ? 'cursor-not-allowed bg-emerald-600/50' : 'hover:bg-emerald-700'}`}
              >
                {isLoading ? (
                  <>
                    <span className="opacity-0">Login</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    </div>
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Register now
              </Link>
            </p>
          </div>

          {/* Help Section */}
          <div className="mt-8 rounded-lg border border-gray-800 bg-black/50 p-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">❓</span>
              <p className="text-center text-sm text-gray-400">
                Having trouble logging in? Contact us on{' '}
                <a 
                  href="https://discord.gg/yourserver" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Discord
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 