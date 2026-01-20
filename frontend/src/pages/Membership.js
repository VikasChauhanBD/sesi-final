import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Membership = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Life Membership"
        description="Join SESI as a Life Member. Become part of India's premier society for shoulder & elbow surgery. Benefits include CME credits, conference access, publications, and networking."
        keywords="SESI membership, life member, orthopaedic society membership, join SESI, medical society India"
        canonical="/membership"
      />
      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-800 to-red-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="membership-title">Life Membership</h1>
          <p className="text-white/90 max-w-2xl">
            Join SESI as a Life Member and become part of India's premier society for shoulder and elbow surgery.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-amber-700">480+</p>
            <p className="text-gray-600 text-sm mt-1">Life Members</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-amber-700">1,000+</p>
            <p className="text-gray-600 text-sm mt-1">CME Credits Offered</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-amber-700">28+</p>
            <p className="text-gray-600 text-sm mt-1">States Represented</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-amber-700">39</p>
            <p className="text-gray-600 text-sm mt-1">Years of Excellence</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Life Membership Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
            <div className="bg-gradient-to-r from-amber-700 to-red-800 p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-2">Life Membership</h2>
              <p className="text-white/80">One-time payment for lifetime benefits</p>
            </div>
            <div className="p-8">
              <h3 className="font-bold text-gray-900 text-lg mb-6">Member Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  'Lifetime membership with no renewal fees',
                  'Access to all SESI conferences and events',
                  'Discounted registration for workshops',
                  'Access to JSESI publications',
                  'Voting rights in SESI elections',
                  'Eligibility for SESI fellowships',
                  'Digital membership certificate',
                  'Networking with 480+ members',
                  'Research collaboration opportunities',
                  'CME credit opportunities'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/registration"
                className="block w-full bg-amber-700 hover:bg-amber-800 text-white text-center py-4 rounded-xl font-bold text-lg transition"
                data-testid="apply-life-member"
              >
                Apply for Life Membership
              </Link>
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria</h2>
            <div className="space-y-4">
              {[
                'Qualified orthopedic surgeon with MS/DNB (Orthopaedics)',
                'Registered with State Medical Council of India',
                'Special interest in shoulder and elbow surgery',
                'Proposed by two existing SESI Life Members',
                'Completion of orthopedic training program'
              ].map((criteria, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="text-gray-600">{criteria}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Required */}
          <div className="bg-amber-50 rounded-2xl p-8 mb-8 border border-amber-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents Required</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'MBBS Degree Certificate',
                'MS/DNB (Orthopaedics) Certificate',
                'State Medical Council Registration',
                'Passport Size Photograph',
                'Proof of Current Appointment',
                'Proposer Details (2 SESI Members)'
              ].map((doc, index) => (
                <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-700 text-sm font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Process</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-amber-700 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-gray-900">Submit Online Application</h4>
                  <p className="text-gray-600 text-sm">Fill out the membership form with your details and upload required documents.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-amber-700 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-gray-900">Review by Committee</h4>
                  <p className="text-gray-600 text-sm">Your application will be reviewed by the SESI membership committee.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-amber-700 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-gray-900">Approval & Certificate</h4>
                  <p className="text-gray-600 text-sm">Upon approval, you'll receive your membership number and digital certificate.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/registration"
              className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-full font-bold text-lg transition shadow-lg"
              data-testid="apply-now-btn"
            >
              Apply for Membership Now
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-gray-500 mt-4">
              Have questions? <Link to="/contact" className="text-amber-700 hover:text-amber-800 font-medium">Contact us</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
