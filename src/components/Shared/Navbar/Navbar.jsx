import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider.jsx";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-2 pb-1 transition font-medium ${
              isActive
                ? "text-white border-b-2 border-white"
                : "text-[#004643] hover:text-white"
            }`
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `px-2 pb-1 transition font-medium ${
              isActive
                ? "text-white border-b-2 border-white"
                : "text-[#004643] hover:text-white"
            }`
          }
        >
          Services
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-2 pb-1 transition font-medium ${
              isActive
                ? "text-white border-b-2 border-white"
                : "text-[#004643] hover:text-white"
            }`
          }
        >
          About
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `px-2 pb-1 transition font-medium ${
              isActive
                ? "text-white border-b-2 border-[#004643]"
                : "text-[#004643] hover:text-white"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar backdrop-blur-md bg-[#F9BC60] border-b border-white/10 text-white shadow-md sticky top-0 z-50">
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold text-[#004643]">StyleDecor</Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden md:flex">
        <ul className=" menu-horizontal gap-6">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <img className="w-10 rounded-full" src={user?.photoURL} alt="profile" />
            </label>
            <ul tabIndex={0} className="dropdown-content bg-base-100 rounded-box shadow p-2 w-48">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={logOut}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn bg-[#004643] text-[#F9BC60] btn-sm px-5">Login</Link>
        )}

        {/* Mobile Menu */}
        <div className="dropdown md:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <Menu size={22}/>
          </label>
          <ul tabIndex={0} className="dropdown-content bg-base-100 shadow rounded-box p-3 w-40">
            {navLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
