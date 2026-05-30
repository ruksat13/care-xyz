import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Login to your Care.xyz account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              required
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-9 text-gray-400"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium transition"
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-teal-500 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;