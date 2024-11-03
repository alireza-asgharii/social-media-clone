import "./App.css";
import Router from "./router/Router";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <main className="flex h-screen">
        <Router />
      </main>
      <Toaster />
    </>
  );
}

export default App;
