import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* About */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">SESI</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">SESI</h3>
                <p className="text-gray-400 text-sm">Society of India</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The Shoulder and Elbow Society of India is dedicated to advancing
              education, research, and clinical excellence in shoulder and elbow
              surgery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Overview", path: "/overview" },
                { name: "Membership", path: "/membership" },
                { name: "Events", path: "/events" },
                { name: "Event Details", path: "/event-details" },
                { name: "News", path: "/news" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 transition text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-lg mb-4">Programs</h4>
            <ul className="space-y-2">
              {[
                {
                  name: "Education Initiatives",
                  path: "/programs/education-initiatives",
                },
                {
                  name: "Research Support",
                  path: "/programs/research-support",
                },
                { name: "Courses & CME", path: "/education/courses-cme" },
                { name: "Workshops", path: "/education/workshops" },
                { name: "Fellowship", path: "/education/fellowship" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 transition text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mandatory policies */}
          <div>
            <h4 className="font-bold text-lg mb-4">Mandatory policies</h4>
            <ul className="space-y-2">
              {[
                {
                  name: "Privacy Policy",
                  path: "/privacy-policy",
                },
                {
                  name: "Terms & Conditions (T&C)",
                  path: "/terms-and-conditions",
                },
                {
                  name: "Cancellation & Refund Policy",
                  path: "/cancellation-refund-policy",
                },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 transition text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>

            <ul className="space-y-3 text-gray-400 text-sm">
              {/* Phone */}
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.52l.57 2.29a2 2 0 01-.45 1.86l-1.27 1.27a16 16 0 006.59 6.59l1.27-1.27a2 2 0 011.86-.45l2.29.57A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+917559024498"
                  className="hover:text-orange-500 transition"
                >
                  +91 7559024498
                </a>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:sesisecretary1@gmail.com"
                  className="hover:text-orange-500 transition"
                >
                  sesisecretary1@gmail.com
                </a>
              </li>

              {/* Website */}
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <a
                  href="https://www.sesionline.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition"
                >
                  www.sesionline.in
                </a>
              </li>

              {/* Address */}
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 21s8-4.438 8-11a8 8 0 10-16 0c0 6.562 8 11 8 11z"
                  />
                </svg>
                <span>
                  3A Anant income tax lane,<br />
                  Prabhat road, Erandwane,<br />
                  Off Karve road, Pune, 411004
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4 text-center">
          <p>
            © {new Date().getFullYear()} Shoulder and Elbow Society of India.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
