'use client'
import Header from "@/components/header"
import Footer from "@/components/footer"

const faqItems = [
  {
    question: "How do I reset my password?",
    answer:
      'To reset your password, click on the "Forgot Password" link on the login page and follow the instructions sent to your email.',
  },
  {
    question: "Can I download course materials for offline viewing?",
    answer:
      "Yes, most course materials are available for download. Look for the download icon next to each lesson in your course dashboard.",
  },
  {
    question: "How do I get a certificate of completion?",
    answer:
      "Certificates of completion are automatically generated once you've completed all required course modules and assignments.",
  },
]

export default function HelpCenter() {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-3xl mx-auto">
        
        <main>
          <h1 className="text-3xl font-bold mb-6">Help Center</h1>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            {faqItems.map((item, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
            <p className="mb-4">
              If you couldn&apos;t find the answer to your question, please don&apos;t hesitate to contact our support team.
            </p>
            <a href="mailto:support@a-aprender.com" className="text-primary hover:underline">
              support@a-aprender.com
            </a>
          </section>
        </main>
      </div>
    </div>
    <Footer />
    </>
  )
}

