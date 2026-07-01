import { useState, useEffect } from "react";
import { useUser, useClerk, useSignIn } from "@clerk/clerk-react";
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
  const { signIn } = useSignIn();
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
          // Complete the Clerk OAuth session using the full redirect URL
          const result = await signIn.create({
            strategy: 'oauth_google',
            url: event.url,
          });

          if (result.status === 'complete') {
            await setActive({ session: result.createdSessionId });
            console.log("[Ion Debug] Session activated via deep link");
            setPage("dashboard");
          }

          // Close the system browser
          await Browser.close();
        } catch (err) {
          console.error("[Ion Debug] Error handling OAuth deep link:", err);
          await Browser.close();
        }
      }
    });

    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, [setActive, signIn]);

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


