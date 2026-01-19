import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../utils/api';
import AdminLayout from './AdminLayout';

const Members = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMember, setExpandedMember] = useState(null);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem('sesi_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchMembers();
  }, [navigate]);

  useEffect(() => {
    filterMembers();
  }, [members, searchTerm]);

  const fetchMembers = async () => {
    try {
      const response = await adminAPI.getMembers();
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('sesi_token');
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const filterMembers = () => {
    let filtered = members;

    if (searchTerm) {
      filtered = filtered.filter(m =>
        m.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.membership_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.hospital?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.city?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMembers(filtered);
  };

  const toggleExpand = (memberId) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Life Members</h1>
          <p className="text-gray-600 mt-1">View and manage all society members</p>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold">{members.length}</p>
              <p className="text-white/80 mt-1">Total Life Members</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <input
            type="text"
            placeholder="Search by name, email, membership number, hospital, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            data-testid="member-search"
          />
        </div>

        {/* Members List */}
        {filteredMembers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p className="text-gray-500">No members found</p>
          </div>
        ) : (
          <div className="space-y-4" data-testid="members-list">
            {filteredMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Member Row - Clickable */}
                <div 
                  onClick={() => toggleExpand(member.id)}
                  className="p-4 cursor-pointer hover:bg-gray-50 transition flex items-center gap-4"
                  data-testid={`member-row-${member.id}`}
                >
                  {/* Avatar */}
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl font-bold">
                      {member.full_name?.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </span>
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-gray-900">{member.full_name}</h3>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                        {member.membership_number}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{member.email}</p>
                    {member.hospital && (
                      <p className="text-sm text-gray-500 truncate">{member.hospital}{member.city && `, ${member.city}`}</p>
                    )}
                  </div>

                  {/* Expand Icon */}
                  <div className="flex-shrink-0">
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform ${expandedMember === member.id ? 'rotate-180' : ''}`} 
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
                  <div className="border-t bg-gray-50 p-6" data-testid={`member-details-${member.id}`}>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Personal Details */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Personal Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Full Name</span>
                            <span className="text-gray-900 font-medium">{member.full_name}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Email</span>
                            <a href={`mailto:${member.email}`} className="text-amber-600 hover:text-amber-700">{member.email}</a>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Mobile</span>
                            <span className="text-gray-900">{member.mobile || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Qualification</span>
                            <span className="text-gray-900">{member.qualification || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Specialization</span>
                            <span className="text-gray-900">{member.specialization || 'N/A'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Professional Details */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Professional Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Membership Number</span>
                            <span className="text-amber-600 font-bold">{member.membership_number}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Member Since</span>
                            <span className="text-gray-900">
                              {member.joined_date ? new Date(member.joined_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Hospital</span>
                            <span className="text-gray-900 text-right max-w-[200px]">{member.hospital || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">City</span>
                            <span className="text-gray-900">{member.city || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">State</span>
                            <span className="text-gray-900">{member.state || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Medical Council Reg.</span>
                            <span className="text-gray-900">{member.medical_council_reg_no || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Years of Experience</span>
                            <span className="text-gray-900">{member.years_experience || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Certificate Download */}
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold text-gray-900 mb-4">Membership Certificate</h4>
                      {member.certificate_path ? (
                        <a
                          href={`${BACKEND_URL}${member.certificate_path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition"
                          data-testid={`download-certificate-${member.id}`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Certificate (PDF)
                        </a>
                      ) : (
                        <p className="text-gray-500 text-sm">Certificate not available</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Members;
