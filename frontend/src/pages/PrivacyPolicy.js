import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="about-title">
            Privacy Policy
          </h1>
          <p className="text-white/90">
            SESI is committed to protecting the personally identifiable
            information (PII) of its members and patients
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div>
            <ul className="space-y-5 max-w-4xl">
              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">
                  Data Collection:
                </span>{" "}
                Collected data (Name, Email, Phone, Medical License Number) is
                used solely for membership management, event registration, and
                scientific updates.
              </li>

              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">
                  Medical Confidentiality:
                </span>{" "}
                Patient information shared in research or case studies is
                anonymized to ensure HIPAA and Indian medical ethics compliance.
              </li>

              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">
                  Third Parties:
                </span>{" "}
                Personal data is not rented or sold. It may only be shared with
                trusted partners (like conference organizers or the official
                journal) for society-related activities.
              </li>

              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">
                  Security:
                </span>{" "}
                Reasonable administrative and technical safeguards are
                maintained to prevent unauthorized access to the member
                database.
              </li>
            </ul>
          </div>

          {/* Important Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8">
            <h3 className="text-lg font-bold text-blue-800 mb-4">Important Note</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="relative pl-7 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-500"></span>
                SESI collects personal information solely for membership, event registration, and academic communication.
              </li>
              <li className="relative pl-7 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-500"></span>
                Data is not shared with third parties except as required for payment processing or legal compliance.
              </li>
              <li className="relative pl-7 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-500"></span>
                Secure payment gateways are used to ensure data protection.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
