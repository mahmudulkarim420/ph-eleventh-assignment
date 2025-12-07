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
    const photoFile = form.photo.files[0]; // image file
    const email = form.email.value;
    const password = form.password.value;

    try {
      // 1️⃣ Upload to imgbb
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

      const photoURL = imgData.data.url;  // uploaded photo url

      // 2️⃣ Register user in Firebase
      const result = await registerUser(email, password);

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
    <div className="min-h-screen flex items-center justify-center text-white px-4">
      <div className="bg-[#0c1326] p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-3 rounded bg-[#0a0d1a] border border-gray-700 text-white"
          />

          <input
            type="file"
            name="photo"
            accept="image/*"
            required
            className="w-full p-3 rounded bg-[#0a0d1a] border border-gray-700 text-white"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded bg-[#0a0d1a] border border-gray-700 text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded bg-[#0a0d1a] border border-gray-700 text-white"
          />

          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-700 transition py-3 rounded font-semibold"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleLogin}
            className="btn w-full py-6 bg-white text-black border-[#e5e5e5]"
          >
            Login with Google
          </button>
        </div>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
