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
        const { data } = await axios.get("http://localhost:5000/services");
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
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-800">
        Our Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service) => (
          <div
            key={service._id} // MongoDB automatically _id field দিবে
            className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              {service.features && (
                <ul className="list-disc list-inside text-gray-500 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              )}
              <div className="flex flex-col gap-2 text-gray-700 font-medium">
                {service.priceRange && <span>Price: {service.priceRange}</span>}
                {service.duration && <span>Duration: {service.duration}</span>}
                {service.rating && (
                  <span>
                    Rating: {service.rating} ⭐ ({service.reviewsCount} reviews)
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
