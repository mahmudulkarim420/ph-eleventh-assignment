import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
  const { registerUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const photoFile = form.photo.files[0];
    const email = form.email.value;
    const password = form.password.value;

    try {
      // 1️⃣ upload image to imgbb
      const formData = new FormData();
      formData.append("image", photoFile);

      const uploadRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_YOUR_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );

      const imgData = await uploadRes.json();
      if (!imgData.success) {
        toast.error("Image upload failed!");
        return;
      }

      const photoURL = imgData.data.url;

      // 2️⃣ Register user
      await registerUser(email, password);

      // 3️⃣ Update profile
      await updateUserProfile(name, photoURL);
      toast.success("Profile Updated!");

      toast.success("Registration Successful!");
      navigate("/dashboard");

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    googleLogin()
      .then(() => {
        toast.success("Google login successful!");
        navigate("/dashboard");
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-white">
      <div className="bg-[#073b37]/40 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md border border-[#F9BC60]/20 shadow-xl">

        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-lg bg-[#002725] border border-[#F9BC60]/30 text-white focus:ring-2 focus:ring-[#F9BC60] outline-none transition"
          />

          <input
            type="file"
            name="photo"
            accept="image/*"
            required
            className="w-full p-3 rounded-lg bg-[#002725] border border-[#F9BC60]/30 text-gray-300 cursor-pointer"
          />

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
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="mt-5 flex items-center justify-center gap-3 w-full py-3 bg-white text-black font-semibold rounded-lg duration-300 hover:bg-gray-200"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="google"
            className="w-5"
          />
          Continue with Google
        </button>

        <p className="mt-5 text-center text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-[#F9BC60] font-medium hover:underline">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
