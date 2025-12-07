import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCTA = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  // Framer motion variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-black text-white min-h-[90vh] flex items-center justify-center px-6 md:px-20 overflow-hidden">
      <div className="max-w-5xl text-center z-10">
        <motion.h1
          className="text-4xl md:text-7xl font-extrabold mb-6 leading-snug"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          Create <span className="text-primary">Beautiful Spaces</span> <br />
          with <span className="text-purple-400">Ease & Style</span>
        </motion.h1>

        <motion.p
          className="text-gray-300 text-lg md:text-2xl mb-8"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          Discover our services, manage your projects effortlessly, and enjoy
          smooth role-based access. Everything you need for your perfect
          space is just a click away.
        </motion.p>

        <motion.button
          onClick={handleCTA}
          className="bg-primary hover:bg-blue-700 transition px-10 py-5 rounded-xl font-semibold text-lg md:text-xl shadow-lg"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          {user ? "Go to Dashboard" : "Get Started"}
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
