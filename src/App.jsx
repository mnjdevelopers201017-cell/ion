import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { App as CapacitorApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import IonChat from "./pages/IonChat";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  console.log("[Ion Debug] App: Component executing");
  const { isLoaded, isSignedIn } = useUser();
  const { setActive } = useClerk();
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

  useEffect(() => {
    // Listen for deep links
    CapacitorApp.addListener('appUrlOpen', async (event) => {
      console.log("[Ion Debug] Deep Link received:", event.url);

      if (event.url.includes('com.mnj.ion://oauth')) {
        try {
          // Extract the token/session from the URL if provided by Clerk
          // Clerk typically sends the token in a query parameter or fragment
          const url = new URL(event.url);
          const params = new URLSearchParams(url.search);
          const token = params.get('token') || params.get('ticket');

          if (token) {
            // For headless OAuth, we typically use a ticket or session ID
            // This part assumes the Clerk configuration redirects back with a session identifier
            await setActive({ session: token });
            console.log("[Ion Debug] Session activated via deep link");
            setPage("dashboard");
          } else {
            console.warn("[Ion Debug] Deep link received but no token found in URL");
          }

          // Close the system browser if it was used for OAuth
          await Browser.close();
        } catch (err) {
          console.error("[Ion Debug] Error handling OAuth deep link:", err);
        }
      }
    });

    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, [setActive]);

  if (!isLoaded) {
    console.log("[Ion Debug] App: Returning Loading state");
    return <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">Loading...</div>;
  }

  console.log("[Ion Debug] App: Rendering page:", page);

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
      return <Home setPage={setPage} />;
  }
}


