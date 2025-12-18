import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./provider/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              maxWidth: "500px", // Overrides the default 350px limit
            },
          }}
        />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
