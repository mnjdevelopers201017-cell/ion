import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";

export default function SignIn({ setPage }) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setPage("dashboard");
      } else {
        console.log("SignIn status:", result.status);
        setError("Authentication failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Sign In Error:", err);
      setError(err.errors?.[0]?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white p-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md space-y-6 bg-[#0a0e25] p-8 rounded-2xl border border-blue-500/20 shadow-2xl"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-slate-400">Sign in to continue to Ion</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#050816] border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#050816] border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/20"
        >
          Sign In
        </button>

        <div className="text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <button 
            type="button"
            onClick={() => setPage("signup")}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
