import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminAPI } from '../utils/api';
import AdminLayout from './AdminLayout';

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem('sesi_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchApplication();
  }, [id, navigate]);

  const fetchApplication = async () => {
    try {
      const response = await adminAPI.getApplication(id);
      setApplication(response.data);
      setAdminNotes(response.data.admin_notes || '');
    } catch (error) {
      console.error('Error fetching application:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('sesi_token');
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus} this application?`)) {
      return;
    }

    setUpdating(true);
    try {
      const response = await adminAPI.updateApplicationStatus(id, newStatus, adminNotes);
      
      if (newStatus === 'approved' && response.data.membership_number) {
        alert(`✅ Application Approved!\n\nMembership Number: ${response.data.membership_number}\n\nCertificate generated and sent to member via email.`);
      } else {
        alert(`Application ${newStatus} successfully!`);
      }
      
      fetchApplication();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      submitted: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Submitted' },
      under_review: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Under Review' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' },
    };
    return badges[status] || badges.submitted;
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

  if (!application) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Application not found</p>
        </div>
      </AdminLayout>
    );
  }

  const statusBadge = getStatusBadge(application.status);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/admin/applications')}
              className="text-teal-600 hover:text-teal-700 font-medium mb-2 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Applications
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Application Details</h1>
            <p className="text-gray-600 mt-1">Application ID: {application.id}</p>
          </div>
          <div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusBadge.bg} ${statusBadge.text}`}>
              {statusBadge.label}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        {application.status !== 'approved' && application.status !== 'rejected' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex gap-4">
              <button
                onClick={() => handleStatusUpdate('under_review')}
                disabled={updating || application.status === 'under_review'}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
              >
                Mark Under Review
              </button>
              <button
                onClick={() => handleStatusUpdate('approved')}
                disabled={updating}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
              >
                ✓ Approve Application
              </button>
              <button
                onClick={() => handleStatusUpdate('rejected')}
                disabled={updating}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
              >
                ✗ Reject Application
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Personal Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">{application.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Title</p>
                  <p className="font-medium text-gray-900">{application.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{application.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mobile</p>
                  <p className="font-medium text-gray-900">{application.mobile}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium text-gray-900">{application.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Medical Council Reg No</p>
                  <p className="font-medium text-gray-900">{application.medical_council_reg_no}</p>
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Professional Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Qualification</p>
                  <p className="font-medium text-gray-900">{application.qualification}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Years of Experience</p>
                  <p className="font-medium text-gray-900">{application.years_experience} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Appointments</p>
                  <p className="font-medium text-gray-900 whitespace-pre-wrap">{application.current_appointments}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Specialised Practice</p>
                  <p className="font-medium text-gray-900 whitespace-pre-wrap">{application.specialised_practice}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Proposal Name 1</p>
                    <p className="font-medium text-gray-900">{application.proposal_name_1}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Proposal Name 2</p>
                    <p className="font-medium text-gray-900">{application.proposal_name_2}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Addresses</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Communication Address</h3>
                  <p className="text-gray-700 text-sm">{application.comm_address}</p>
                  <p className="text-gray-700 text-sm mt-1">
                    {application.comm_district_name}, {application.comm_state_name}
                  </p>
                  <p className="text-gray-700 text-sm">PIN: {application.comm_pincode}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Work Address</h3>
                  {application.work_hospital && (
                    <p className="text-gray-700 text-sm font-medium">{application.work_hospital}</p>
                  )}
                  <p className="text-gray-700 text-sm">{application.work_address}</p>
                  <p className="text-gray-700 text-sm mt-1">
                    {application.work_district_name}, {application.work_state_name}
                  </p>
                  <p className="text-gray-700 text-sm">PIN: {application.work_pincode}</p>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Uploaded Documents</h2>
              <div className="grid grid-cols-1 gap-3">
                {application.documents && application.documents.length > 0 ? (
                  application.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 capitalize">
                            {doc.type.replace(/_/g, ' ')}
                          </p>
                          <p className="text-xs text-gray-500">{doc.path.split('/').pop()}</p>
                        </div>
                      </div>
                      <a
                        href={`${BACKEND_URL}${doc.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center gap-1"
                      >
                        View
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No documents uploaded</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Application Info</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Membership Type</p>
                  <p className="font-medium text-gray-900">{application.membership_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Region</p>
                  <p className="font-medium text-gray-900">{application.region_membership}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submitted On</p>
                  <p className="font-medium text-gray-900">
                    {new Date(application.submitted_at).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                {application.reviewed_at && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Reviewed On</p>
                      <p className="font-medium text-gray-900">
                        {new Date(application.reviewed_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reviewed By</p>
                      <p className="font-medium text-gray-900">{application.reviewed_by}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Admin Notes */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Notes</h2>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows="6"
                placeholder="Add notes about this application..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              ></textarea>
              <button
                onClick={() => handleStatusUpdate(application.status)}
                disabled={updating}
                className="w-full mt-3 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ApplicationDetail;
