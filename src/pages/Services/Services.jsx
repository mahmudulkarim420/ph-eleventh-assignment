// Services.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Spinner from "../../components/Spinner/Spinner";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(
          "https://ph-eleventh-assignment-server.vercel.app/services"
        );
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
    return (
      <p>
        <Spinner />
      </p>
    );

  if (error) return <p className="text-center mt-20 text-lg font-medium text-red-500">{error}</p>;

  return (
    <section className="py-20 px-6 md:px-5 text-gray-200">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-white">
        Our <span className="text-[#F9BC60]">Services</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-[#F9BC60] border border-gray-700 backdrop-blur-xl
              rounded-3xl shadow-xl overflow-hidden hover:shadow-yellow-700/30 hover:-translate-y-2 
              transition-all duration-300 flex flex-col"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-60 object-cover opacity-90 hover:opacity-100 transition duration-300 rounded-t-2xl"
            />

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-semibold mb-3 text-[#004643]">{service.title}</h3>

              <p className="text-gray-600 mb-4">{service.description}</p>

              <div className="flex flex-col gap-2 font-medium ">
                {service.priceRange && (
                  <span className="text-[#004643]">Price: {service.priceRange}</span>
                )}
                {service.duration && (
                  <span className="text-[#004643]">Duration: {service.duration}</span>
                )}
                {service.rating && (
                  <span className="text-[#004643]">Rating: {service.rating} ⭐</span>
                )}
              </div>

              {/* Right-aligned View Details Button */}
              <div className="mt-auto flex justify-end">
                <motion.button
                  onClick={() => navigate(`/services/${service._id}`)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-bold mt-4 rounded-md px-6 py-3 bg-gradient-to-r from-[#004643] to-[#004643] text-[#F9BC60] relative overflow-hidden group z-0 hover:text-white hover:from-[#fac05e] hover:to-[#e0a200] duration-1000"
                >
                  <span className="absolute bg-[#004643] size-80 rounded-full group-hover:scale-150 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                  <span className="absolute bg-[#b68f3c] size-80 -left-2 -top-10 rounded-full group-hover:scale-150 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
