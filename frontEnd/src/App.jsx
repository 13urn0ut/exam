import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { Context, ContextProvider } from "./contexts/Context";

const App = () => {
  return (
    <>
      <ContextProvider>
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
