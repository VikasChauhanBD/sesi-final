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
  const [filterType, setFilterType] = useState('all');
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
  }, [members, searchTerm, filterType]);

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

    if (filterType !== 'all') {
      filtered = filtered.filter(m => m.membership_type === filterType);
    }

    if (searchTerm) {
      filtered = filtered.filter(m =>
        m.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.membership_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.hospital?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.city?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMembers(filtered);
  };

  const stats = {
    total: members.length,
    life: members.filter(m => m.membership_type === 'Life Member').length,
    associate: members.filter(m => m.membership_type === 'Associate Member').length,
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SESI Members</h1>
          <p className="text-gray-600 mt-1">View and manage all society members</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => setFilterType('all')}
            className={`p-6 rounded-xl border-2 transition ${
              filterType === 'all' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <p className="text-3xl font-bold text-teal-600">{stats.total}</p>
            <p className="text-sm text-gray-600 mt-1">Total Members</p>
          </button>
          <button
            onClick={() => setFilterType('Life Member')}
            className={`p-6 rounded-xl border-2 transition ${
              filterType === 'Life Member' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <p className="text-3xl font-bold text-orange-600">{stats.life}</p>
            <p className="text-sm text-gray-600 mt-1">Life Members</p>
          </button>
          <button
            onClick={() => setFilterType('Associate Member')}
            className={`p-6 rounded-xl border-2 transition ${
              filterType === 'Associate Member' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <p className="text-3xl font-bold text-blue-600">{stats.associate}</p>
            <p className="text-sm text-gray-600 mt-1">Associate Members</p>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <input
            type="text"
            placeholder="Search by name, email, membership number, hospital, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Members Grid */}
        {filteredMembers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p className="text-gray-500">No members found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {member.full_name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      member.membership_type === 'Life Member' 
                        ? 'bg-orange-500' 
                        : 'bg-blue-500'
                    }`}>
                      {member.membership_type === 'Life Member' ? 'Life' : 'Associate'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.full_name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{member.qualification}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      <span className="font-bold text-teal-600">{member.membership_number}</span>
                    </div>

                    {member.hospital && (
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="line-clamp-2">{member.hospital}</span>
                      </div>
                    )}

                    {member.city && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{member.city}, {member.state}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Joined {new Date(member.joined_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </a>

                    {member.certificate_path && (
                      <a
                        href={`${BACKEND_URL}${member.certificate_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Certificate
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Members;
