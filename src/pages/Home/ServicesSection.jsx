// Services.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/services");
        setServices(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading)
    return <p className="text-center mt-20 text-lg font-medium">Loading services...</p>;

  if (error)
    return <p className="text-center mt-20 text-lg font-medium text-red-500">{error}</p>;

  return (
  <section className="py-20 px-6 md:px-5  text-gray-200">
  <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-white">
    Our <span className="text-[#F9BC60]">Services</span>
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {services.slice(0, 6).map(( service) => (
      <div
        key={service._id}
        className="bg-[#F9BC60] border border-gray-700 backdrop-blur-xl
        rounded-3xl shadow-xl overflow-hidden hover:shadow-yellow-700/30 hover:-translate-y-2 
        transition-all duration-300"
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-60 object-cover opacity-90 hover:opacity-100 transition duration-300"
        />

        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-3 text-[#004643]">
            {service.title}
          </h3>

          <p className="text-gray-600 mb-4">{service.description}</p>

          <div className="flex flex-col gap-2 font-medium mt-3">
            {service.priceRange && (
              <span className="text-[#004643]">Price: {service.priceRange}</span>
            )}
            {service.duration && (
              <span className="text-[#004643]">Duration: {service.duration}</span>
            )}
            {service.rating && (
              <span className="text-[#004643]">
                Rating: {service.rating} ⭐
              </span>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


  );
};

export default ServicesSection;
