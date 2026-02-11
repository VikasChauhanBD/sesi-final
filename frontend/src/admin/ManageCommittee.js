import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../utils/api';
import AdminLayout from './AdminLayout';

const ManageCommittee = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [committee, setCommittee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [filterYear, setFilterYear] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    designation: '',
    email: '',
    mobile: '',
    bio: '',
    qualifications: '',
    hospital: '',
    city: '',
    year: new Date().getFullYear(),
    display_order: 0,
    is_current: true,
    profile_image: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const designations = ['President', 'Vice President', 'Secretary', 'Finance Secretary', 'Immediate Past President', 'Joint Secretary', 'Treasurer', 'EC Member'];
  // Year range from 2000-01 to 2030-31
  const years = Array.from({ length: 31 }, (_, i) => 2030 - i);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setFormData({ ...formData, profile_image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      // Generate slug from name
      const slug = formData.full_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const submitData = {
        ...formData,
        slug,
        profile_image: formData.profile_image // Will handle upload separately if needed
      };
      
      // If there's a new image file, upload it first
      if (formData.profile_image && typeof formData.profile_image !== 'string') {
        const imageFormData = new FormData();
        imageFormData.append('image', formData.profile_image);
        imageFormData.append('title', `${formData.full_name} - Profile`);
        imageFormData.append('category', 'Committee');
        
        const uploadRes = await adminAPI.uploadImage(imageFormData);
        submitData.profile_image = uploadRes.data.image_url;
      }
      
      delete submitData.profile_image_file;
      
      if (editingMember) {
        await adminAPI.updateCommitteeMember(editingMember.id, submitData);
      } else {
        await adminAPI.createCommitteeMember(submitData);
      }
      
      setShowForm(false);
      setEditingMember(null);
      resetForm();
      fetchCommittee();
    } catch (error) {
      console.error('Error saving committee member:', error);
      alert('Error saving committee member. Please try again.');
    } finally {
      setUploading(false);
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
      qualifications: member.qualifications || '',
      hospital: member.hospital || '',
      city: member.city || '',
      year: member.year,
      display_order: member.display_order,
      is_current: member.is_current,
      profile_image: member.profile_image || null
    });
    setPreviewImage(member.profile_image ? `${BACKEND_URL}/api${member.profile_image}` : null);
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
      qualifications: '',
      hospital: '',
      city: '',
      year: new Date().getFullYear(),
      display_order: 0,
      is_current: true,
      profile_image: null
    });
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const filteredCommittee = filterYear === 'all' 
    ? committee 
    : committee.filter(m => m.year === parseInt(filterYear));

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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Executive Committee</h1>
            <p className="text-gray-600 mt-1">Manage committee members by year</p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditingMember(null); resetForm(); }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              data-testid="year-filter"
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}-{(year + 1).toString().slice(-2)}</option>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="committee-grid">
            {filteredCommittee.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Profile Image */}
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                      {member.profile_image ? (
                        <img src={`${BACKEND_URL}/api${member.profile_image}`} alt={member.full_name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white text-2xl font-bold">
                          {member.full_name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900">{member.full_name}</h3>
                      <p className="text-amber-600 font-medium text-sm">{member.designation}</p>
                      <p className="text-gray-500 text-xs mt-1">{member.year}-{member.year + 1}</p>
                      {member.qualifications && (
                        <p className="text-gray-500 text-xs mt-1">{member.qualifications}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition"
                      data-testid={`edit-committee-${member.id}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm font-medium transition"
                      data-testid={`delete-committee-${member.id}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
                <button onClick={() => { setShowForm(false); setEditingMember(null); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4" data-testid="committee-form">
                {/* Profile Image Upload */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 w-10 h-10 bg-amber-600 hover:bg-amber-700 rounded-full flex items-center justify-center cursor-pointer shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        data-testid="profile-image-input"
                      />
                    </label>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500">Click camera icon to upload photo</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      required
                      data-testid="committee-name-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                    <select
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                    <input
                      type="text"
                      value={formData.qualifications}
                      onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      placeholder="e.g., MBBS, MS (Ortho), FRCS"
                      data-testid="committee-qualifications-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      data-testid="committee-email-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hospital</label>
                    <input
                      type="text"
                      value={formData.hospital}
                      onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      data-testid="committee-hospital-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      data-testid="committee-city-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                      required
                      data-testid="committee-year-select"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}-{(year + 1).toString().slice(-2)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
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
                        className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    rows="3"
                    data-testid="committee-bio-textarea"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditingMember(null); resetForm(); }}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium disabled:opacity-50"
                    data-testid="committee-submit-btn"
                  >
                    {uploading ? 'Saving...' : (editingMember ? 'Update Member' : 'Add Member')}
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
