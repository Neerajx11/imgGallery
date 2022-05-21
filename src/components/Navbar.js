import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/imagegallery">Image Gallery</NavLink>
      <NavLink to="/treenode">Tree Node</NavLink>
      <NavLink to="/imagecard">Image Card</NavLink>
    </div>
  );
};

export default Navbar;
