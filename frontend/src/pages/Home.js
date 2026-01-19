import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { publicAPI } from '../utils/api';

// Helper function to get the correct image URL
const getImageUrl = (imageUrl, backendUrl) => {
  if (!imageUrl) return null;
  // If it's already an external URL (http/https), return as-is
  if (imageUrl.startsWith('http')) return imageUrl;
  // Otherwise, it's a local path - prefix with backend URL
  return `${backendUrl}/api${imageUrl}`;
};

const Home = () => {
  const [committee, setCommittee] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [committeeRes, newsRes, eventsRes] = await Promise.all([
          publicAPI.getCommittee({ is_current: true }),
          publicAPI.getNews({ limit: 4 }),
          publicAPI.getEvents({ status: 'upcoming', limit: 3 }),
        ]);
        setCommittee(committeeRes.data);
        setNews(newsRes.data);
        setEvents(eventsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Separate committee members
  const president = committee.find(m => m.designation === 'President');
  const officeBearers = committee.filter(m => 
    ['Secretary', 'Finance Secretary', 'Immediate Past President', 'Vice President', 'Treasurer', 'Joint Secretary'].includes(m.designation)
  );
  const ecMembers = committee.filter(m => m.designation === 'EC Member');

  // Auto-scroll effect for EC Members
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || ecMembers.length === 0 || isPaused) return;

    const scrollSpeed = 1; // pixels per frame
    let animationId;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollSpeed;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [ecMembers.length, isPaused]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Banner Image */}
      <section className="relative min-h-[600px] lg:min-h-[700px] text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwb3J0aG9wZWRpYyUyMHN1cmdlcnklMjBob3NwaXRhbCUyMGRvY3RvcnMlMjBwcm9mZXNzaW9uYWx8ZW58MHx8fHwxNzY4ODQyNzUyfDA&ixlib=rb-4.1.0&q=85"
            alt="Orthopedic Surgery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 via-amber-800/80 to-red-900/70"></div>
        </div>
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-4 py-24 lg:py-36 flex items-center min-h-[600px] lg:min-h-[700px]">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              🏥 India's Premier Orthopedic Society
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Shoulder & Elbow<br />Society of India
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-10 max-w-2xl leading-relaxed">
              A national professional organization dedicated to the advancement of education, 
              research, and clinical excellence in shoulder and elbow surgery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/registration"
                className="bg-white text-amber-800 hover:bg-amber-50 px-10 py-4 rounded-full font-bold text-lg transition shadow-xl hover:shadow-2xl hover:scale-105"
                data-testid="hero-join-btn"
              >
                Join SESI
              </Link>
              <Link
                to="/overview"
                className="border-2 border-white text-white hover:bg-white/10 px-10 py-4 rounded-full font-bold text-lg transition backdrop-blur-sm"
                data-testid="hero-learn-btn"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-8" data-testid="stats-section">
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-amber-700">480+</p>
              <p className="text-gray-600 mt-2">Life Members</p>
            </div>
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-amber-700">1,000+</p>
              <p className="text-gray-600 mt-2">CME Credits Offered</p>
            </div>
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-amber-700">{events.length || 3}+</p>
              <p className="text-gray-600 mt-2">Upcoming Events</p>
            </div>
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-amber-700">39</p>
              <p className="text-gray-600 mt-2">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              SESI serves as a common platform for orthopedic surgeons across India who share a focused 
              interest in the upper limb. We are committed to supporting healthcare professionals, 
              enhancing medical standards, and promoting community well-being through education, research, 
              and collaboration to improve the standards of care for patients suffering from shoulder and 
              elbow disorders.
            </p>
          </div>
        </div>
      </section>

      {/* Executive Committee Section - Redesigned */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Executive Committee</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated leaders guiding SESI's mission to advance shoulder and elbow surgery in India.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-700 border-t-transparent"></div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              {/* President - Top Center */}
              {president && (
                <div className="flex justify-center mb-8">
                  <Link
                    to={`/executive-committee/${president.slug}`}
                    className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition group w-64 text-center border border-amber-200"
                    data-testid={`president-card`}
                  >
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-amber-600 to-red-700 flex items-center justify-center shadow-lg">
                      {president.profile_image ? (
                        <img src={getImageUrl(president.profile_image, BACKEND_URL)} alt={president.full_name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white text-4xl font-bold">
                          {president.full_name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-amber-700 transition">{president.full_name}</h3>
                    <p className="text-amber-700 font-semibold">{president.designation}</p>
                  </Link>
                </div>
              )}

              {/* Office Bearers - Row below President */}
              {officeBearers.length > 0 && (
                <div className="flex flex-wrap justify-center gap-6 mb-10">
                  {officeBearers.map((member) => (
                    <Link
                      key={member.id}
                      to={`/executive-committee/${member.slug}`}
                      className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition group w-48 text-center border border-gray-100"
                      data-testid={`office-bearer-${member.slug}`}
                    >
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        {member.profile_image ? (
                          <img src={`${BACKEND_URL}/api${member.profile_image}`} alt={member.full_name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white text-2xl font-bold">
                            {member.full_name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-amber-700 transition text-sm">{member.full_name}</h3>
                      <p className="text-amber-600 text-xs font-medium">{member.designation}</p>
                    </Link>
                  ))}
                </div>
              )}

              {/* EC Members - Auto-Scrolling Horizontal */}
              {ecMembers.length > 0 && (
                <div className="relative mt-8">
                  <h3 className="text-center text-gray-600 text-base font-semibold mb-6">Executive Committee Members</h3>
                  <div 
                    ref={scrollRef}
                    className="overflow-x-auto pb-4 scrollbar-hide"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <div className="flex gap-6 min-w-max px-4" data-testid="ec-members-scroll">
                      {/* Duplicate members for seamless loop */}
                      {[...ecMembers, ...ecMembers].map((member, idx) => (
                        <Link
                          key={`${member.id}-${idx}`}
                          to={`/executive-committee/${member.slug}`}
                          className="bg-white rounded-xl p-5 hover:bg-amber-50 transition-all group w-48 text-center flex-shrink-0 border border-gray-200 shadow-md hover:shadow-xl hover:scale-105"
                          data-testid={`ec-member-${member.slug}`}
                        >
                          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg">
                            {member.profile_image ? (
                              <img src={`${BACKEND_URL}/api${member.profile_image}`} alt={member.full_name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-white text-2xl font-bold">
                                {member.full_name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-amber-700 transition text-sm">{member.full_name}</h3>
                          <p className="text-xs text-amber-600 mt-1">EC Member</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* Gradient fade edges */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              to="/executive-committee"
              className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold"
              data-testid="view-all-committee-btn"
            >
              View All Committee Members
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Latest News */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Latest News</h2>
                <Link to="/news" className="text-amber-700 hover:text-amber-800 font-medium">
                  View All →
                </Link>
              </div>
              <div className="space-y-4" data-testid="news-list">
                {news.length === 0 ? (
                  <p className="text-gray-500">No news available</p>
                ) : (
                  news.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                      <span className="text-xs font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                        {item.category || 'News'}
                      </span>
                      <h3 className="font-bold text-gray-900 mt-3 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{item.excerpt || item.content.substring(0, 120)}...</p>
                      <p className="text-xs text-gray-400 mt-3">
                        {new Date(item.published_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Upcoming Events</h2>
                <Link to="/events" className="text-amber-700 hover:text-amber-800 font-medium">
                  View All →
                </Link>
              </div>
              <div className="space-y-4" data-testid="events-list">
                {events.length === 0 ? (
                  <p className="text-gray-500">No upcoming events</p>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-red-700 rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0">
                          <span className="text-2xl font-bold">{new Date(event.start_date).getDate()}</span>
                          <span className="text-xs">{new Date(event.start_date).toLocaleDateString('en-IN', { month: 'short' })}</span>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
                            {event.event_type}
                          </span>
                          <h3 className="font-bold text-gray-900 mt-2">{event.title}</h3>
                          {event.city && (
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              {event.venue ? `${event.venue}, ${event.city}` : event.city}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              SESI runs a series of academic and clinical programmes to improve the standards of upper limb care across the country.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8" data-testid="programs-section">
            <Link to="/programs/education-initiatives" className="group">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white h-full hover:shadow-xl transition">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Education Initiatives</h3>
                <p className="text-white/80 text-sm">Hands-on workshops, CMEs, webinars, and resident teaching programmes.</p>
              </div>
            </Link>

            <Link to="/programs/research-support" className="group">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white h-full hover:shadow-xl transition">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Research Support</h3>
                <p className="text-white/80 text-sm">Clinical research projects, registry development, and research grants.</p>
              </div>
            </Link>

            <Link to="/programs/community-outreach" className="group">
              <div className="bg-gradient-to-br from-violet-600 to-violet-700 rounded-2xl p-8 text-white h-full hover:shadow-xl transition">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Community Outreach</h3>
                <p className="text-white/80 text-sm">Free screening camps, patient awareness campaigns, and rehab education.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-700 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Join SESI?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Become a Life Member of India's premier society for shoulder and elbow surgery. 
            Access exclusive educational resources, networking opportunities, and professional development.
          </p>
          <Link
            to="/registration"
            className="inline-flex items-center gap-2 bg-white text-amber-800 hover:bg-amber-50 px-8 py-4 rounded-full font-bold text-lg transition shadow-lg"
            data-testid="cta-join-btn"
          >
            Apply for Membership
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
