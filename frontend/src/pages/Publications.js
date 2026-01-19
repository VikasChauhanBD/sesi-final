import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Publications Landing Page
const Publications = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Publications</h1>
          <p className="text-white/90 max-w-2xl">
            SESI promotes academic excellence through official publications, peer-reviewed journals, 
            newsletters, and educational articles.
          </p>
        </div>
      </section>

      {/* Sub Navigation */}
      <div className="bg-white shadow-md sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-4 overflow-x-auto">
            {[
              { name: 'JSESI', path: '/publications/jsesi' },
              { name: 'Manuscript Submission', path: '/publications/manuscript-submission' },
              { name: 'Newsletters', path: '/publications/newsletters' },
            ].map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-2 rounded-full font-medium transition whitespace-nowrap ${
                  currentPath === item.path
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {currentPath === '/publications/jsesi' || currentPath === '/publications' ? (
          <JSESIContent />
        ) : currentPath === '/publications/manuscript-submission' ? (
          <ManuscriptSubmissionContent />
        ) : currentPath === '/publications/newsletters' ? (
          <NewslettersContent />
        ) : (
          <JSESIContent />
        )}
      </div>
    </div>
  );
};

// JSESI Content
const JSESIContent = () => (
  <div className="max-w-4xl mx-auto">
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-xl">JSESI</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Journal of SESI</h2>
          <p className="text-gray-500">Official Peer-Reviewed Publication</p>
        </div>
      </div>
      
      <p className="text-lg text-gray-600 mb-6">
        The Journal of Shoulder and Elbow Society of India (JSESI) is the official peer-reviewed 
        publication of SESI, dedicated to advancing scientific knowledge in the field of shoulder 
        and elbow surgery.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-orange-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">Scope</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              Original research articles
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              Review articles
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              Case reports
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              Technical notes
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              Letters to the editor
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">Key Topics</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              Shoulder arthroscopy
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              Elbow arthroplasty
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              Sports injuries
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              Trauma reconstruction
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              Rehabilitation protocols
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-bold text-gray-900 mb-4">Submit Your Research</h3>
        <p className="text-gray-600 mb-4">
          We invite researchers and clinicians to submit their work for publication in JSESI.
        </p>
        <Link
          to="/publications/manuscript-submission"
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-medium transition"
        >
          Submit Manuscript
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  </div>
);

// Manuscript Submission Content
const ManuscriptSubmissionContent = () => (
  <div className="max-w-4xl mx-auto">
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manuscript Submission Guidelines</h2>
      
      <p className="text-lg text-gray-600 mb-8">
        SESI encourages sharing of research, innovations, and clinical experiences for the 
        advancement of shoulder and elbow surgery.
      </p>

      <div className="space-y-6">
        <div className="border-l-4 border-orange-500 pl-6">
          <h3 className="font-bold text-gray-900 mb-2">1. Manuscript Types</h3>
          <ul className="text-gray-600 space-y-1">
            <li>• Original Articles (3000-5000 words)</li>
            <li>• Review Articles (4000-6000 words)</li>
            <li>• Case Reports (1500-2500 words)</li>
            <li>• Technical Notes (1000-2000 words)</li>
          </ul>
        </div>

        <div className="border-l-4 border-blue-500 pl-6">
          <h3 className="font-bold text-gray-900 mb-2">2. Submission Requirements</h3>
          <ul className="text-gray-600 space-y-1">
            <li>• Cover letter with author details</li>
            <li>• Manuscript in Microsoft Word format</li>
            <li>• Figures in high resolution (300 DPI minimum)</li>
            <li>• Ethics committee approval (if applicable)</li>
            <li>• Conflict of interest declaration</li>
          </ul>
        </div>

        <div className="border-l-4 border-green-500 pl-6">
          <h3 className="font-bold text-gray-900 mb-2">3. Review Process</h3>
          <ul className="text-gray-600 space-y-1">
            <li>• Double-blind peer review</li>
            <li>• Initial decision within 4-6 weeks</li>
            <li>• Revision period: 4 weeks</li>
            <li>• Final acceptance notification via email</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-gray-900 mb-4">Submit Your Manuscript</h3>
        <p className="text-gray-600 mb-4">
          Send your manuscript and supporting documents to:
        </p>
        <a 
          href="mailto:submissions@sesi.co.in" 
          className="text-orange-600 hover:text-orange-700 font-medium text-lg"
        >
          submissions@sesi.co.in
        </a>
      </div>
    </div>
  </div>
);

// Newsletters Content
const NewslettersContent = () => (
  <div className="max-w-4xl mx-auto">
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">SESI Newsletters</h2>
      
      <p className="text-lg text-gray-600 mb-8">
        Stay updated with the latest news, events, and developments in shoulder and elbow surgery 
        through our periodic newsletters.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
          <div className="text-sm text-orange-600 font-medium mb-2">Latest Issue</div>
          <h3 className="font-bold text-gray-900 mb-2">SESI Newsletter - Q4 2025</h3>
          <p className="text-gray-600 text-sm mb-4">
            Highlights from SESICon 2025, fellowship announcements, and member achievements.
          </p>
          <button className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1">
            Download PDF
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="text-sm text-gray-500 font-medium mb-2">Previous Issue</div>
          <h3 className="font-bold text-gray-900 mb-2">SESI Newsletter - Q3 2025</h3>
          <p className="text-gray-600 text-sm mb-4">
            Research highlights, workshop reports, and upcoming educational programs.
          </p>
          <button className="text-gray-600 hover:text-gray-700 font-medium text-sm flex items-center gap-1">
            Download PDF
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-bold text-gray-900 mb-4">Subscribe to Newsletter</h3>
        <p className="text-gray-600 mb-4">
          Members automatically receive newsletters. Non-members can subscribe to stay informed.
        </p>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Publications;
