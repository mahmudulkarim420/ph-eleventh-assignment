// HowItWorks.jsx
import React from "react";
import { FaRegClipboard, FaRegHandshake, FaRegSmile } from "react-icons/fa";

const steps = [
  { icon: <FaRegClipboard size={30} />, title: "Book a Service", desc: "Choose your desired service and book online easily." },
  { icon: <FaRegHandshake size={30} />, title: "Consultation", desc: "Discuss your requirements with our expert team." },
  { icon: <FaRegSmile size={30} />, title: "Enjoy Decor", desc: "Sit back and enjoy your beautifully decorated space." },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-6 md:px-5 text-white">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-blue-500">
        How <span className="text-white">It Works</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-gray-700 p-6 rounded-2xl text-center hover:shadow-xl transition duration-300">
            <div className="text-blue-500 w-12 mx-auto mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-300">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
