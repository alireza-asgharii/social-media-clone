import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

import AuthProvider from "./context/AuthContext.tsx";
import QueryProvider from "./lib/react-query/QueryProvider.tsx";
import ModalProvider from "./context/ModalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <ModalProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ModalProvider>
    </QueryProvider>
  </BrowserRouter>,
);
