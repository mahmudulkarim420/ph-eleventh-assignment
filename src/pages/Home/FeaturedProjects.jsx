// FeaturedProjects.jsx
import React from "react";

const projects = [
  { title: "Luxury Wedding Decor", img: "https://source.unsplash.com/400x300/?wedding" },
  { title: "Modern Home Interior", img: "https://source.unsplash.com/400x300/?home" },
  { title: "Corporate Office Setup", img: "https://source.unsplash.com/400x300/?office" },
  { title: "Event Lighting Design", img: "https://source.unsplash.com/400x300/?lighting" },
];

const FeaturedProjects = () => {
  return (
    <section className="py-20 px-6 md:px-5 text-white">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-white">
        Featured <span className="text-[#F9BC60]">Projects</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, idx) => (
          <div key={idx} className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
            <img src={project.img} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-4 bg-[#F9BC60]">
              <h3 className="text-lg font-semibold">{project.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
