import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { publicAPI } from '../utils/api';

// Executive Committee List Page
export const ExecutiveCommittee = () => {
  const [committee, setCommittee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2025);

  const years = [2025, 2024, 2023, 2022, 2021];

  useEffect(() => {
    const fetchCommittee = async () => {
      try {
        const response = await publicAPI.getCommittee({ year: selectedYear });
        setCommittee(response.data);
      } catch (error) {
        console.error('Error fetching committee:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommittee();
  }, [selectedYear]);

  const officeBearers = committee.filter(m => 
    ['President', 'Secretary', 'Finance Secretary', 'Immediate Past President', 'Vice President', 'Treasurer', 'Joint Secretary'].includes(m.designation)
  );
  const ecMembers = committee.filter(m => m.designation === 'EC Member');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="committee-title">Executive Committee</h1>
          <p className="text-white/90 max-w-2xl">
            Meet the dedicated leaders guiding SESI's mission to advance shoulder and elbow surgery in India.
          </p>
        </div>
      </section>

      {/* Year Filter */}
      <section className="bg-white shadow-md sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-4 overflow-x-auto">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-full font-medium transition whitespace-nowrap ${
                  selectedYear === year
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                data-testid={`year-filter-${year}`}
              >
                {year}-{(year + 1).toString().slice(-2)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-600 border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Office Bearers */}
            {officeBearers.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Office Bearers</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-testid="office-bearers-grid">
                  {officeBearers.map((member) => (
                    <Link
                      key={member.id}
                      to={`/executive-committee/${member.slug}`}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group"
                      data-testid={`member-card-${member.slug}`}
                    >
                      <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                        {member.profile_image ? (
                          <img src={member.profile_image} alt={member.full_name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-28 h-28 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-4xl font-bold">
                              {member.full_name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition">{member.full_name}</h3>
                        <p className="text-orange-600 font-semibold mt-1">{member.designation}</p>
                        {member.qualifications && (
                          <p className="text-sm text-gray-500 mt-2">{member.qualifications}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* EC Members */}
            {ecMembers.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Executive Committee Members</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6" data-testid="ec-members-grid">
                  {ecMembers.map((member) => (
                    <Link
                      key={member.id}
                      to={`/executive-committee/${member.slug}`}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group"
                      data-testid={`ec-member-card-${member.slug}`}
                    >
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        {member.profile_image ? (
                          <img src={member.profile_image} alt={member.full_name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">
                              {member.full_name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition text-sm">{member.full_name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{member.designation}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {committee.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500">No committee members found for {selectedYear}-{selectedYear + 1}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Individual Committee Member Profile Page
export const CommitteeMemberProfile = () => {
  const { slug } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await publicAPI.getCommittee();
        const foundMember = response.data.find(m => m.slug === slug);
        setMember(foundMember);
      } catch (error) {
        console.error('Error fetching member:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Member Not Found</h1>
          <Link to="/executive-committee" className="text-orange-600 hover:text-orange-700">
            ← Back to Executive Committee
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link to="/executive-committee" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Executive Committee
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              {member.profile_image ? (
                <img src={member.profile_image} alt={member.full_name} className="w-full h-full object-cover rounded-full" />
              ) : (
                <span className="text-white text-5xl font-bold">
                  {member.full_name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2" data-testid="member-name">{member.full_name}</h1>
              <p className="text-xl text-orange-200 font-semibold" data-testid="member-designation">
                {member.designation}, Shoulder and Elbow Society of India
              </p>
              {member.qualifications && (
                <p className="text-white/80 mt-2">{member.qualifications}</p>
              )}
              {member.hospital && (
                <p className="text-white/80 mt-1">{member.hospital}{member.city && `, ${member.city}`}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Bio */}
          {member.bio && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line" data-testid="member-bio">{member.bio}</p>
            </div>
          )}

          {/* Contact Info */}
          {member.email && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
              <a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {member.email}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveCommittee;
