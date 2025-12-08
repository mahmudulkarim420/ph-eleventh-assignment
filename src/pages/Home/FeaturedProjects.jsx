// FeaturedProjects.jsx
import React from "react";
import { motion } from "framer-motion";

const projects = [
  { title: "Luxury Wedding Decor", img: "https://i.ibb.co.com/tMnfvSM1/0402e03ab283f85e59b9c975cac4b4bf.jpg" },
  { title: "Modern Home Interior", img: "https://i.ibb.co.com/Q7SDdNLL/f8fae0359ec8774acf6c3da3fc068171.jpg" },
  { title: "Corporate Office Setup", img: "https://i.ibb.co.com/zh1Jzprg/5f18e71664f3bf22da65e1c79cfb9a01.jpg" },
  { title: "Event Lighting Design", img: "https://i.ibb.co.com/1GYRnDsm/37c625c8a1a09d739e4c3288ed54341a.jpg" },
];

const FeaturedProjects = () => {
  return (
    <section className="py-20 px-6 md:px-5 text-white">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Featured <span className="text-[#F9BC60]">Projects</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.3)" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <img src={project.img} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-4 bg-[#F9BC60]">
              <h3 className="text-lg font-semibold text-[#004643]">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
