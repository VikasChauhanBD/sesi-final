import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../utils/api';
import AdminLayout from './AdminLayout';

const ManageCommittee = () => {
  const navigate = useNavigate();
  const [committee, setCommittee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [filterYear, setFilterYear] = useState('all');
  const [formData, setFormData] = useState({
    full_name: '',
    designation: '',
    email: '',
    mobile: '',
    bio: '',
    year: new Date().getFullYear(),
    display_order: 0,
    is_current: true
  });

  const designations = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Joint Secretary', 'EC Member'];
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    const token = localStorage.getItem('sesi_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchCommittee();
  }, [navigate]);

  const fetchCommittee = async () => {
    try {
      const response = await adminAPI.getCommittee();
      setCommittee(response.data);
    } catch (error) {
      console.error('Error fetching committee:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('sesi_token');
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await adminAPI.updateCommitteeMember(editingMember.id, formData);
      } else {
        await adminAPI.createCommitteeMember(formData);
      }
      setShowForm(false);
      setEditingMember(null);
      resetForm();
      fetchCommittee();
    } catch (error) {
      console.error('Error saving committee member:', error);
      alert('Error saving committee member. Please try again.');
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      full_name: member.full_name,
      designation: member.designation,
      email: member.email || '',
      mobile: member.mobile || '',
      bio: member.bio || '',
      year: member.year,
      display_order: member.display_order,
      is_current: member.is_current
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this committee member?')) {
      try {
        await adminAPI.deleteCommitteeMember(id);
        fetchCommittee();
      } catch (error) {
        console.error('Error deleting committee member:', error);
        alert('Error deleting committee member.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      full_name: '',
      designation: '',
      email: '',
      mobile: '',
      bio: '',
      year: new Date().getFullYear(),
      display_order: 0,
      is_current: true
    });
  };

  const filteredCommittee = filterYear === 'all' 
    ? committee 
    : committee.filter(m => m.year === parseInt(filterYear));

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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Executive Committee</h1>
            <p className="text-gray-600 mt-1">Manage committee members by year</p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditingMember(null); resetForm(); }}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            data-testid="add-committee-btn"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Member
          </button>
        </div>

        {/* Year Filter */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center gap-4">
            <label className="font-medium text-gray-700">Filter by Year:</label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              data-testid="year-filter"
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <span className="text-gray-500 ml-auto">{filteredCommittee.length} members</span>
          </div>
        </div>

        {/* Committee List */}
        {filteredCommittee.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500">No committee members found</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full" data-testid="committee-table">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Order</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Designation</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCommittee.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-500">{member.display_order}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{member.full_name}</div>
                      {member.email && <div className="text-sm text-gray-500">{member.email}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                        {member.designation}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{member.year}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${member.is_current ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {member.is_current ? 'Current' : 'Past'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(member)}
                        className="text-teal-600 hover:text-teal-800 mr-4"
                        data-testid={`edit-committee-${member.id}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="text-red-600 hover:text-red-800"
                        data-testid={`delete-committee-${member.id}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingMember ? 'Edit Committee Member' : 'Add Committee Member'}
                </h2>
                <button onClick={() => { setShowForm(false); setEditingMember(null); }} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4" data-testid="committee-form">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      required
                      data-testid="committee-name-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                    <select
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      required
                      data-testid="committee-designation-select"
                    >
                      <option value="">Select Designation</option>
                      {designations.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      data-testid="committee-email-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      data-testid="committee-mobile-input"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      required
                      data-testid="committee-year-select"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      min="0"
                      data-testid="committee-order-input"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_current}
                        onChange={(e) => setFormData({ ...formData, is_current: e.target.checked })}
                        className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                        data-testid="committee-current-checkbox"
                      />
                      <span className="text-sm font-medium text-gray-700">Current Member</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    rows="3"
                    data-testid="committee-bio-textarea"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditingMember(null); }}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium"
                    data-testid="committee-submit-btn"
                  >
                    {editingMember ? 'Update Member' : 'Add Member'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageCommittee;
