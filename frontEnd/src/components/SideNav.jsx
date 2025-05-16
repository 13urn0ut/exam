import { NavLink } from "react-router";
import { useContext } from "react";
import { Context } from "../contexts/Context";

const SideNav = () => {
  const { user } = useContext(Context);

  return (
    <aside className="side-nav">
      <nav>
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          {user?.role === "user" && (
            <>
              <li>
                <NavLink to="/additem">Add Item</NavLink>
              </li>
              <li>
                <NavLink to="/myitems">My Items</NavLink>
              </li>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <li>
                <NavLink to="/admin">Admin Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/categories">Categories</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;
