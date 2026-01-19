import React from 'react';
import { Link } from 'react-router-dom';

// Courses & CME Page
export const CoursesCME = () => {
  const courses = [
    { title: 'Rotator Cuff Repair & Instability Management', icon: '🦴' },
    { title: 'Shoulder & Elbow Arthroplasty Techniques', icon: '🏥' },
    { title: 'Fracture Fixation & Trauma Reconstruction', icon: '⚕️' },
    { title: 'Rehabilitation & Postoperative Protocols', icon: '💪' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Courses & CME</h1>
          <p className="text-white/90 max-w-2xl">
            Education and skill development programs for orthopedic surgeons and trainees.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <p className="text-lg text-gray-600 mb-8">
              SESI's mission is to promote education and skill development for orthopedic surgeons and trainees. 
              Our program mix includes courses, CMEs, workshops, and fellowships aligned with international standards.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Typical Course Topics</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {courses.map((course, index) => (
                <div key={index} className="bg-orange-50 rounded-xl p-4 flex items-center gap-4">
                  <span className="text-3xl">{course.icon}</span>
                  <span className="font-medium text-gray-900">{course.title}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Each CME Includes:</h3>
              <ul className="space-y-2">
                {[
                  'Case-based learning sessions',
                  'Expert faculty lectures',
                  'Live and video demonstrations',
                  'CME certification'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link to="/events" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold transition">
              View Upcoming Courses
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

// Workshops & Skill Labs Page
export const WorkshopsSkillLabs = () => {
  const workshops = [
    'Shoulder Arthroscopy',
    'Elbow Arthroplasty & Complex Fracture Fixation',
    'Cadaveric Dissection & Surgical Anatomy',
    'Arthroplasty Revision Techniques',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Workshops & Skill Labs</h1>
          <p className="text-white/90 max-w-2xl">
            Hands-on cadaveric workshops with expert supervision for practical skill development.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <p className="text-lg text-gray-600 mb-8">
              SESI organizes hands-on cadaveric workshops with expert supervision at leading teaching 
              institutions. These workshops provide practical training with simulation and modern instrumentation.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Workshop Courses</h2>
            
            <div className="space-y-4">
              {workshops.map((workshop, index) => (
                <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 flex items-center gap-4 border-l-4 border-orange-500">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-bold">{index + 1}</span>
                  </div>
                  <span className="font-medium text-gray-900">{workshop}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fellowship Page
export const Fellowship = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Fellowship Programs</h1>
          <p className="text-white/90 max-w-2xl">
            Continuous learning opportunities through prestigious SESI fellowships.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <p className="text-lg text-gray-600 mb-8">
              SESI offers Clinical and Research Fellowships that provide outstanding opportunities for 
              young orthopedic surgeons to gain specialized training in shoulder and elbow surgery under 
              the mentorship of leading experts.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Clinical Fellowship</h3>
                <p className="text-gray-600 mb-4">
                  Hands-on clinical training at premier centers with exposure to complex cases and 
                  advanced surgical techniques.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Duration: 6-12 months
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Stipend provided
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4">Research Fellowship</h3>
                <p className="text-gray-600 mb-4">
                  Focus on academic research with opportunities to publish in indexed journals and 
                  present at national conferences.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Duration: 3-6 months
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Research grant available
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/news" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold transition">
              Check Fellowship Announcements
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

// Training Resources Page
export const TrainingResources = () => {
  const resources = [
    { title: 'Surgical Video Demonstrations', icon: '🎬' },
    { title: 'Technique Notes & Procedure Guides', icon: '📝' },
    { title: 'Recorded Webinars & Panels', icon: '🎥' },
    { title: 'Case Library & Journal Highlights', icon: '📚' },
    { title: 'Patient Education Resources', icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Training Resources</h1>
          <p className="text-white/90 max-w-2xl">
            Academic and learning resources for continuous professional development.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <p className="text-lg text-gray-600 mb-8">
              SESI provides a comprehensive collection of academic and learning resources to support 
              continuous professional development for orthopedic surgeons.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Resources</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {resources.map((resource, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 hover:bg-orange-50 transition cursor-pointer">
                  <span className="text-3xl">{resource.icon}</span>
                  <span className="font-medium text-gray-900">{resource.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesCME;
