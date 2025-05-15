import { useContext } from "react";
import { Context } from "../contexts/Context";

const Main = ({ children }) => {
  const { loading, error } = useContext(Context);

  return (
    <main className="main">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {children}
    </main>
  );
};

export default Main;
