// WhatWeOffer.jsx
import React from "react";
import { Check } from "lucide-react"; // icon
import { motion } from "framer-motion";

const WhatWeOffer = () => {
  const services = [
    {
      title: "Home Decoration",
      desc: "Modern, stylish & theme-based home interior setups designed to elevate your home look beautifully.",
    },
    {
      title: "Ceremony & Event Decor",
      desc: "Wedding, Birthday, Anniversary, Mehendi or Corporate events—complete decoration arranged perfectly.",
    },
    {
      title: "Exceptional Service",
      desc: "We ensure premium service, on-time setup, & hassle-free decoration experience for every client.",
    },
    {
      title: "Customized Theme Design",
      desc: "Personalized theme based decoration matching your preference, color taste & celebration vibes.",
    },
  ];

  return (
    <section className="py-10 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          What <span className="text-[#F9BC60]">We Offer</span>
        </motion.h2>

        <motion.p
          className="text-gray-200 max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          We turn moments into magical memories with premium decoration service 
          designed with passion, creativity & elegance.
        </motion.p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          {services.map((item, i) => (
            <motion.div
              key={i}
              className="flex gap-3 items-start"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Icon */}
              <Check size={60} className="text-[#E16162] mt-1" />

              <div>
                <h3 className="text-lg font-semibold text-[#E16162] mb-1">{item.title}</h3>
                <p className="text-gray-200 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
