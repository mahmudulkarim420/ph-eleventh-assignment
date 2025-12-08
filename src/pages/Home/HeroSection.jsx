import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCTA = () => {
    if (user) navigate('/dashboard');
    else navigate('/login');
  };

  // animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <section className="relative bg-gradient-to-r from-[#004643] via-[#003a37] to-[#001f1d] text-white min-h-[90vh] flex items-center justify-center px-6 md:px-20 overflow-hidden">
      <div className="max-w-5xl text-center z-10">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-5xl font-bold mb-6 leading-snug"
        >
          Transform Your Living Space <br />
          with <span className="text-[#F9BC60] font-extrabold">Elegance</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="text-gray-300 text-lg md:text-2xl mb-8 max-w-3xl mx-auto"
        >
          Premium interior solutions, easy project tracking, and smooth
          role-based access — all in one platform to enhance your Home
          Decoration experience.
        </motion.p>

        <motion.button
          onClick={handleCTA}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="font-bold mt-4 rounded-md px-8 py-5 bg-gradient-to-r from-[#F9BC60] to-[#fac05e] text-[#004643] relative overflow-hidden group z-0 hover:text-white hover:from-[#fac05e] hover:to-[#e0a200] duration-1000"
        >
          <span className="absolute bg-[#004643] size-80 rounded-full group-hover:scale-150 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
          <span className="absolute bg-[#e0b14b] size-80 -left-2 -top-10 rounded-full group-hover:scale-150 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
          {user ? 'Go to Dashboard' : 'Get Started'}
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
