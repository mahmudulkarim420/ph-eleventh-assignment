// Contact.jsx
import React, { useRef, useState } from "react";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const form = useRef();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setSuccess(false);

    emailjs
      .sendForm(
        'service_8zh26gd',
        'template_531ln27',
        form.current,
        '-xszSwFIzbuBxEJwt'
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
          form.current.reset();
          setFormData({ name: "", email: "", message: "" });

          setTimeout(() => setSuccess(false), 3000);
        },
        (error) => {
          console.log(error.text);
          alert("Oops! Something went wrong. Please try again.");
        }
      );
  };

  return (
    <section className="py-20 px-6 md:px-12 text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-white">
          Get in <span className="text-[#F9BC60]">Touch</span>
        </h2>

        <p className="text-lg md:text-xl text-center mb-12 text-gray-300">
          Have a question or want to work together? Send us a message and we’ll get back to you shortly.
        </p>

        <motion.form
          ref={form}
          onSubmit={sendEmail}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#042927] rounded-3xl p-10 shadow-2xl max-w-2xl mx-auto relative"
        >
          <div className="mb-6 relative">
            <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-[#F9BC60]" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-12 p-4 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F9BC60] transition"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-6 relative">
            <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-[#F9BC60]" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-12 p-4 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F9BC60] transition"
              placeholder="Your Email"
            />
          </div>

          <div className="mb-6 relative">
            <FaCommentDots className="absolute top-3 left-3 text-[#F9BC60]" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full pl-12 p-4 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F9BC60] transition"
              placeholder="Your Message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#F9BC60] to-[#e0b14b] text-[#004643] font-semibold py-4 rounded-xl hover:scale-105 hover:shadow-lg transition transform duration-300"
          >
            Send Message
          </button>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute top-[-40px] left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm"
              >
                ✅ Message sent successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
