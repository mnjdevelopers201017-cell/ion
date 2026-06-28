import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import IonChat from "./pages/IonChat";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  const { isLoaded, isSignedIn } = useUser();
  const [page, setPage] = useState("home");

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        setPage("dashboard");
      } else {
        setPage("home");
      }
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">Loading...</div>;
  }

  // If signed in, we might want to restrict some pages or handle routing differently.
  // For now, we'll allow manual page switching if needed, but the default will be dashboard.

  switch (page) {
    case "signin":
      return <SignIn setPage={setPage} />;

    case "signup":
      return <SignUp setPage={setPage} />;

    case "dashboard":
      return <Dashboard setPage={setPage} />;

    case "ionchat":
      return <IonChat setPage={setPage} />;

    default:
      // If user is signed in and on home, maybe they should be on dashboard?
      // The useEffect handles this.
      return <Home setPage={setPage} />;
  }
}

