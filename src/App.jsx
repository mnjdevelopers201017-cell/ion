import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import IonChat from "./pages/IonChat";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  console.log("[Ion Debug] App: Component executing");
  const { isLoaded, isSignedIn } = useUser();
  const [page, setPage] = useState("home");

  console.log("[Ion Debug] App: isLoaded =", isLoaded, "| isSignedIn =", isSignedIn);

  useEffect(() => {
    console.log("[Ion Debug] App: useEffect triggered. isLoaded =", isLoaded);
    if (isLoaded) {
      if (isSignedIn) {
        console.log("[Ion Debug] App: Setting page to dashboard");
        setPage("dashboard");
      } else {
        console.log("[Ion Debug] App: Setting page to home");
        setPage("home");
      }
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    console.log("[Ion Debug] App: Returning Loading state");
    return <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">Loading...</div>;
  }

  console.log("[Ion Debug] App: Rendering page:", page);

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

