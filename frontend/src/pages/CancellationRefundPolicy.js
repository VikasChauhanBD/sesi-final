import React from "react";
import { Link } from "react-router-dom";

const CancellationRefundPolicy = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="about-title">
            Cancellation & Refund Policy
          </h1>
          <p className="text-white/90 max-w-3xl">
            The following standardized refund rules typically apply to SESICON
            (Annual Conference) and other paid workshops.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Refund Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                      Timeline of Request
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                      Refund Percentage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-gray-700">
                      Up to 6–8 months before event
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      75% Refund{" "}
                      <span className="text-gray-500">
                        (25% Cancellation Fee)
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 text-gray-700">
                      3–6 months before event
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      50% Refund{" "}
                      <span className="text-gray-500">
                        (50% Cancellation Fee)
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="px-6 py-4 text-gray-700">
                      1–3 months before event
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      25% Refund{" "}
                      <span className="text-gray-500">
                        (75% Cancellation Fee)
                      </span>
                    </td>
                  </tr>

                  <tr className="bg-red-50">
                    <td className="px-6 py-4 text-gray-900 font-semibold">
                      Less than 30 days / No Show
                    </td>
                    <td className="px-6 py-4 text-red-600 font-semibold">
                      No Refund
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <ul className="space-y-5">
              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">
                  Non-Refundable:
                </span>{" "}
                GST and bank processing charges are generally non-refundable.
              </li>

              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">
                  Processing Time:
                </span>{" "}
                Refunds are typically processed within <b>45 days</b> after the
                completion of the conference.
              </li>

              <li className="relative pl-7 text-gray-600 text-base leading-relaxed">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-gray-900 text-lg">
                  Membership Fees:
                </span>{" "}
                Lifetime or annual membership fees are usually{" "}
                <b>non-refundable</b> once the membership is activated.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;
