import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success('Login Successful!');
        navigate('/dashboard');
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    googleLogin()
      .then(() => {
        toast.success('Google login successful!');
        navigate('/home');
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="bg-[#073b37]/40 backdrop-blur-xl border border-[#F9BC60]/20 p-8 rounded-2xl w-full max-w-md shadow-2xl text-white">

        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-lg bg-[#002725] border border-[#F9BC60]/30 text-white focus:ring-2 focus:ring-[#F9BC60] outline-none transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg bg-[#002725] border border-[#F9BC60]/30 text-white focus:ring-2 focus:ring-[#F9BC60] outline-none transition"
          />

          <button
            type="submit"
            className="w-full bg-[#F9BC60] hover:bg-[#e3a14d] text-[#004643] transition py-3 rounded-lg font-semibold text-lg duration-300 shadow-md hover:scale-[1.02]"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <div className="mt-5">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 duration-300"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="google"
              className="w-5"
            />
            Continue with Google
          </button>
        </div>

        <p className="mt-5 text-center text-gray-300">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#F9BC60] font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
