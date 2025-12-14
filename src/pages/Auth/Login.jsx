import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate, Link } from "react-router";
import { toast } from "react-hot-toast";
import loginImg from "../../assets/login.jfif";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Email + Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
      toast.success("Login Successful!");
      navigate("/"); // চাইলে /home করতেও পারো
    } catch (err) {
      console.log("Login Error:", err.code, err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Google Login Successful!");
      navigate("/");
    } catch (err) {
      console.log("Google Login Error:", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex w-full max-w-3xl rounded-lg overflow-hidden shadow-xl">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2">
          <img src={loginImg} alt="Login" className="w-full h-[500px] object-cover" />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-6 bg-[#e0eee6] flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Welcome Back!</h2>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-2 mb-4 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-5 h-5"
              alt="google"
            />
            Continue with Google
          </button>

          <div className="flex items-center my-3">
            <hr className="flex-grow border-t border-gray-400" />
            <span className="mx-2 text-gray-600 text-sm">OR</span>
            <hr className="flex-grow border-t border-gray-400" />
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                required
                className="w-full p-2.5 border text-gray-900 border-gray-300 rounded-md focus:border-[#56a877] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
                className="w-full p-2.5 border text-gray-900 border-gray-300 rounded-md focus:border-[#56a877] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#004d40] hover:bg-[#00382e] text-white py-2.5 rounded-md font-semibold transition duration-200"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#004d40] font-bold hover:underline">
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
