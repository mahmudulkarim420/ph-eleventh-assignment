// HowItWorks.jsx
import React from "react";
import { FaRegClipboard, FaRegHandshake, FaRegSmile } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  { icon: <FaRegClipboard size={30} />, title: "Book a Service", desc: "Choose your desired service and book online easily." },
  { icon: <FaRegHandshake size={30} />, title: "Consultation", desc: "Discuss your requirements with our expert team." },
  { icon: <FaRegSmile size={30} />, title: "Enjoy Decor", desc: "Sit back and enjoy your beautifully decorated space." },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-6 md:px-5 text-white">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        How <span className="text-[#F9BC60]">It Works</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            className="bg-[#F9BC60] p-6 rounded-2xl text-center cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.3)" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <div className="text-[#004643] w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-[#004643] mb-2">{step.title}</h3>
            <p className="text-gray-700">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
