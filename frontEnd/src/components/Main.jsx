import { useContext } from "react";
import { Context } from "../contexts/Context";
import SideNav from "./SideNav";

const Main = ({ children }) => {
  const { loading, error } = useContext(Context);

  return (
    <main className="main">
      {loading && <p>Loading...</p>}

      <SideNav />
      {error && <p className="error">{error}</p>}
      <div className="content">{children}</div>
    </main>
  );
};

export default Main;
