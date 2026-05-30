import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout()
            .then(() => toast.success("Logged out!"))
            .catch(() => toast.error("Logout failed"));
    };

    const navLinks = (
        <>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-teal-400 font-semibold" : "hover:text-teal-400 transition"}>Home</NavLink>
            {user && (
                <NavLink to="/my-bookings" className={({ isActive }) => isActive ? "text-teal-400 font-semibold" : "hover:text-teal-400 transition"}>My Bookings</NavLink>
            )}
        </>
    );

    return (
        <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-teal-400 tracking-wide">
                    Care<span className="text-white">.xyz</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6 text-sm">
                    {navLinks}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <img
                                src={user.photoURL || "https://i.ibb.co/placeholder.png"}
                                alt="avatar"
                                title={user.displayName || user.email}
                                className="w-9 h-9 rounded-full border-2 border-teal-400 object-cover"
                            />
                            <button
                                onClick={handleLogout}
                                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm transition"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white px-4 py-2 rounded-lg text-sm transition">Login</Link>
                            <Link to="/register" className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm transition">Register</Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white text-2xl" onClick={() => setOpen(!open)}>
                    {open ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-gray-800 px-6 py-4 flex flex-col gap-4 text-sm">
                    {navLinks}
                    {user ? (
                        <button onClick={handleLogout} className="bg-teal-500 text-white px-4 py-2 rounded-lg">Logout</button>
                    ) : (
                        <>
                            <Link to="/login" className="border border-teal-400 text-teal-400 px-4 py-2 rounded-lg text-center">Login</Link>
                            <Link to="/register" className="bg-teal-500 text-white px-4 py-2 rounded-lg text-center">Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;