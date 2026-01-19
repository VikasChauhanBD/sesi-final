import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="about-title">About SESI</h1>
          <p className="text-white/90 max-w-2xl">
            A professional body dedicated to the advancement of knowledge, research, and surgical 
            expertise in shoulder and elbow disorders.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* History */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                The Shoulder and Elbow Society of India (SESI) is a national professional organization 
                dedicated to the advancement of education, research, and clinical excellence in the field 
                of shoulder and elbow surgery.
              </p>
              <p className="mb-4">
                Established as a national platform for orthopedic surgeons to collaborate, exchange ideas, 
                and promote excellence in upper limb care across India, SESI has grown to become a leading 
                society in the field with over 480 active members.
              </p>
              <p>
                We are committed to supporting healthcare professionals, enhancing medical standards, and 
                promoting community well-being through education, research, and collaboration to improve 
                the standards of care for patients suffering from shoulder and elbow disorders.
              </p>
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Mission</h3>
              <p className="text-gray-600 text-sm">
                To advance the science and practice of shoulder and elbow surgery through education, 
                research, and collaboration.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Vision</h3>
              <p className="text-gray-600 text-sm">
                To be the premier organization for shoulder and elbow surgery in India, recognized 
                globally for excellence.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Values</h3>
              <p className="text-gray-600 text-sm">
                Excellence, integrity, collaboration, innovation, and commitment to patient care 
                guide everything we do.
              </p>
            </div>
          </div>

          {/* What We Do */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Do</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Education</h4>
                  <p className="text-gray-600 text-sm">
                    Organize courses, workshops, CME programs, and fellowships for continuous learning.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Research</h4>
                  <p className="text-gray-600 text-sm">
                    Support clinical research, registry development, and evidence-based practice.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Conferences</h4>
                  <p className="text-gray-600 text-sm">
                    Host annual conferences bringing together experts from India and abroad.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Community</h4>
                  <p className="text-gray-600 text-sm">
                    Conduct outreach programs, free camps, and patient awareness initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Become a member of SESI and be part of India's premier society for shoulder and elbow surgery.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/registration"
                className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-full font-bold transition"
              >
                Apply for Membership
              </Link>
              <Link
                to="/executive-committee"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-bold transition"
              >
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
