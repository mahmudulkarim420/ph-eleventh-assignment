// About.jsx
import React from "react";
import { FaBullseye, FaEye, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  const features = [
    {
      icon: <FaBullseye className="w-8 h-8 text-[#F9BC60]" />,
      title: "Our Mission",
      description:
        "To deliver high-quality services that exceed client expectations.",
    },
    {
      icon: <FaEye className="w-8 h-8 text-[#F9BC60]" />,
      title: "Our Vision",
      description:
        "To be a trusted name in the industry, known for innovation and excellence.",
    },
    {
      icon: <FaHandshake className="w-8 h-8 text-[#F9BC60]" />,
      title: "Our Values",
      description:
        "Integrity, creativity, and commitment to client satisfaction.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-5 text-gray-200">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-white"
        >
          About <span className="text-[#F9BC60]">Us</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-300 mb-16 max-w-3xl mx-auto"
        >
          We are passionate about providing the best services to our clients.
          Our team works tirelessly to deliver quality, creativity, and
          reliability.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-[#042927] rounded-3xl p-8 shadow-2xl hover:shadow-[#F9BC60]/50 transition transform hover:-translate-y-2"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-[#F9BC60] text-center">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
