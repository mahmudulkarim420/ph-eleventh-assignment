// ServiceCoverageMap.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";

// Custom icon for decorators
const decoratorIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

const ServiceCoverageMap = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoverage = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/serviceCoverage");
        const activeLocations = data.filter((loc) => loc.status === "active");
        setLocations(activeLocations);
        setFilteredLocations(activeLocations);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch service coverage:", err);
        setLoading(false);
      }
    };
    fetchCoverage();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredLocations(locations);
    } else {
      const filtered = locations.filter((loc) =>
        loc.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-lg font-medium text-white">Loading map...</p>;

  return (
    <motion.section
      className="py-20 px-6 md:px-5 text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Service <span className="text-[#F9BC60]">Coverage Map</span>
      </motion.h2>

      {/* Search Box */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-10 justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative flex-1 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by district, city, or region"
            className="bg-gray-700 text-white py-3 pl-12 pr-20 rounded-full w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-xl" />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#F9BC60] hover:bg-yellow-600 text-white px-5 py-2 rounded-full transition"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </motion.div>

      {/* Map */}
      <motion.div
        className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={8}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredLocations.map((loc, index) => (
            <Marker
              key={index}
              position={[loc.latitude, loc.longitude]}
              icon={decoratorIcon}
            >
              <Popup>
                <strong>{loc.district}, {loc.city}</strong>
                <br />
                Covered Areas: {loc.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.div>
    </motion.section>
  );
};

export default ServiceCoverageMap;
