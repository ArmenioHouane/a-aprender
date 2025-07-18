'use client'

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"


export default function TermsAndConditions() {
  return (
    <>
    <Header />
    <div className="min-h-screen mt-10 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Terms and Conditions</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using our educational platform, you agree to be bound by these Terms and Conditions, all
              applicable laws and regulations, and agree that you are responsible for compliance with any applicable
              local laws.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              To access certain features of the platform, you may be required to create an account. You are responsible
              for maintaining the confidentiality of your account and password and for restricting access to your
              computer.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Course Content</h2>
            <p className="text-gray-700 mb-4">
              The content provided through our platform is for educational purposes only. We do not guarantee the
              accuracy, completeness, or usefulness of this information. Any reliance you place on such information is
              strictly at your own risk.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. User-Generated Content</h2>
            <p className="text-gray-700 mb-4">
              Users may post reviews, comments, and other content as long as the content is not illegal, obscene,
              threatening, defamatory, invasive of privacy, infringing on intellectual property rights, or otherwise
              injurious to third parties.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The content, features, and functionality of our platform are owned by us, our licensors, or other
              providers of such material and are protected by international copyright, trademark, patent, trade secret,
              and other intellectual property or proprietary rights laws.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Payments and Refunds</h2>
            <p className="text-gray-700 mb-4">
              Payments for courses are due at the time of enrollment. We offer a 30-day money-back guarantee for most
              courses. If you&apos;re unsatisfied with a course, you can request a refund within 30 days of enrollment.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              In no event shall we be liable for any indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting
              from your access to or use of or inability to access or use the platform.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without
              regard to its conflict of law provisions.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material we will try to provide at least 30 days&apos; notice prior to any new terms taking effect.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms, please contact us at{" "}
              <Link href="mailto:armeniozazu@gmail.com" className="text-blue-600 hover:underline">
              armeniozazu@gmail.com
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

