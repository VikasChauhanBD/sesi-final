import React from 'react';
import { Link } from 'react-router-dom';

// Education Initiatives Page
export const EducationInitiatives = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Education Initiatives</h1>
          <p className="text-white/90 max-w-2xl">
            SESI runs a series of academic and clinical programmes to improve the standards of upper limb care across the country.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <p className="text-lg text-gray-600 mb-8">
              Education lies at the core of SESI's mission. We are committed to providing comprehensive 
              training and educational opportunities for orthopedic surgeons at all stages of their careers.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Initiatives</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hands-on Cadaveric Workshops</h3>
                <p className="text-gray-600">
                  Annual training sessions on arthroscopy, arthroplasty, and fracture fixation techniques 
                  with expert supervision and state-of-the-art instrumentation.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">CME Programs</h3>
                <p className="text-gray-600">
                  Interactive sessions organized in collaboration with leading medical institutions across India, 
                  offering continuing medical education credits.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Webinar Series</h3>
                <p className="text-gray-600">
                  Online educational modules featuring national and international faculty, making quality 
                  education accessible to surgeons across the country.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Residents Teaching Programme</h3>
                <p className="text-gray-600">
                  Regular case discussions and teaching sessions designed specifically for postgraduate 
                  trainees to enhance their clinical knowledge.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/education/courses-cme"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold transition"
            >
              View Our Courses
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

// Research Support Page
export const ResearchSupport = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Research Support</h1>
          <p className="text-white/90 max-w-2xl">
            Supporting clinical and academic research to advance evidence-based practice in shoulder and elbow surgery.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <p className="text-lg text-gray-600 mb-8">
              SESI actively supports clinical and academic research to promote evidence-based practice 
              and advance the field of shoulder and elbow surgery in India.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Focus Areas</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Multicentric Clinical Research</h3>
                <p className="text-gray-600 text-sm">Collaborative research projects across multiple centers to generate robust clinical evidence.</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Registry Development</h3>
                <p className="text-gray-600 text-sm">Development of national registries for common shoulder and elbow procedures.</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">SESI Research Grants</h3>
                <p className="text-gray-600 text-sm">Funding support for early-career surgeons and residents to pursue research projects.</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Publication Support</h3>
                <p className="text-gray-600 text-sm">Assistance in publishing research in indexed journals and official SESI publications.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Community Outreach Page
export const CommunityOutreach = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Community Outreach</h1>
          <p className="text-white/90 max-w-2xl">
            Initiatives to improve awareness and accessibility of shoulder and elbow care across India.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <p className="text-lg text-gray-600 mb-8">
              SESI is committed to community outreach initiatives that improve awareness and accessibility 
              of quality shoulder and elbow care across India, especially in underserved areas.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ongoing Activities</h2>
            
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Free Screening & Consultation Camps</h3>
                  <p className="text-gray-600">
                    Regular camps organized in collaboration with district hospitals and NGOs to provide 
                    free consultation and screening for shoulder and elbow disorders.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Patient Awareness Campaigns</h3>
                  <p className="text-gray-600">
                    Educational materials, webinars, and awareness programs to help patients understand 
                    common shoulder and elbow conditions and treatment options.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Postoperative Rehabilitation Education</h3>
                  <p className="text-gray-600">
                    Training guides and resources for physiotherapists and patients to ensure optimal 
                    recovery after shoulder and elbow surgeries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationInitiatives;
