import React from 'react';
import { Link } from 'react-router-dom';

const Membership = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="membership-title">Membership</h1>
          <p className="text-white/90 max-w-2xl">
            Join SESI and become part of India's premier society for shoulder and elbow surgery.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-orange-600">480+</p>
            <p className="text-gray-600 text-sm mt-1">Active Members</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-orange-600">1,000+</p>
            <p className="text-gray-600 text-sm mt-1">CME Credits Offered</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-orange-600">28+</p>
            <p className="text-gray-600 text-sm mt-1">States Represented</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-orange-600">39</p>
            <p className="text-gray-600 text-sm mt-1">Years of Excellence</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Membership Types */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Membership Types</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Life Member */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
                <h3 className="text-2xl font-bold">Life Member</h3>
                <p className="text-white/80 mt-2">One-time payment for lifetime benefits</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {[
                    'Lifetime membership with no renewal fees',
                    'Access to all SESI conferences and events',
                    'Discounted registration for workshops',
                    'Access to JSESI publications',
                    'Voting rights in SESI elections',
                    'Eligibility for SESI fellowships',
                    'Certificate of membership',
                    'Networking with 480+ members'
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/registration"
                  className="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center py-3 rounded-lg font-medium transition"
                  data-testid="apply-life-member"
                >
                  Apply as Life Member
                </Link>
              </div>
            </div>

            {/* Associate Member */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <h3 className="text-2xl font-bold">Associate Member</h3>
                <p className="text-white/80 mt-2">For residents and early-career surgeons</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {[
                    'Annual membership (renewable)',
                    'Access to SESI conferences and events',
                    'Discounted workshop registration',
                    'Access to JSESI publications',
                    'Mentorship opportunities',
                    'Research collaboration support',
                    'Certificate of membership',
                    'Upgradable to Life Membership'
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/registration"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition"
                  data-testid="apply-associate-member"
                >
                  Apply as Associate Member
                </Link>
              </div>
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-orange-600 mb-4">Life Member</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    Qualified orthopedic surgeon with MS/DNB (Ortho)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    Registered with State Medical Council
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    Special interest in shoulder and elbow surgery
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    Proposed by two existing SESI members
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-blue-600 mb-4">Associate Member</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Postgraduate trainee in Orthopedics
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Senior resident with interest in upper limb surgery
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Valid proof of residency enrollment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    Recommendation from department head
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Documents Required */}
          <div className="bg-orange-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents Required</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                'MBBS Degree Certificate',
                'MS/DNB (Ortho) Certificate',
                'State Medical Council Registration',
                'Passport Size Photograph',
                'Proof of Current Appointment',
                'Proposer Details (for Life Members)'
              ].map((doc, index) => (
                <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-4">
                  <svg className="w-5 h-5 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-700 text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/registration"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-full font-bold text-lg transition shadow-lg"
              data-testid="apply-now-btn"
            >
              Apply for Membership Now
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-gray-500 mt-4">
              Have questions? <Link to="/contact" className="text-orange-600 hover:text-orange-700 font-medium">Contact us</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
