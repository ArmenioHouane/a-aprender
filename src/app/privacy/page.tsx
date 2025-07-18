'use client'
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PrivacyPolicy() {
  return (
    <>
    <Header/>
    
    <div className="min-h-screen mt-10 bg-gray-50 dark:bg-[#0a0a0a] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Privacy Policy</h1>

        <div className="bg-white dark:bg-slate-900 dark:text-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard
              your information when you visit our educational platform or use our services.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect information you provide directly to us, such as when you create an account, enroll in a course,
              or contact us for support. This may include:
            </p>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Personal information (e.g., name, email address, payment information)</li>
              <li>Profile information (e.g., educational background, interests)</li>
              <li>Course progress and completion data</li>
              <li>Communications with us</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Personalize your experience on our platform</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Sharing of Information</h2>
            <p className="text-gray-700 mb-4">We may share your information as follows:</p>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>
                With vendors, consultants, and other service providers who need access to such information to carry out
                work on our behalf
              </li>
              <li>
                In response to a request for information if we believe disclosure is in accordance with, or required by,
                any applicable law, regulation, or legal process
              </li>
              <li>
                If we believe your actions are inconsistent with our user agreements or policies, or to protect the
                rights, property, and safety of our company or others
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized
              access, disclosure, alteration, and destruction. However, no internet or electronic storage system is
              completely secure, and we cannot guarantee the absolute security of your information.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Your Choices</h2>
            <p className="text-gray-700 mb-4">
              You may update, correct, or delete your account information at any time by logging into your account or
              contacting us. You may also opt out of receiving promotional communications from us by following the
              instructions in those messages.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Cookies and Similar Technologies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to collect information about your browsing activities and to
              distinguish you from other users of our platform. You can instruct your browser to refuse all or some
              browser cookies, or to alert you when cookies are being sent.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our services are not directed to children under 13. We do not knowingly collect personal information from
              children under 13. If we learn we have collected or received personal information from a child under 13
              without verification of parental consent, we will delete that information.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the &quot;Last updated&quot; date at the bottom of this Privacy Policy.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <Link href="armeniozazu@gmail.com" className="text-blue-600 hover:underline">
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
    <Footer/>
    </>
  )
}

