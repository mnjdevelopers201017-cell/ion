import { useState } from "react";
import { useSignUp, useClerk } from "@clerk/clerk-react";

export default function SignUp({ setPage }) {
  const { isLoaded, signUp } = useSignUp();
  const { setActive } = useClerk();
  const [step, setStep] = useState("create"); // 'create' or 'verify'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification();
      setStep("verify");
    } catch (err) {
      console.error("Sign Up Error:", err);
      setError(err.errors?.[0]?.message || "An unexpected error occurred.");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) return;

    try {
      const result = await signUp.attemptFirstFactor({
        strategy: "email_code",
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setPage("dashboard");
      } else {
        setError("Verification failed. Please check the code.");
      }
    } catch (err) {
      console.error("Verification Error:", err);
      setError(err.errors?.[0]?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white p-4">
      <form 
        onSubmit={step === "create" ? handleSignUp : handleVerify} 
        className="w-full max-w-md space-y-6 bg-[#0a0e25] p-8 rounded-2xl border border-blue-500/20 shadow-2xl"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {step === "create" ? "Create Account" : "Verify Email"}
          </h1>
          <p className="text-slate-400">
            {step === "create" 
              ? "Join the futuristic world of Ion" 
              : `Enter the code sent to ${email}`}
          </p>
        </div>

        <div className="space-y-4">
          {step === "create" ? (
            <>
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
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Verification Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#050816] border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-center tracking-widest"
                placeholder="123456"
                required
              />
            </div>
          )}
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
          {step === "create" ? "Create Account" : "Verify Email"}
        </button>

        <div className="text-center text-sm text-slate-400">
          {step === "create" ? (
            <>Already have an account?{" "}
              <button 
                type="button"
                onClick={() => setPage("signin")}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign In
              </button>
            </>
          ) : (
            <>Something wrong?{" "}
              <button 
                type="button"
                onClick={() => setStep("create")}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Back to Sign Up
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
