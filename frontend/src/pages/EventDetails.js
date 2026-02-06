import React from "react";
import { Link } from "react-router-dom";

const EventDetails = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="event-title">
            Event details
          </h1>
          <p className="text-white/90 max-w-3xl">
            The <b>Shoulder and Elbow Society of India (SESI)</b> holds its
            major national academic events once every 2 years. Based on the
            current schedule for 2026, here are the primary event details:
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* SESICON 2025 Recap */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg p-8 border border-purple-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                1. SESI Annual Conference (SESICON)
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                While the flagship national conference is typically held in the
                last quarter of the year, there is also a major{" "}
                <b>SESICON 2025</b> was held at Jaipur from 6-8<sup>th</sup>{" "}
                November 2025
              </p>

              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <p className="text-lg font-semibold text-gray-700 mb-1">
                    Location:
                  </p>
                  <p className="text-gray-700">Jaipur, Rajasthan</p>
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold text-gray-700 mb-1">
                  Theme:
                </p>
                <p className="text-gray-700">
                  "Advancing Arthroscopy and Arthroplasty in Shoulder & Elbow
                  Surgery"
                </p>
              </div>

              <div>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Highlights:
                </p>
                <p className="text-gray-700">
                  Live surgeries, keynote lectures by international faculty, and
                  interactive case discussions.
                </p>
              </div>
            </div>
          </div>

          {/* Specialized Workshops 2026 */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg p-8 border border-orange-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-orange-600 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6l4 2M20 12a8 8 0 11-16 0 8 8 0 0116 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                2. Specialized Workshops & Courses (2026)
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              SESI collaborates with regional orthopedic bodies to provide
              hands-on training. Key upcoming sessions include:
            </p>

            <div className="space-y-6">
              {/* Workshop 1 */}
              <div className="border-l-4 border-orange-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Cadaveric Shoulder Arthroscopy Course
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-700 mb-1">
                      Date
                    </p>
                    <p className="text-gray-900">January 2026</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-700 mb-1">
                      Venue
                    </p>
                    <p className="text-gray-900">Pune, Maharashtra</p>
                  </div>
                </div>
              </div>

              {/* Workshop 2 */}
              <div className="border-l-4 border-orange-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Basic Elbow Fracture Fixation Workshop
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-700 mb-1">
                      Date
                    </p>
                    <p className="text-gray-900">February 2026</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-700 mb-1">
                      Venue
                    </p>
                    <p className="text-gray-900">Chennai, Tamil Nadu</p>
                  </div>
                </div>
              </div>

              {/* Workshop 3 */}
              <div className="border-l-4 border-orange-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  BOS Shoulder & Elbow Course (Affiliated)
                </h3>
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-lg font-semibold text-gray-700 mb-1">
                        Date
                      </p>
                      <p className="text-gray-900">January 17-23, 2026</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-700 mb-1">
                        Venue
                      </p>
                      <p className="text-gray-900">
                        Mumbai (Cooper Hospital & BJ Wadia Hospital)
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      Focus
                    </p>
                    <p className="text-gray-700">
                      Didactic lectures, saw-bone workshops, and surgeon visits
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* International Congress */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-blue-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                3. International Representation (ICSES 2026)
              </h2>
            </div>

            <p className="text-gray-700 mb-6">
              For members looking at the global stage, SESI heavily promotes the
              <b>
                International Congress on Shoulder and Elbow Surgery (ICSES)
              </b>
              :
            </p>

            <div className="space-y-4 mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-blue-700 uppercase mb-1">
                    Date
                  </p>
                  <p className="text-lg text-gray-900">September 22-25, 2026</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-700 uppercase mb-1">
                    Location
                  </p>
                  <p className="text-lg text-gray-900">Vancouver, Canada</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
              <p className="text-sm font-semibold text-blue-700 uppercase mb-1">
                Significance
              </p>
              <p className="text-gray-900">
                This is the triennial "World Cup" of shoulder surgery, where
                SESI members often present Indian research data.
              </p>
            </div>
          </div>

          {/* Registration & Deadlines Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gray-900 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">
                Registration & Deadlines
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                      Activity
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                      Deadline
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      SESI Clinical Fellowships 2026
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">
                      January 31, 2026
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      SESICON Registration
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Early bird usually ends 4-5 months prior
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      Abstract Submissions
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Check official portal 6 months before the event
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Membership & Registration Fees */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Registration Fee / Membership Fee:
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              The registration and membership fees for the{" "}
              <b>Shoulder and Elbow Society of India (SESI)</b> vary depending
              on whether you are applying for a lifetime membership or
              registering for a specific annual conference (SESICON).
            </p>

            <div className="space-y-6">
              {/* Membership Fees */}
              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  1. Membership Fees
                </h3>
                <p className="text-gray-600 mb-4">
                  SESI offers professional membership to orthopedic surgeons and
                  trainees.
                </p>

                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <p className="text-lg font-semibold text-gray-700 mb-1">
                    Life Membership Fee:
                  </p>
                  <p className="text-2xl font-bold text-green-700">
                    Approximately ₹5,000
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    (varies by year and membership category like Associate or
                    Life Member)
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-700 mb-1">
                      Eligibility:
                    </p>
                    <p className="text-gray-700">
                      Requires a postgraduate degree in Orthopaedics (MS/DNB)
                      and registration with the Medical Council of India (MCI)
                      or State Medical Council.
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      Benefits:
                    </p>
                    <p className="text-gray-700">
                      Reduced registration rates for SESICON, eligibility for
                      clinical fellowships, and access to the official journal
                      (JSESI).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
