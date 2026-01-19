import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminAPI } from '../utils/api';
import AdminLayout from './AdminLayout';

const Applications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('sesi_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchApplications();
  }, [navigate]);

  useEffect(() => {
    filterApplications();
  }, [applications, statusFilter, searchTerm]);

  const fetchApplications = async () => {
    try {
      const response = await adminAPI.getApplications();
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('sesi_token');
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.mobile.includes(searchTerm)
      );
    }

    setFilteredApps(filtered);
  };

  const getStatusBadge = (status) => {
    const badges = {
      submitted: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return badges[status] || badges.submitted;
  };

  const stats = {
    total: applications.length,
    submitted: applications.filter(a => a.status === 'submitted').length,
    under_review: applications.filter(a => a.status === 'under_review').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
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
          <h1 className="text-3xl font-bold text-gray-900">Membership Applications</h1>
          <p className="text-gray-600 mt-1">View and manage all membership applications</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button
            onClick={() => setStatusFilter('all')}
            className={`p-4 rounded-xl border-2 transition ${
              statusFilter === 'all' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">Total</p>
          </button>
          <button
            onClick={() => setStatusFilter('submitted')}
            className={`p-4 rounded-xl border-2 transition ${
              statusFilter === 'submitted' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="text-2xl font-bold text-yellow-600">{stats.submitted}</p>
            <p className="text-sm text-gray-600">Submitted</p>
          </button>
          <button
            onClick={() => setStatusFilter('under_review')}
            className={`p-4 rounded-xl border-2 transition ${
              statusFilter === 'under_review' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="text-2xl font-bold text-blue-600">{stats.under_review}</p>
            <p className="text-sm text-gray-600">Under Review</p>
          </button>
          <button
            onClick={() => setStatusFilter('approved')}
            className={`p-4 rounded-xl border-2 transition ${
              statusFilter === 'approved' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            <p className="text-sm text-gray-600">Approved</p>
          </button>
          <button
            onClick={() => setStatusFilter('rejected')}
            className={`p-4 rounded-xl border-2 transition ${
              statusFilter === 'rejected' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-sm text-gray-600">Rejected</p>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email, or mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition">
              Export CSV
            </button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredApps.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No applications found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Applicant</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Contact</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Type</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Region</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Submitted</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-900">{app.full_name}</p>
                          <p className="text-sm text-gray-500">{app.medical_council_reg_no}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm text-gray-900">{app.email}</p>
                          <p className="text-sm text-gray-500">{app.mobile}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">{app.membership_type}</td>
                      <td className="py-4 px-6 text-sm text-gray-900">{app.region_membership}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {new Date(app.submitted_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(app.status)}`}>
                          {app.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          to={`/admin/applications/${app.id}`}
                          className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                        >
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Applications;