import { useState } from "react";
import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Register - QWMC" },
    { name: "description", content: "Create your QWMC account" },
  ];
};

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    if (!/^[a-zA-Z0-9_]{3,16}$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }
    if (!formData.email.includes('@')) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // TODO: Implement registration logic
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        console.log('Registration attempt:', formData);
      } catch (err) {
        setErrors(prev => ({ ...prev, general: "Failed to create account. Please try again." }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-center bg-fixed mt-12">
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black/50 to-black/70">
        <div className="w-full max-w-md px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-minecraft text-4xl text-emerald-400">
              Create Account
            </h1>
            <p className="mt-2 text-gray-400">
              Join our Minecraft community
            </p>
          </div>

          {/* Registration Form */}
          <div className="minecraft-border rounded-lg bg-black/50 p-8">
            {errors.general && (
              <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-center text-sm text-red-400">
                {errors.general}
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
                  className={`minecraft-border w-full bg-black/50 p-3 text-white transition-colors focus:border-emerald-400/50 ${
                    errors.username ? 'border-red-500' : ''
                  }`}
                  required
                  maxLength={16}
                  placeholder="3-16 characters"
                  disabled={isLoading}
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-red-400">{errors.username}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`minecraft-border w-full bg-black/50 p-3 text-white transition-colors focus:border-emerald-400/50 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  required
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className={`minecraft-border w-full bg-black/50 p-3 text-white transition-colors focus:border-emerald-400/50 ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                  required
                  placeholder="Minimum 8 characters"
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className={`minecraft-border w-full bg-black/50 p-3 text-white transition-colors focus:border-emerald-400/50 ${
                    errors.confirmPassword ? 'border-red-500' : ''
                  }`}
                  required
                  placeholder="Re-enter your password"
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-800"
                  required
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the{' '}
                  <Link to="/terms" className="text-emerald-400 hover:text-emerald-300">
                    Terms of Service
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`minecraft-button relative w-full bg-emerald-600 py-3 text-lg transition-colors
                  ${isLoading ? 'cursor-not-allowed bg-emerald-600/50' : 'hover:bg-emerald-700'}`}
              >
                {isLoading ? (
                  <>
                    <span className="opacity-0">Create Account</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    </div>
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Login here
              </Link>
            </p>
          </div>

          {/* Help Section */}
          <div className="mt-8 rounded-lg border border-gray-800 bg-black/50 p-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">❓</span>
              <p className="text-center text-sm text-gray-400">
                Need help? Contact us on{' '}
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