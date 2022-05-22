import { NavLink } from "react-router-dom";
import Notification from "./Notification";

const Navbar = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/imagegallery">Image Gallery</NavLink>
      <NavLink to="/treenode">Tree Node</NavLink>
      <NavLink to="/imagecard">Image Card</NavLink>
      <NavLink to="/sample">Sample</NavLink>
      <Notification />
    </div>
  );
};

export default Navbar;
