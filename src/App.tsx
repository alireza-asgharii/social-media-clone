import "./App.css";
import Router from "./router/Router";
import { Toaster } from "./components/ui/toaster";
import AlertModal from "./components/shared/AlertModal";
import { useUserContext } from "./context/AuthContext";
import Spiner from "./components/shared/Spinner";

function App() {
  const { isLoading } = useUserContext();
  console.log(isLoading);

  if (isLoading)
    return (
      <div className="flex-center h-screen">
        <Spiner />
      </div>
    );
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
