"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { socialLinks } from "../utils/socials";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h2 className="text-3xl font-bold">JG University</h2>

            <p className="mt-5 text-white/70 leading-relaxed">
              Empowering students through innovation, research, and
              industry-driven education to create future leaders.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>

            <ul className="mt-6 space-y-4 text-white/70">
              <li>
                <a href="#campus" className="hover:text-orange-400 transition">
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#programs"
                  className="hover:text-orange-400 transition"
                >
                  Programs
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Admissions
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-orange-400 transition">
                  Placements
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-orange-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-semibold">Programs</h3>

            <ul className="mt-6 space-y-4 text-white/70">
              <li>Engineering</li>
              <li>Management</li>
              <li>Computer Applications</li>
              <li>Science & Research</li>
              <li>Design & Arts</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold">Contact Us</h3>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-4">
                <MapPin
                  size={20}
                  className="text-orange-400 mt-1 min-w-[20px]"
                />

                <p className="text-white/70">
                  ASIA Campus, Drive In Rd, Thaltej, Ahmedabad-380054, Gujarat,
                  India.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Phone size={20} className="text-orange-400" />

                <p className="text-white/70">+91 7567 7567 58/59</p>
              </div>

              <div className="flex items-center gap-4">
                <Mail size={20} className="text-orange-400" />

                <div className="flex flex-col">
                  <a
                    href="mailto:connect@jguni.in"
                    className="text-white/70 hover:text-orange-400 transition"
                  >
                    connect@jguni.in
                  </a>
                  <a
                    href="mailto:admission@jguni.in"
                    className="text-white/70 hover:text-orange-400 transition"
                  >
                    admission@jguni.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © 2026 JG University. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-orange-400 transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-orange-400 transition">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
