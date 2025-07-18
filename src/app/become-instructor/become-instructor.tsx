'use client'
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"


export default function BecomeInstructor() {
  return (
    <>
    <Header />
    <div className="min-h-screen mt-9 bg-background text-foreground p-8">
      <div className="max-w-3xl mx-auto">
        
        <main>
          <h1 className="text-3xl font-bold mb-6">Become an Instructor</h1>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Share Your Knowledge</h2>
            <p className="mb-4">
              Join A-Aprender as an instructor and share your expertise with students around the world. Our platform
              provides you with the tools and support you need to create engaging online courses.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Benefits of Teaching with A-Aprender</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Reach a global audience of eager learners</li>
              <li>Flexible schedule - teach on your own time</li>
              <li>Access to cutting-edge course creation tools</li>
              <li>Dedicated support team to help you succeed</li>
              <li>Competitive revenue sharing model</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Get Started</h2>
            <p className="mb-4">Ready to start your journey as an A-Aprender instructor? Follow these steps:</p>
            <ol className="list-decimal pl-6 mb-4">
              <li>Fill out our instructor application form</li>
              <li>Submit a sample video showcasing your teaching style</li>
              <li>Once approved, attend our online instructor orientation</li>
              <li>Start creating your first course!</li>
            </ol>
           <Button>
           Apply Now
           </Button>
            
            
          </section>
        </main>
      </div>
    </div>
    <Footer />
    </>
  )
}

