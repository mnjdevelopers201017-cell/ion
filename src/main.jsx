import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

console.log("[Ion Debug] Main: PUBLISHABLE_KEY found:", !!PUBLISHABLE_KEY);

if (!PUBLISHABLE_KEY) {
  console.error("Missing Publishable Key. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file.");
}

console.log("[Ion Debug] Main: Attempting to render root...");
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
console.log("[Ion Debug] Main: render() called");

