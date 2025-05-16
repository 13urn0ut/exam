import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "./contexts/Context";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";
import Item from "./pages/Item";

const App = () => {
  return (
    <>
      <ContextProvider>
        <Toaster />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/additem" element={<Item />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ContextProvider>
    </>
  );
};

export default App;
