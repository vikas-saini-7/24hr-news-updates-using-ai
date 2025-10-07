import React from "react";
import {
  IconMail,
  IconBrandTwitter,
  IconBrandGithub,
  IconBrandLinkedin,
  IconHeart,
  IconHeartFilled,
} from "@tabler/icons-react";
import LandingButton from "../reusables/LandingButton";

const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                News.AI
              </h3>
              <p className="text-white/60 max-w-md leading-relaxed">
                Stay informed with the freshest news from around the world. Our
                AI-powered platform ensures you never miss what matters most,
                delivered in real-time with a 24-hour refresh cycle.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-orange-400/20 hover:bg-orange-500/10 transition-all duration-300"
              >
                <IconBrandTwitter size={18} className="text-white/60" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-orange-400/20 hover:bg-orange-500/10 transition-all duration-300"
              >
                <IconBrandGithub size={18} className="text-white/60" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-orange-400/20 hover:bg-orange-500/10 transition-all duration-300"
              >
                <IconBrandLinkedin size={18} className="text-white/60" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-orange-400/20 hover:bg-orange-500/10 transition-all duration-300"
              >
                <IconMail size={18} className="text-white/60" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-white/60 hover:text-orange-400 transition-colors duration-300"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-white/60 hover:text-orange-400 transition-colors duration-300"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-white/60 hover:text-orange-400 transition-colors duration-300"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-white/60 hover:text-orange-400 transition-colors duration-300"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#help"
                  className="text-white/60 hover:text-orange-400 transition-colors duration-300"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/60 hover:text-orange-400 transition-colors duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-white/60 hover:text-orange-400 transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-white/60 hover:text-orange-400 transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-white/50">
              <span>©{currentYear} News.AI | Made with</span>
              <IconHeartFilled size={16} className="text-red-400" />
              <span>for @everyone</span>
            </div>

            <div className="text-center md:text-right text-white/50">
              <span>Last updated: Just now</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
