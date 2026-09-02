import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./hooks/useTheme";
import { LazyMotion, domAnimation } from "./lib/motion";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LazyMotion features={domAnimation} strict>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LazyMotion>
  </StrictMode>,
);
