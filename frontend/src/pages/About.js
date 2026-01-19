import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">About SESI</h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-teal-600 mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              The Shoulder & Elbow Society of India (SESI) is the premier professional organization dedicated to advancing the science and practice of shoulder and elbow surgery in India. Founded with the mission to promote excellence in patient care through education, research, and innovation.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-teal-600 mb-4">Mission</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              To promote the highest standards of shoulder and elbow care through continuous education, research collaboration, and the dissemination of knowledge among orthopaedic surgeons across India.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-teal-600 mb-4">Vision</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              To be the leading authority in shoulder and elbow surgery in India, recognized globally for excellence in clinical practice, education, and research.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-teal-600 mb-4">Our Commitment</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
              <li>Advancing surgical techniques and treatment protocols</li>
              <li>Providing continuing medical education opportunities</li>
              <li>Supporting research and innovation in shoulder and elbow care</li>
              <li>Fostering collaboration among healthcare professionals</li>
              <li>Promoting patient safety and optimal outcomes</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
