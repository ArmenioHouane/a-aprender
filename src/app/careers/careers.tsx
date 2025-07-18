'use client'
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Careers() {
  return (
    <>
    <Header />
    <div className=" mt-8 bg-background text-foreground p-8">
      <div className="max-w-3xl mx-auto">
         
        <main>
          <h1 className="text-3xl font-bold mb-6">Careers at A-Aprender</h1>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Join Our Team</h2>
            <p className="mb-4">
              We&apos;re always looking for passionate individuals to join our mission of making education accessible to all.
              At A-Aprender, you&apos;ll have the opportunity to make a real impact on the future of learning.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Senior Full Stack Developer</li>
                </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Apply</h2>
            <p className="">
              To apply for a position, please send your resume and a cover letter to{" "}
              <a href="mailto:careers@a-aprender.com" className="text-primary hover:underline">
                careers@a-aprender.com
              </a>
              . We look forward to hearing from you!
            </p>
          </section>
        </main>
      </div>
    </div>
    <Footer />
    </>
  )
}

