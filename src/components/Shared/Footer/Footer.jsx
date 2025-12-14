import { Link } from "react-router";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="backdrop-blur-md bg-[#F9BC60] border-t border-white/10 text-gray-300 py-10 mt-16">
      <div className=" grid md:grid-cols-3 gap-8 px-5">
        {/* brand section */}
        <div className="text-[#004643]">
          <h2 className="text-2xl font-bold mb-3">StyleDecor</h2>
          <p className="text-sm opacity-80">
            Smart home & ceremony decoration booking system. Book services online with comfort.
          </p>
        </div>

        {/* contact */}
        <div className="text-[#004643]">
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="flex gap-2">
            <Phone size={18} /> +880 1234 567890
          </p>
          <p className="flex gap-2">
            <Mail size={18} /> styledecor@gmail.com
          </p>
          <p>Dhaka, Bangladesh</p>
        </div>

        {/* social */}
        <div className="text-[#004643]">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <Link>
              <Facebook size={22} />
            </Link>
            <Link>
              <Instagram size={22} />
            </Link>
          </div>
          <p className="opacity-70 text-sm mt-3">Working Hours: 10am - 10pm</p>
        </div>
      </div>

      <div className="text-center text-sm opacity-70 mt-6 text-[#004643] border-t border-[#004643] pt-5">
        © {new Date().getFullYear()} StyleDecor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
