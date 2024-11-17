import "./App.css";
import Router from "./router/Router";
import { Toaster } from "./components/ui/toaster";
import AlertModal from "./components/shared/AlertModal";

function App() {
  return (
    <>
      <main className="flex h-screen">
        <Router />
      </main>
      <Toaster />
      <AlertModal />
    </>
  );
}

export default App;
