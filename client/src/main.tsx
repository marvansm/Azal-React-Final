import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./App.tsx";
import TanstackQueryProvider from "./Provider/TanstackQueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackQueryProvider>
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center bg-white text-blue-900 font-bold">
            AZAL...
          </div>
        }
      >
        <App />
      </Suspense>
    </TanstackQueryProvider>
  </StrictMode>
);
