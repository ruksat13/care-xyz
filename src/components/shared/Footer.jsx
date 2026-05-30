import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-teal-400 mb-3">Care<span className="text-white">.xyz</span></h2>
                    <p className="text-sm leading-relaxed">
                        Reliable and trusted care services for children, elderly, and family members. Making caregiving easy, secure, and accessible.
                    </p>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/service/1" className="hover:text-teal-400 transition">Baby Care</Link></li>
                        <li><Link to="/service/2" className="hover:text-teal-400 transition">Elderly Care</Link></li>
                        <li><Link to="/service/3" className="hover:text-teal-400 transition">Sick People Care</Link></li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-teal-400 transition">Home</Link></li>
                        <li><Link to="/my-bookings" className="hover:text-teal-400 transition">My Bookings</Link></li>
                        <li><Link to="/login" className="hover:text-teal-400 transition">Login</Link></li>
                        <li><Link to="/register" className="hover:text-teal-400 transition">Register</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Contact Us</h3>
                    <ul className="space-y-2 text-sm">
                        <li>📧 support@care.xyz</li>
                        <li>📞 +880 1700 000000</li>
                        <li>📍 Dhaka, Bangladesh</li>
                    </ul>
                    <div className="flex gap-4 mt-4 text-xl">
                        <a href="#" className="hover:text-teal-400 transition"><FaFacebook /></a>
                        <a href="#" className="hover:text-teal-400 transition"><FaTwitter /></a>
                        <a href="#" className="hover:text-teal-400 transition"><FaInstagram /></a>
                        <a href="#" className="hover:text-teal-400 transition"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Care.xyz — All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;