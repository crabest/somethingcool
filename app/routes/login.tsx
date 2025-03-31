import { useState } from "react";
import { json, redirect } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { verifyLogin } from "~/models/user.server";
import { createUserSession } from "~/session.server";

export const meta = () => {
  return [
    { title: "Login - QWMC" },
    { name: "description", content: "Login to your QWMC account" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const remember = formData.get("remember") === "on";

  if (!email || !password) {
    return json(
      { errors: { email: "Email is required", password: "Password is required" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);
  if (!user) {
    return json(
      { errors: { general: "Invalid email or password" } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember,
    redirectTo: "/",
  });
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const response = await fetch('/login', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.errors?.general || "Login failed");
      }

      // If successful, the server will redirect us
      window.location.href = '/';
    } catch (err) {
      console.error('Login error:', err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/minecraft-bg.jpg')] bg-cover bg-center bg-fixed mt-12">
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black/50 to-black/70">
        <div className="w-full max-w-md px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-minecraft text-4xl text-emerald-400">
              Welcome Back
            </h1>
            <p className="mt-2 text-gray-400">
              Login to your account
            </p>
          </div>

          {/* Login Form */}
          <div className="minecraft-border rounded-lg bg-black/50 p-8">
            {actionData?.errors?.general && (
              <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-center text-sm text-red-400">
                {actionData.errors.general}
              </div>
            )}

            <form method="post" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="minecraft-border w-full bg-black/50 p-3 text-white transition-colors focus:border-emerald-400/50"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="minecraft-border w-full bg-black/50 p-3 text-white transition-colors focus:border-emerald-400/50"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={formData.remember}
                    onChange={(e) => setFormData(prev => ({ ...prev, remember: e.target.checked }))}
                    className="h-4 w-4 rounded border-gray-800"
                    disabled={isLoading}
                  />
                  <label htmlFor="remember" className="text-sm text-gray-400">
                    Remember me
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Forgot password?
                </Link>
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
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 