import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Overview', path: '/overview' },
    { name: 'Executive Committee', path: '/executive-committee' },
    { 
      name: 'Programs', 
      path: '/programs',
      dropdown: [
        { name: 'Education Initiatives', path: '/programs/education-initiatives' },
        { name: 'Research Support', path: '/programs/research-support' },
        { name: 'Community Outreach', path: '/programs/community-outreach' },
      ]
    },
    { 
      name: 'Education', 
      path: '/education',
      dropdown: [
        { name: 'Courses & CME', path: '/education/courses-cme' },
        { name: 'Workshops & Skill Labs', path: '/education/workshops' },
        { name: 'Fellowship', path: '/education/fellowship' },
        { name: 'Training Resources', path: '/education/training-resources' },
      ]
    },
    { 
      name: 'Publications', 
      path: '/publications',
      dropdown: [
        { name: 'JSESI', path: '/publications/jsesi' },
        { name: 'Manuscript Submission', path: '/publications/manuscript-submission' },
        { name: 'SESI Newsletters', path: '/publications/newsletters' },
      ]
    },
    { 
      name: 'Resources', 
      path: '/resources',
      dropdown: [
        { name: 'Guidelines', path: '/resources/guidelines' },
        { name: 'Downloads', path: '/resources/downloads' },
        { name: 'Learning Links', path: '/resources/links' },
      ]
    },
    { name: 'News & Highlights', path: '/news' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { 
      name: 'Membership', 
      path: '/membership',
      dropdown: [
        { name: 'About Membership', path: '/membership' },
        { name: 'Members Directory', path: '/members' },
        { name: 'Apply Now', path: '/registration' },
      ]
    },
  ];

  return (
    <>
      {/* Top Bar - Toned down amber/brown */}
      <div className="bg-gradient-to-r from-amber-800 to-red-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="mailto:info@sesi.co.in" className="flex items-center gap-1 hover:text-amber-200 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@sesi.co.in
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-amber-200 transition">About Us</Link>
            <Link to="/contact" className="hover:text-amber-200 transition">Contact</Link>
            <Link
              to="/registration"
              className="bg-white text-amber-800 hover:bg-amber-100 px-4 py-1 rounded-full font-semibold transition"
              data-testid="join-btn"
            >
              Join SESI
            </Link>
            <Link
              to="/admin"
              className="border border-white hover:bg-white/10 px-4 py-1 rounded-full font-medium transition"
              data-testid="login-btn"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-700 to-red-800 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">SESI</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">Shoulder & Elbow</h1>
                <p className="text-sm text-amber-700 font-medium">Society of India</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              {navigation.map((item) => (
                <div 
                  key={item.path} 
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.path)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className={`px-4 py-2 text-sm font-medium transition flex items-center gap-1 ${
                      isActive(item.path)
                        ? 'text-amber-700'
                        : 'text-gray-700 hover:text-amber-700'
                    }`}
                    data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.name}
                    {item.dropdown && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.path && (
                    <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-lg py-2 border border-gray-100 z-50">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition"
                          data-testid={`subnav-${subItem.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-btn"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pb-4 border-t border-gray-100 pt-4">
              {navigation.map((item) => (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    className={`block px-4 py-3 text-sm font-medium transition ${
                      isActive(item.path)
                        ? 'text-amber-700 bg-amber-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => !item.dropdown && setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-6 bg-gray-50">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-amber-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
