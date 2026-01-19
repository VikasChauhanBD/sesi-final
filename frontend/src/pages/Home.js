import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicAPI } from '../utils/api';

const Home = () => {
  const [stats, setStats] = useState(null);
  const [committee, setCommittee] = useState([]);
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, committeeRes, eventsRes, newsRes] = await Promise.all([
          publicAPI.getStatistics(),
          publicAPI.getCommittee({ is_current: true }),
          publicAPI.getEvents({ limit: 3, status: 'upcoming' }),
          publicAPI.getNews({ limit: 3 }),
        ]);
        setStats(statsRes.data);
        setCommittee(committeeRes.data);
        setEvents(eventsRes.data);
        setNews(newsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 text-white py-24"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-cyan-900/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Shoulder and Elbow<br />Society of India
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-teal-50">
              A central hub for mission updates, events, and news.
            </p>
            <p className="text-lg text-teal-100 mb-8">
              Overview, upcoming events, news, and quick links.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/registration"
                className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg font-semibold text-lg transition transform hover:scale-105 shadow-xl"
                data-testid="join-now-btn"
              >
                Join SESI Today
              </Link>
              <Link
                to="/about"
                className="bg-white/10 hover:bg-white/20 backdrop-blur px-8 py-4 rounded-lg font-semibold text-lg transition border-2 border-white/30"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white py-16 transform -mt-12 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-2xl text-center shadow-lg border border-teal-100" data-testid="stat-members">
              <div className="text-5xl font-bold text-teal-600 mb-2">480+</div>
              <div className="text-gray-700 font-medium">Active members</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl text-center shadow-lg border border-orange-100" data-testid="stat-cme">
              <div className="text-5xl font-bold text-orange-600 mb-2">1,000+</div>
              <div className="text-gray-700 font-medium">CME credits offered annually</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl text-center shadow-lg border border-purple-100" data-testid="stat-legislation">
              <div className="text-5xl font-bold text-purple-600 mb-2">39</div>
              <div className="text-gray-700 font-medium">Endorsed pieces of current legislation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Discover</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We are committed to supporting healthcare professionals, enhancing medical standards, and promoting community well-being through education, research, and collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Committee Members */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Committee Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {committee.slice(0, 8).map((member) => (
              <div key={member.id} className="text-center group" data-testid="committee-member">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl transition">
                  {member.profile_image ? (
                    <img src={member.profile_image} alt={member.full_name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-teal-600">
                      {member.full_name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900">{member.full_name}</h3>
                <p className="text-sm text-teal-600 font-medium">{member.designation}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/committee" className="text-teal-600 hover:text-teal-700 font-medium">
              View All Committee Members →
            </Link>
          </div>
        </div>
      </section>

      {/* Spotlight Events */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900">Spotlight</h2>
            <Link to="/events" className="text-teal-600 hover:text-teal-700 font-medium" data-testid="see-more-events">
              See More →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition" data-testid="event-card">
                <div className="h-48 bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                  {event.banner_image ? (
                    <img src={event.banner_image} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-6xl">📅</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex items-center gap-2 text-sm text-teal-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(event.start_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900">Latest News</h2>
            <Link to="/news" className="text-teal-600 hover:text-teal-700 font-medium" data-testid="read-more-news">
              Read More →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition" data-testid="news-card">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-5xl">📰</span>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(item.published_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{item.excerpt || item.content.substring(0, 150)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Stay Connected</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quarterly SESI Publication</h3>
              <Link to="/publications" className="text-teal-100 hover:text-white transition">
                Read Latest Issue →
              </Link>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Subscribe to SESI's e-Newsletter</h3>
              <Link to="/contact" className="text-teal-100 hover:text-white transition">
                Subscribe →
              </Link>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Don't Wait! Get Involved Today</h3>
              <Link to="/registration" className="text-teal-100 hover:text-white transition">
                Take Action →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
