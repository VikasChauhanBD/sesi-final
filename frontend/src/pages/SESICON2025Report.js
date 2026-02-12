import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const SESICON2025Report = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO
        title="SESICON 2025 Post-Conference Report"
        description="Post-conference report of the 8th National Conference of Shoulder and Elbow Society of India (SESICON 2025) held in Jaipur, Rajasthan from 6th-8th November 2025."
        keywords="SESICON 2025, SESI conference, shoulder elbow conference, Jaipur, orthopaedic conference"
        canonical="/news/sesicon-2025-report"
      />

      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
            <Link to="/news" className="hover:text-white transition">News</Link>
            <span>/</span>
            <span>SESICON 2025 Report</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            POST-CONFERENCE REPORT
          </h1>
          <p className="text-xl text-white/90">
            8th National Conference of Shoulder and Elbow Society of India (SESICON 2025)
          </p>
          <p className="text-white/80 mt-2">
            Jaipur, Rajasthan | 6th–8th November 2025
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The 8th National Conference of the Shoulder and Elbow Society of India (SESICON 2025) was successfully held from 6th to 8th November 2025 in Jaipur. The conference brought together leading national and international experts, postgraduates, researchers, and clinicians for an exceptional academic and scientific exchange.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-gray-900 mb-3">The event was organized under the leadership of:</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Organizing Chairman:</strong> Dr. Rajiv Gupta</li>
                <li><strong>Organizing Secretary:</strong> Dr. Vishwadeep Sharma</li>
              </ul>
              <p className="mt-4 text-gray-600">
                The conference was held in collaboration with the <strong>Rajasthan Orthopaedic Surgeons Association (ROSA)</strong> and the <strong>Jaipur Orthopaedic Society (JOS)</strong>.
              </p>
            </div>
          </div>

          {/* Pre-Conference Course */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">PRE-CONFERENCE COURSE</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              The <strong>SESI–Leicester Advanced Shoulder Trauma Course</strong> was conducted on 6th November 2025 at the Rajasthan International Centre, Jaipur.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The course featured high-level instructional modules, expert interactions, and case-based trauma learning, offering participants valuable hands-on insights.
            </p>
            <div className="bg-purple-50 rounded-xl p-4 inline-block">
              <p className="text-purple-800 font-semibold">
                <span className="text-3xl font-bold">45</span> participants registered for the course
              </p>
            </div>
          </div>

          {/* Main Conference */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Main Conference</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              The main conference took place at the <strong>Jaipur Marriott Hotel</strong> on 7th and 8th November 2025.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The scientific sessions were diverse, engaging, and meticulously designed to update participants on the latest evidence, innovations, and surgical techniques in shoulder and elbow care.
            </p>
            <div className="bg-blue-50 rounded-xl p-4 inline-block">
              <p className="text-blue-800 font-semibold">
                <span className="text-3xl font-bold">170</span> participants registered for the main conference
              </p>
            </div>
          </div>

          {/* International Faculty */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">International Faculty</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              SESICON 2025 was privileged to host eminent international experts, including:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Amit Modi", country: "UK" },
                { name: "Harvinder Singh", country: "UK" },
                { name: "Hyung Bin Park", country: "South Korea" },
                { name: "Jean-David Werthel", country: "France" },
                { name: "Kapil Kumar", country: "UK" },
                { name: "Marc Hirner", country: "New Zealand" },
                { name: "Nuno Sampaio Gomes", country: "Portugal" },
                { name: "Radhakant Pandey", country: "UK" },
              ].map((faculty, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {faculty.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{faculty.name}</p>
                    <p className="text-sm text-gray-500">{faculty.country}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-gray-600 mt-6 italic">
              Their sessions enriched the scientific content and ensured global-level academic exposure for participants.
            </p>
          </div>

          {/* National Faculty */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">National Faculty</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              Renowned national faculty from across India actively contributed as speakers, moderators, panelists, and workshop instructors. Their involvement ensured a rich academic experience for all attendees.
            </p>
          </div>

          {/* Scientific Program Highlights */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Scientific Program Highlights</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              The academic schedule featured a comprehensive blend of learning formats:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                "Live Surgeries",
                "Didactic Lectures",
                "Panel & Case-Based Discussions",
                "Interactive Debates",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-red-50 rounded-lg p-4">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium text-gray-900">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <p className="text-amber-800 font-semibold">
                Oration by SESI President: <span className="text-amber-900">Dr. Deepthi Nandan Reddy A</span>
              </p>
            </div>
            
            <div className="bg-red-50 rounded-xl p-4 inline-block">
              <p className="text-red-800 font-semibold">
                <span className="text-3xl font-bold">20</span> scientific papers were presented during the conference
              </p>
            </div>
          </div>

          {/* Industry-Sponsored Workshops */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Industry-Sponsored Workshops</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Hands-on and focused learning was enhanced through specialized workshops on:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {[
                "Reverse Shoulder",
                "Cuff Repair",
                "Instability",
                "Biological Augmentation",
              ].map((workshop, idx) => (
                <div key={idx} className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
                  <p className="font-semibold text-indigo-900">{workshop}</p>
                </div>
              ))}
            </div>
            
            <p className="text-gray-600 italic">
              These sessions recorded excellent attendance and offered valuable practical insights.
            </p>
          </div>

          {/* Industry Participation */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Industry Participation</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              SESICON 2025 witnessed strong support from leading orthopaedic and pharmaceutical companies.
            </p>
            
            <p className="text-gray-700 mb-4"><strong>Major industry partners included:</strong></p>
            
            <div className="flex flex-wrap gap-2">
              {[
                "Sironix", "Smith & Nephew", "Stryker", "Zimmer Biomet", "Meril", 
                "Biotek", "Arthrex", "Torrent Pharma", "Sun Pharma", "Pharmed", 
                "Emcure", "Dr. Reddy's"
              ].map((partner, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                  {partner}
                </span>
              ))}
            </div>
            
            <p className="text-gray-600 mt-4 italic">
              Their participation added significant value to the exhibition and innovation zones.
            </p>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Conference Conclusion</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              SESICON 2025 concluded successfully, fulfilling its objective of delivering high-quality scientific content, fostering collaboration, and elevating knowledge in shoulder and elbow care.
            </p>
            <p className="text-white/90 leading-relaxed">
              The Organizing Committee expresses sincere gratitude to all faculty members, delegates, sponsors and partner societies for their invaluable support.
            </p>
          </div>

          {/* Back to News */}
          <div className="mt-8 text-center">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to News
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SESICON2025Report;
