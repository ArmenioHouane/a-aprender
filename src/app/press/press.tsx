'use client'
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Press() {
  return (
    <>
    <Header />
    <div className="mt-8 bg-background text-foreground p-8">
      <div className="max-w-3xl mx-auto">
        
        <main>
          <h1 className="text-3xl font-bold mb-6">A-Aprender Press Room</h1>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="text-xl font-semibold">A-Aprender Launches New AI-Powered Learning Assistant</h3>
                <p className="text-sm text-muted-foreground">June 15, 2023</p>
              </li>
              <li>
                <h3 className="text-xl font-semibold">A-Aprender Reaches 1 Million Active Learners</h3>
                <p className="text-sm text-muted-foreground">May 1, 2023</p>
              </li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Media Resources</h2>
            <p className="mb-4">
              For media inquiries, please contact our press team at{" "}
              <a href="mailto:press@a-aprender.com" className="text-primary hover:underline">
                press@a-aprender.com
              </a>
              .
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Brand Assets</h2>
            <p className="mb-4">
              Download our logo and other brand assets{" "}
              <a href="#" className="text-primary hover:underline">
                here
              </a>
              .
            </p>
          </section>
        </main>
      </div>
    </div>
    <Footer />
    </>
  )
}

