import { Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
    

        
        <div className="pt-8 border-t border-gray-800 text-gray-500 text-center text-sm flex  items-center justify-center gap-5">
          © 2025 Listenify. All rights reserved.
            <Link
            to="/about-dev"
            className="hover:text-cyan-400 transition-colors"
          >
            About Dev
          </Link>
        </div>
          
        
       
      </div>
    </footer>
  );
}

export default Footer;
