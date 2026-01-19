import React from 'react';
import { Link } from 'react-router-dom';

const Overview = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="overview-title">Overview</h1>
          <p className="text-white/90 max-w-2xl">
            Learn about the Shoulder and Elbow Society of India and our mission.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* About SESI */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About SESI</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                The Shoulder and Elbow Society of India (SESI) is a national professional organization 
                dedicated to the advancement of education, research, and clinical excellence in the field 
                of shoulder and elbow surgery.
              </p>
              <p className="mb-4">
                SESI serves as a common platform for orthopedic surgeons across India who share a focused 
                interest in the upper limb. We are committed to supporting healthcare professionals, 
                enhancing medical standards, and promoting community well-being through education, research, 
                and collaboration to improve the standards of care for patients suffering from shoulder and 
                elbow disorders.
              </p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To advance the science and practice of shoulder and elbow surgery through education, 
                research, and collaboration among orthopedic surgeons across India.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the premier organization for shoulder and elbow surgery in India, recognized 
                globally for excellence in patient care, education, and research.
              </p>
            </div>
          </div>

          {/* Key Objectives */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Objectives</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Promote education and training in shoulder and elbow surgery',
                'Support and encourage research in the field',
                'Establish standards of care and best practices',
                'Organize conferences, workshops, and CME programs',
                'Foster collaboration among surgeons nationally and internationally',
                'Develop patient awareness about shoulder and elbow disorders',
                'Create a registry for shoulder and elbow procedures',
                'Support young surgeons through fellowships and grants'
              ].map((objective, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600">{objective}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
            <p className="text-white/90 mb-6">
              Become a member of SESI and contribute to advancing shoulder and elbow surgery in India.
            </p>
            <Link
              to="/registration"
              className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-full font-bold transition"
            >
              Apply for Membership
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
