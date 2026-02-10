import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="about-title">
            About Us
          </h1>
          <p className="text-white/90">
            Shoulder and Elbow Society of India (SESI) is a professional academic body dedicated to education, research, and advancement in shoulder and elbow surgery.
            SESI conducts conferences, workshops, training programs, and maintains academic registries for continuous professional development.
            The society promotes ethical practice, scientific exchange, and collaboration among orthopaedic surgeons.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Core Mission & Vision
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                The society's primary goal is to ensure that patients in India
                receive world-class care for upper limb conditions. They achieve
                this through:
              </p>
            </div>

            {/* Education, Specialization, Standardization */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 12v4.5c0 .828 2.686 1.5 6 1.5s6-.672 6-1.5V12"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Education
                </h3>
                <p className="text-gray-600 text-sm">
                  Organizing national conferences (like SESICON), cadaveric
                  workshops, and Continuous Medical Education (CME) programs.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="9" strokeWidth={2} />
                    <circle cx="12" cy="12" r="4" strokeWidth={2} />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2v4m0 12v4m10-10h-4M6 12H2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Specialization
                </h3>
                <p className="text-gray-600 text-sm">
                  Transitioning shoulder surgery from a general orthopedic
                  practice to a focused subspecialty.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Standardization
                </h3>
                <p className="text-gray-600 text-sm">
                  Developing evidence-based clinical guidelines and surgical
                  protocols tailored for the Indian healthcare context.
                </p>
              </div>
            </div>
          </div>

          {/* Key Activities */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Key Activities
            </h3>

            <ul className="space-y-5 max-w-4xl">
              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">
                  SESICON:
                </span>{" "}
                An annual national conference that brings together international
                and national experts to discuss cutting-edge technology, such as
                shoulder arthroscopy (keyhole surgery) and joint replacements.
              </li>

              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">
                  Fellowships:
                </span>{" "}
                SESI offers structured clinical fellowships (6-12 weeks) and
                international observerships in collaboration with global bodies
                like the ASES (USA) and SECEC (Europe).
              </li>

              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">
                  Journal Club:
                </span>{" "}
                Regular virtual journal clubs (often streamed on OrthoTV) to
                discuss recent academic papers and complex cases.
              </li>
            </ul>
          </div>

          {/* Organization & Leadership */}
          <div className="my-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Organization & Leadership
            </h3>

            <ul className="space-y-5 max-w-4xl">
              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">
                  Headquarters:
                </span>
              </li>

              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">
                  Membership:
                </span>{" "}
                Comprised of over 480 active orthopedic surgeons, educators, and
                researchers.
              </li>

              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">
                  Affiliations:
                </span>{" "}
                SESI maintains strong ties with global organizations including
                the <b>American Shoulder and Elbow Surgeons (ASES)</b> and the{" "}
                <b>Asia Pacific Orthopaedic Association (APOA).</b>
              </li>
            </ul>
          </div>

          {/* Governance */}
          <div className="my-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Governance
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  SESI functions as a registered professional society, operating
                  under its Constitution and Bylaws.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-8">
                Key elements of its governance framework include:
              </h3>

              <ul className="space-y-5 max-w-4xl">
                <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                  <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                  General Body Meetings held annually during the national
                  conference
                </li>

                <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                  <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                  Executive Committee meetings to plan academic and
                  administrative activities
                </li>

                <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                  <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                  Transparent elections for office bearers every two years
                </li>

                <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                  <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                  Maintenance of records and reports in compliance with the
                  Society's registration norms
                </li>
              </ul>
            </div>
          </div>

          {/* Affiliations */}
          <div className="my-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Affiliations
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  SESI is recognized as the Shoulder and Elbow Subspecialty
                  Section under the Indian Orthopaedic Association (IOA) and
                  maintains collaborations with :
                </p>
              </div>

              {/* <h3 className="text-xl font-bold text-gray-900 mb-8">
                Key elements of its governance framework include:
              </h3> */}

              <ul className="space-y-5 max-w-4xl">
                <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                  <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                  American Shoulder and Elbow Surgeons (ASES)
                </li>

                <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                  <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                  European Society for Surgery of the Shoulder and Elbow
                  (SECEC-ESSSE)
                </li>

                <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                  <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                  Asia Pacific Orthopaedic Association (APOA) - Shoulder & Elbow
                  Chapter
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Become a member of SESI and be part of India's premier society for
              shoulder and elbow surgery.
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
