import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(
          `https://ph-eleventh-assignment-server.vercel.app/services/${id}`
        );
        setService(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  // Try to extract a numeric price from various service fields
  const derivePrice = (svc) => {
    if (!svc) return null;
    const p = svc.price;
    if (typeof p === "number" && !isNaN(p)) return p;
    if (typeof p === "string") {
      const m = p.match(/(\d+(?:[.,]\d+)?)/);
      if (m) return Number(m[1].replace(/,/g, ""));
    }
    const pr = svc.priceRange || svc.price_range || svc.priceRangeString;
    if (typeof pr === "string") {
      const m = pr.match(/(\d+(?:[.,]\d+)?)/);
      if (m) return Number(m[1].replace(/,/g, ""));
    }
    return null;
  };

  const handleBooking = async () => {
    if (!service) return;

    // Require authenticated user
    if (!user || !user.email) {
      toast.error("You must be logged in to book. Redirecting to login...");
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("access-token");

      // Build a clear payload the backend can validate easily
      const numericPrice = derivePrice(service);
      if (numericPrice === null) {
        toast.error("Service price is missing or invalid. Please contact support.");
        return;
      }

      const payload = {
        serviceId: service._id ?? service.id ?? id,
        title: service.title,
        price: numericPrice,
        email: user.email,
      };

      console.log("Creating checkout session with payload:", payload);

      const res = await axios.post(
        "https://ph-eleventh-assignment-server.vercel.app/create-checkout-session",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      console.log("Checkout session response:", res?.data);

      const checkoutUrl = res?.data?.url;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        const serverMsg = res?.data?.message || JSON.stringify(res?.data);
        console.error("No checkout URL returned from server", serverMsg);
        toast.error("Payment could not be started: " + (res?.data?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Checkout session error:", error?.response || error);
      const serverErr = error?.response?.data || error.message || "Unknown error";
      toast.error("Payment failed: " + (serverErr.message || JSON.stringify(serverErr)));
    }
  };

  if (loading) return <p className="text-center mt-20 text-lg text-white">Loading...</p>;
  if (!service) return <p className="text-center mt-20 text-red-500 text-lg">Service not found</p>;

  return (
    <section className="py-20 px-6 text-white">
      <div className="max-w-6xl mx-auto bg-[#F9BC60] rounded-2xl p-6 flex flex-col lg:flex-row gap-8 items-center">
        <div className="flex-1">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-80 object-cover rounded-2xl"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4 text-[#004643]">{service.title}</h2>
          <p className="text-gray-800 mb-4">{service.description}</p>

          <ul className="list-disc list-inside text-gray-800 mb-4">
            {service.features?.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <p className="text-gray-800 mb-4">
            <strong>Price:</strong>{" "}
            {derivePrice(service) !== null
              ? `$${derivePrice(service)}`
              : service.priceRange ?? "Contact for price"}
          </p>
          <p className="text-gray-800 mb-4">
            <strong>Duration:</strong> {service.duration}
          </p>

          <button
            onClick={handleBooking}
            className="w-full bg-[#004643] text-white py-4 rounded-xl text-lg font-semibold hover:bg-[#003530] transition"
          >
            Book Now
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="font-bold mt-4 rounded-md px-8 py-5 bg-gradient-to-r from-[#F9BC60] to-[#fac05e] text-[#004643] hover:text-white transition"
        >
          Go to Home
        </button>
      </div>
    </section>
  );
};

export default ServiceDetails;
