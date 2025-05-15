import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { Context, ContextProvider } from "./contexts/Context";

const App = () => {
  return (
    <>
      <ContextProvider>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </ContextProvider>
    </>
  );
};

export default App;
