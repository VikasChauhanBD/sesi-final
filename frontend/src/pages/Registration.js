import React, { useState, useEffect } from 'react';
import { publicAPI, membershipAPI } from '../utils/api';

const Registration = () => {
  const [states, setStates] = useState([]);
  const [commDistricts, setCommDistricts] = useState([]);
  const [workDistricts, setWorkDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    region_membership: 'National',
    membership_type: 'Life Member',
    title: 'Dr.',
    first_name: '',
    middle_name: '',
    last_name: '',
    mobile: '',
    email: '',
    gender: 'Male',
    medical_council_reg_no: '',
    qualification: '',
    current_appointments: '',
    specialised_practice: '',
    years_experience: '',
    proposal_name_1: '',
    proposal_name_2: '',
    comm_address: '',
    comm_state_id: '',
    comm_district_id: '',
    comm_pincode: '',
    work_address: '',
    work_hospital: '',
    work_state_id: '',
    work_district_id: '',
    work_pincode: '',
  });

  const [files, setFiles] = useState({
    aadhar: null,
    mbbs_certificate: null,
    orthopedic_certificate: null,
    specialisation_certificate: null,
    state_registration_certificate: null,
  });

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await publicAPI.getStates();
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const handleStateChange = async (field, stateId) => {
    setFormData({ ...formData, [field]: stateId });
    try {
      const response = await publicAPI.getDistricts(stateId);
      if (field === 'comm_state_id') {
        setCommDistricts(response.data);
        setFormData(prev => ({ ...prev, comm_district_id: '' }));
      } else {
        setWorkDistricts(response.data);
        setFormData(prev => ({ ...prev, work_district_id: '' }));
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    if (fileList.length > 0) {
      setFiles({ ...files, [name]: fileList[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const submitData = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      Object.keys(files).forEach(key => {
        if (files[key]) {
          submitData.append(key, files[key]);
        }
      });

      const response = await membershipAPI.submitApplication(submitData);
      setSuccess(response.data);
      
      setFormData({
        region_membership: 'National',
        membership_type: 'Life Member',
        title: 'Dr.',
        first_name: '',
        middle_name: '',
        last_name: '',
        mobile: '',
        email: '',
        gender: 'Male',
        medical_council_reg_no: '',
        qualification: '',
        current_appointments: '',
        specialised_practice: '',
        years_experience: '',
        proposal_name_1: '',
        proposal_name_2: '',
        comm_address: '',
        comm_state_id: '',
        comm_district_id: '',
        comm_pincode: '',
        work_address: '',
        work_hospital: '',
        work_state_id: '',
        work_district_id: '',
        work_pincode: '',
      });
      setFiles({
        aadhar: null,
        mbbs_certificate: null,
        orthopedic_certificate: null,
        specialisation_certificate: null,
        state_registration_certificate: null,
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit application. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Membership Application Form</h1>
          <p className="text-gray-600 mb-8">Join the Shoulder & Elbow Society of India</p>

          {success && (
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mb-8">
              <h3 className="text-green-800 font-bold text-lg mb-2">✅ Application Submitted Successfully!</h3>
              <p className="text-green-700"><strong>Application ID:</strong> {success.application_id}</p>
              <p className="text-green-700"><strong>Email:</strong> {success.email}</p>
              <p className="text-green-600 mt-2">You will receive a confirmation email shortly.</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 mb-8">
              <h3 className="text-red-800 font-bold text-lg mb-2">❌ Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Membership Type */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region Membership *</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="region_membership"
                      value="National"
                      checked={formData.region_membership === 'National'}
                      onChange={handleChange}
                      className="w-4 h-4 text-teal-600"
                    />
                    <span>National</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="region_membership"
                      value="International"
                      checked={formData.region_membership === 'International'}
                      onChange={handleChange}
                      className="w-4 h-4 text-teal-600"
                    />
                    <span>International</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Membership Type *</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="membership_type"
                      value="Life Member"
                      checked={formData.membership_type === 'Life Member'}
                      onChange={handleChange}
                      className="w-4 h-4 text-amber-600"
                    />
                    <span>Life Member</span>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">All memberships are Life Memberships</p>
              </div>
            </div>

            {/* Personal Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <select
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                  <input
                    type="text"
                    name="middle_name"
                    value={formData.middle_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    required
                    placeholder="10 digit mobile number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medical Council Registration Number *</label>
                  <input
                    type="text"
                    name="medical_council_reg_no"
                    value={formData.medical_council_reg_no}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">Professional Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qualification *</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                    placeholder="e.g., MBBS, MS Ortho"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Practice Experience *</label>
                  <input
                    type="number"
                    name="years_experience"
                    value={formData.years_experience}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Appointments *</label>
                  <textarea
                    name="current_appointments"
                    value={formData.current_appointments}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nature of Specialised Practice *</label>
                  <textarea
                    name="specialised_practice"
                    value={formData.specialised_practice}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SESI Member Proposal Name 1 *</label>
                  <input
                    type="text"
                    name="proposal_name_1"
                    value={formData.proposal_name_1}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SESI Member Proposal Name 2 *</label>
                  <input
                    type="text"
                    name="proposal_name_2"
                    value={formData.proposal_name_2}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Communication Address */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">Communication Address</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                  <textarea
                    name="comm_address"
                    value={formData.comm_address}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <select
                      name="comm_state_id"
                      value={formData.comm_state_id}
                      onChange={(e) => handleStateChange('comm_state_id', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state.id} value={state.id}>{state.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                    <select
                      name="comm_district_id"
                      value={formData.comm_district_id}
                      onChange={handleChange}
                      required
                      disabled={!formData.comm_state_id}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Select District</option>
                      {commDistricts.map(district => (
                        <option key={district.id} value={district.id}>{district.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                    <input
                      type="text"
                      name="comm_pincode"
                      value={formData.comm_pincode}
                      onChange={handleChange}
                      pattern="[0-9]{6}"
                      required
                      placeholder="6 digits"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Work Place Address */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">Work Place Address</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hospital/Clinic Name</label>
                  <input
                    type="text"
                    name="work_hospital"
                    value={formData.work_hospital}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                  <textarea
                    name="work_address"
                    value={formData.work_address}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <select
                      name="work_state_id"
                      value={formData.work_state_id}
                      onChange={(e) => handleStateChange('work_state_id', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state.id} value={state.id}>{state.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                    <select
                      name="work_district_id"
                      value={formData.work_district_id}
                      onChange={handleChange}
                      required
                      disabled={!formData.work_state_id}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Select District</option>
                      {workDistricts.map(district => (
                        <option key={district.id} value={district.id}>{district.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                    <input
                      type="text"
                      name="work_pincode"
                      value={formData.work_pincode}
                      onChange={handleChange}
                      pattern="[0-9]{6}"
                      required
                      placeholder="6 digits"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Upload */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">Documents Upload</h2>
              <p className="text-sm text-gray-600 mb-6">* Required documents | Allowed formats: PDF, JPG, PNG | Max size: 5MB</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Aadhar (Optional)</label>
                  <input
                    type="file"
                    name="aadhar"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">MBBS Certificate *</label>
                  <input
                    type="file"
                    name="mbbs_certificate"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Orthopedic Certificate *</label>
                  <input
                    type="file"
                    name="orthopedic_certificate"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialisation Certificate (Optional)</label>
                  <input
                    type="file"
                    name="specialisation_certificate"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">State Registration Certificate *</label>
                  <input
                    type="file"
                    name="state_registration_certificate"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
