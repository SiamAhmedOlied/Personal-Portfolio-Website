import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import * as Sentry from "@sentry/react";

// Initialize Sentry for error tracking
Sentry.init({
  dsn: "", // Add your Sentry DSN here when available
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
