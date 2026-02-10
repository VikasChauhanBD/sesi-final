import React from "react";
import { Link } from "react-router-dom";

const TermsConditions = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="about-title">
            Terms & Conditions (T&C)
          </h1>
          <p className="text-white/90">
            By accessing the SESI online portal or applying for membership,
            users agree to the following
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
                  Ownership:
                </span>{" "}
                All content, including surgical guidelines, toolkits, and
                research articles, is the intellectual property of SESI.
              </li>

              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">Usage:</span>{" "}
                Content is provided for{" "}
                <b>personal and educational use only.</b>
                Reproduction or resale without written authorization is
                prohibited.
              </li>

              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">
                  Membership:
                </span>{" "}
                Membership is subject to the verification of medical
                credentials. False information may lead to immediate termination
                of membership.
              </li>

              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">
                  Compliance:
                </span>{" "}
                Users must comply with the Society's Constitution and Bylaws, as
                it is a registered body under the Indian Orthopaedic Association
                (IOA).
              </li>
            </ul>
          </div>

          {/* Important Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-8">
            <h3 className="text-lg font-bold text-amber-800 mb-4">Important Note</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="relative pl-7 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-amber-500"></span>
                All payments made on the SESI website are subject to confirmation.
              </li>
              <li className="relative pl-7 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-amber-500"></span>
                Registration and membership are non-transferable.
              </li>
              <li className="relative pl-7 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-amber-500"></span>
                SESI reserves the right to modify events, schedules, speakers, or fees if required.
              </li>
              <li className="relative pl-7 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-amber-500"></span>
                By making a payment, the user agrees to abide by SESI rules and policies.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
