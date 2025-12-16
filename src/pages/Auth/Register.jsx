import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate, Link } from "react-router";
import { toast } from "react-hot-toast";
import registerImg from "../../assets/register.jfif";

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
      // 1️⃣ Upload image to imgbb
      const formData = new FormData();
      formData.append("image", photoFile);

      const uploadRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_YOUR_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );

      const imgData = await uploadRes.json();
      if (!imgData.success) {
        toast.error("Image upload failed!");
        setLoading(false);
        return;
      }

      const photoURL = imgData.data.url;

      // 2️⃣ Register user in Firebase
      await registerUser(email, password);

      // 3️⃣ Update Firebase profile
      await updateUserProfile(name, photoURL);
      toast.success("Profile Updated!");

      // 4️⃣ Save user to backend with default role 'user'
      try {
        const user = { name, email, photoURL, role: "user" };
        await fetch("https://ph-eleventh-assignment-server.vercel.app/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
      } catch (saveErr) {
        console.error("Failed to save user:", saveErr);
      }

      toast.success("Registration Successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    googleLogin()
      .then(async (loggedUser) => {
        const u = loggedUser;
        try {
          const user = {
            name: u.displayName || "",
            email: u.email,
            photoURL: u.photoURL || "",
            role: "user",
          };
          await fetch("https://ph-eleventh-assignment-server.vercel.app//users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
        } catch (err) {
          console.error("Save google user failed", err);
        }

        toast.success("Google login successful!");
        navigate("/");
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex w-full max-w-3xl rounded-lg overflow-hidden shadow-xl">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2">
          <img src={registerImg} alt="register" className="w-full h-[610px] object-cover" />
        </div>

        {/* Form side */}
        <div className="w-full md:w-1/2 p-6 bg-[#e0eee6] flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Create Account</h2>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-full py-2 mb-4 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-100 transition"
            disabled={loading}
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="flex items-center my-3">
            <hr className="flex-grow border-gray-400" />
            <span className="mx-2 text-gray-600 text-sm">OR</span>
            <hr className="flex-grow border-gray-400" />
          </div>

          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                required
                className="w-full p-2.5 border border-gray-300 rounded-md bg-white text-gray-700 placeholder-gray-500 
                focus:ring-[#56a877] focus:border-[#56a877] outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Profile Photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                required
                className="w-full text-sm text-gray-900 
                file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold 
                file:bg-[#004d40] file:text-white hover:file:bg-[#00382e]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                required
                className="w-full p-2.5 border border-gray-300 rounded-md bg-white text-gray-700 placeholder-gray-500 
                focus:ring-[#56a877] focus:border-[#56a877] outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                required
                className="w-full p-2.5 border border-gray-300 rounded-md bg-white text-gray-700 placeholder-gray-500 
                focus:ring-[#56a877] focus:border-[#56a877] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#004d40] hover:bg-[#00382e] text-white py-2.5 rounded-md 
                font-semibold text-base mt-4 transition duration-300"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600 text-sm">
            Already have an account?
            <Link to="/login" className="text-[#004d40] font-bold hover:underline ml-1">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
