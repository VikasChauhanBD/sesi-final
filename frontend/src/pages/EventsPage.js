import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { publicAPI } from '../utils/api';
import SEO from '../components/SEO';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const statusFilters = ['all', 'upcoming', 'ongoing', 'completed'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await publicAPI.getEvents({ limit: 50 });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'ongoing': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Events & Conferences"
        description="Attend SESI conferences, workshops, and CME programs. Stay updated on upcoming events, SESICON annual meetings, and continuing medical education opportunities."
        keywords="SESI events, orthopaedic conferences, SESICON, medical workshops, CME programs, shoulder elbow conference"
        canonical="/events"
      />
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="events-title">Events & Conferences</h1>
          <p className="text-white/90 max-w-2xl">
            Discover upcoming conferences, workshops, courses, and CME programs organized by SESI.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-white shadow-md sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-4 overflow-x-auto">
            {statusFilters.map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-5 py-2 rounded-full font-medium transition whitespace-nowrap capitalize ${
                  filter === status
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                data-testid={`filter-${status}`}
              >
                {status === 'all' ? 'All Events' : status} 
                ({status === 'all' ? events.length : events.filter(e => e.status === status).length})
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-600 border-t-transparent"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">No events found</p>
          </div>
        ) : (
          <div className="space-y-6" data-testid="events-list">
            {filteredEvents.map((event) => (
              <article key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="flex flex-col md:flex-row">
                  {/* Date Badge */}
                  <div className="md:w-48 bg-gradient-to-br from-orange-500 to-red-600 p-6 text-white flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold">{new Date(event.start_date).getDate()}</span>
                    <span className="text-lg">{new Date(event.start_date).toLocaleDateString('en-IN', { month: 'short' })}</span>
                    <span className="text-sm opacity-80">{new Date(event.start_date).getFullYear()}</span>
                    {event.end_date && new Date(event.end_date).getDate() !== new Date(event.start_date).getDate() && (
                      <span className="text-xs mt-2 opacity-70">
                        to {new Date(event.end_date).getDate()} {new Date(event.end_date).toLocaleDateString('en-IN', { month: 'short' })}
                      </span>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                        {event.event_type}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                      {event.venue && (
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.venue}{event.city && `, ${event.city}`}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(event.start_date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    {event.registration_link && event.status === 'upcoming' && (
                      <a
                        href={event.registration_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-medium transition"
                      >
                        Register Now
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
