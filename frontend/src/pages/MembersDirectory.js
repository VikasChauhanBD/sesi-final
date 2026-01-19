import React, { useState, useEffect } from 'react';
import { publicAPI } from '../utils/api';

const MembersDirectory = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMember, setExpandedMember] = useState(null);
  const [filterState, setFilterState] = useState('');
  const [states, setStates] = useState([]);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, statesRes] = await Promise.all([
          publicAPI.getMembers(),
          publicAPI.getStates()
        ]);
        setMembers(membersRes.data);
        setStates(statesRes.data || []);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredMembers = members.filter(member => {
    const matchesSearch = !searchTerm || 
      member.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.hospital?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membership_number?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = !filterState || member.state === filterState;
    
    return matchesSearch && matchesState;
  });

  const toggleExpand = (memberId) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-700 via-amber-800 to-red-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4" data-testid="members-directory-title">
            Members Directory
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Browse our esteemed members of the Shoulder & Elbow Society of India. 
            Click on any member to view their complete profile.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{members.length}</p>
                <p className="text-sm text-gray-500">Life Members</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Showing {filteredMembers.length} of {members.length} members
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="sticky top-16 bg-white shadow-sm z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, hospital, city, or membership number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                data-testid="member-search-input"
              />
            </div>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white min-w-[200px]"
              data-testid="state-filter"
            >
              <option value="">All States</option>
              {states.map(state => (
                <option key={state.id} value={state.name}>{state.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Members List */}
      <section className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-700 border-t-transparent"></div>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Members Found</h3>
            <p className="text-gray-500">
              {searchTerm || filterState 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Members will appear here once they are approved.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4" data-testid="members-directory-list">
            {filteredMembers.map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* Member Row - Clickable */}
                <div 
                  onClick={() => toggleExpand(member.id)}
                  className="p-5 cursor-pointer hover:bg-gray-50 transition flex items-center gap-4"
                  data-testid={`member-row-${member.id}`}
                >
                  {/* Avatar */}
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-white text-xl font-bold">
                      {member.full_name?.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </span>
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-lg">{member.full_name}</h3>
                      {member.membership_number && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-semibold">
                          {member.membership_number}
                        </span>
                      )}
                    </div>
                    {member.qualification && (
                      <p className="text-sm text-gray-600">{member.qualification}</p>
                    )}
                    <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-500">
                      {member.hospital && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {member.hospital}
                        </span>
                      )}
                      {member.city && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {member.city}{member.state && `, ${member.state}`}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <div className="flex-shrink-0 flex items-center gap-3">
                    {member.certificate_path && (
                      <span className="hidden md:flex items-center gap-1 text-sm text-green-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verified
                      </span>
                    )}
                    <svg 
                      className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${expandedMember === member.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedMember === member.id && (
                  <div 
                    className="border-t bg-gradient-to-br from-gray-50 to-amber-50/30 p-6"
                    data-testid={`member-expanded-${member.id}`}
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Professional Details */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Professional Details
                        </h4>
                        <div className="space-y-3 bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Full Name</span>
                            <span className="text-gray-900 font-medium">{member.full_name}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Qualification</span>
                            <span className="text-gray-900">{member.qualification || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Specialization</span>
                            <span className="text-gray-900">{member.specialization || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Years of Experience</span>
                            <span className="text-gray-900">{member.years_experience ? `${member.years_experience} years` : 'N/A'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Hospital/Institution</span>
                            <span className="text-gray-900 text-right max-w-[200px]">{member.hospital || 'N/A'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Membership Details */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                          Membership Details
                        </h4>
                        <div className="space-y-3 bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Membership Number</span>
                            <span className="text-amber-700 font-bold">{member.membership_number || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Membership Type</span>
                            <span className="text-gray-900">{member.membership_type || 'Life Member'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Member Since</span>
                            <span className="text-gray-900">
                              {member.joined_date 
                                ? new Date(member.joined_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) 
                                : 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Location</span>
                            <span className="text-gray-900">
                              {member.city && member.state ? `${member.city}, ${member.state}` : (member.city || member.state || 'N/A')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Certificate Download */}
                    {member.certificate_path && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Membership Certificate</p>
                              <p className="text-sm text-gray-500">Official SESI Life Membership Certificate</p>
                            </div>
                          </div>
                          <a
                            href={`${BACKEND_URL}${member.certificate_path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg font-medium transition shadow-md hover:shadow-lg"
                            data-testid={`download-certificate-${member.id}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Certificate
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MembersDirectory;
