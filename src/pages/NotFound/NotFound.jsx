import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
            <FaExclamationTriangle className="text-teal-400 text-8xl mb-6" />
            <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-3">Page Not Found</h2>
            <p className="text-gray-400 max-w-md mb-8">
                Oops! The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-semibold transition"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;