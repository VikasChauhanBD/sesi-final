import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';

// Resources Landing Page
const Resources = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // SEO data for each sub-page
  const seoData = {
    '/resources': {
      title: 'Resources',
      description: 'SESI resources hub with clinical guidelines, downloads, protocols, and educational tools supporting evidence-based practice in shoulder & elbow surgery.',
      keywords: 'SESI resources, clinical guidelines, orthopaedic downloads, medical education resources'
    },
    '/resources/guidelines': {
      title: 'Clinical Guidelines',
      description: 'Evidence-based clinical guidelines for shoulder and elbow surgery developed by SESI expert committees to standardize care and improve patient outcomes.',
      keywords: 'clinical guidelines, rotator cuff guidelines, shoulder surgery protocols, elbow treatment guidelines'
    },
    '/resources/downloads': {
      title: 'Downloads Center',
      description: 'Download SESI official documents, forms, templates, patient education materials, and conference brochures.',
      keywords: 'SESI downloads, membership forms, fellowship application, patient education'
    },
    '/resources/links': {
      title: 'Learning Links',
      description: 'Curated collection of educational and clinical resources for surgeons, physiotherapists, trainees, and patients in shoulder & elbow surgery.',
      keywords: 'orthopaedic learning, medical education links, shoulder surgery resources, ASES, ESES'
    }
  };

  const currentSEO = seoData[currentPath] || seoData['/resources'];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        canonical={currentPath}
      />
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Resources</h1>
          <p className="text-white/90 max-w-2xl">
            A comprehensive knowledge hub with guidelines, protocols, downloads, and educational tools 
            supporting evidence-based practice.
          </p>
        </div>
      </section>

      {/* Sub Navigation */}
      <div className="bg-white shadow-md sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-4 overflow-x-auto">
            {[
              { name: 'Guidelines', path: '/resources/guidelines' },
              { name: 'Downloads', path: '/resources/downloads' },
              { name: 'Learning Links', path: '/resources/links' },
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
        {currentPath === '/resources/guidelines' || currentPath === '/resources' ? (
          <GuidelinesContent />
        ) : currentPath === '/resources/downloads' ? (
          <DownloadsContent />
        ) : currentPath === '/resources/links' ? (
          <LearningLinksContent />
        ) : (
          <GuidelinesContent />
        )}
      </div>
    </div>
  );
};

// Guidelines Content
const GuidelinesContent = () => {
  const guidelines = [
    {
      title: 'Rotator Cuff Tear Management',
      description: 'Comprehensive guidelines for diagnosis and surgical decision-making in rotator cuff injuries.',
      category: 'Shoulder',
      year: 2024
    },
    {
      title: 'Shoulder Instability: Evaluation & Arthroscopic Techniques',
      description: 'Evidence-based approach to evaluating and treating shoulder instability with arthroscopic methods.',
      category: 'Shoulder',
      year: 2024
    },
    {
      title: 'Proximal Humerus Fractures: Fixation vs Arthroplasty',
      description: 'Decision-making guidelines for treatment of proximal humerus fractures.',
      category: 'Trauma',
      year: 2023
    },
    {
      title: 'Elbow Fracture-Dislocations: Operative Approach & Rehab',
      description: 'Surgical approaches and rehabilitation protocols for complex elbow injuries.',
      category: 'Elbow',
      year: 2023
    },
    {
      title: 'Postoperative Physiotherapy Protocols',
      description: 'Standardized rehabilitation protocols for shoulder and elbow surgeries.',
      category: 'Rehabilitation',
      year: 2024
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Clinical Guidelines</h2>
        
        <p className="text-lg text-gray-600 mb-8">
          SESI provides evidence-based clinical guidelines developed by expert committees to 
          standardize care and improve patient outcomes.
        </p>

        <div className="space-y-4">
          {guidelines.map((guide, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded">
                      {guide.category}
                    </span>
                    <span className="text-xs text-gray-400">{guide.year}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{guide.title}</h3>
                  <p className="text-gray-600 text-sm">{guide.description}</p>
                </div>
                <button className="ml-4 text-orange-600 hover:text-orange-700 p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Downloads Content
const DownloadsContent = () => {
  const downloads = [
    { name: 'Membership Application Form', type: 'PDF', size: '245 KB', category: 'Forms' },
    { name: 'Fellowship Application Form', type: 'PDF', size: '312 KB', category: 'Forms' },
    { name: 'SESI Constitution & Bylaws', type: 'PDF', size: '1.2 MB', category: 'Documents' },
    { name: 'Conference Brochure 2025', type: 'PDF', size: '5.4 MB', category: 'Events' },
    { name: 'Abstract Submission Template', type: 'DOCX', size: '45 KB', category: 'Templates' },
    { name: 'Patient Education - Rotator Cuff', type: 'PDF', size: '890 KB', category: 'Patient Info' },
    { name: 'Patient Education - Frozen Shoulder', type: 'PDF', size: '720 KB', category: 'Patient Info' },
    { name: 'Rehabilitation Protocol Template', type: 'PDF', size: '156 KB', category: 'Templates' },
  ];

  const categories = [...new Set(downloads.map(d => d.category))];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Downloads Center</h2>
        
        <p className="text-lg text-gray-600 mb-8">
          A one-stop destination for all official SESI documents, templates, and educational materials.
        </p>

        {categories.map(category => (
          <div key={category} className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              {category}
            </h3>
            <div className="space-y-3">
              {downloads.filter(d => d.category === category).map((file, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      file.type === 'PDF' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{file.type} • {file.size}</p>
                    </div>
                  </div>
                  <button className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1">
                    Download
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Learning Links Content
const LearningLinksContent = () => {
  const links = [
    {
      title: 'American Shoulder and Elbow Surgeons (ASES)',
      url: 'https://www.ases-assn.org',
      description: 'Leading US organization for shoulder and elbow surgery education.'
    },
    {
      title: 'European Shoulder and Elbow Society (ESES)',
      url: 'https://www.secec-essse.org',
      description: 'European society promoting education and research.'
    },
    {
      title: 'Indian Orthopaedic Association (IOA)',
      url: 'https://www.ioaindia.org',
      description: 'Premier orthopaedic organization in India.'
    },
    {
      title: 'Arthroscopy Association of North America (AANA)',
      url: 'https://www.aana.org',
      description: 'Resources for arthroscopic surgery education.'
    },
    {
      title: 'PubMed - Shoulder & Elbow Research',
      url: 'https://pubmed.ncbi.nlm.nih.gov',
      description: 'Access to medical literature and research papers.'
    },
    {
      title: 'OrthoInfo (AAOS)',
      url: 'https://www.orthoinfo.org',
      description: 'Patient education resources from American Academy.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Links</h2>
        
        <p className="text-lg text-gray-600 mb-8">
          A curated collection of educational and clinical resources for surgeons, physiotherapists, 
          trainees, and patients.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 border border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-md transition group"
            >
              <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition mb-2 flex items-center gap-2">
                {link.title}
                <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </h3>
              <p className="text-gray-600 text-sm">{link.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
