// ServiceDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/services/${id}`);
        setService(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading)
    return <p className="text-center mt-20 text-lg text-white">Loading...</p>;
  if (!service)
    return <p className="text-center mt-20 text-lg text-red-500">Service not found</p>;

  return (
    <section className="py-20 px-6 text-white">
      <div className="max-w-6xl mx-auto bg-[#F9BC60] rounded-2xl p-6 flex flex-col lg:flex-row gap-8 items-center">
        
        {/* Image */}
        <div className="flex-1">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-80 object-cover rounded-2xl"
          />
        </div>

        {/* Text / Details */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4 text-[#004643]">{service.title}</h2>
          <p className="text-gray-800 mb-4">{service.description}</p>

          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-2 text-[#004643]">Features:</h3>
            <ul className="list-disc list-inside text-gray-800">
              {service.features && service.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 text-gray-800 font-medium mb-6">
            {service.priceRange && <span><strong>Price:</strong> {service.priceRange}</span>}
            {service.duration && <span><strong>Duration:</strong> {service.duration}</span>}
            {service.rating && <span><strong>Rating:</strong> {service.rating} ⭐ ({service.reviewsCount} reviews)</span>}
            {service.category && <span><strong>Category:</strong> {service.category}</span>}
            {service.highlight !== undefined && <span><strong>Highlight:</strong> {service.highlight ? "Yes" : "No"}</span>}
          </div>
        </div>
      </div>

      {/* Centered Go to Home Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="font-bold mt-4 rounded-md px-8 py-5 bg-gradient-to-r from-[#F9BC60] to-[#fac05e] text-[#004643] relative overflow-hidden group z-0 hover:text-white hover:from-[#fac05e] hover:to-[#e0a200] duration-1000"
        >
          <span className="absolute bg-[#004643] size-80 rounded-full group-hover:scale-150 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
          <span className="absolute bg-[#e0b14b] size-80 -left-2 -top-10 rounded-full group-hover:scale-150 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
          Go to Home
        </button>
      </div>
    </section>
  );
};

export default ServiceDetails;
