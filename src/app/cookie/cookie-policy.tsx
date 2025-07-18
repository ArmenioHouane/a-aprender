"use client"


import Header from "@/components/header"

import Footer from "@/components/footer"


export default function CookiePolicy() {
 
  return (
    <>
    <Header />
    <div className="min-h-screen mt-7 bg-background text-foreground p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-6">
         
        </div>
        <main>
          <h1 className="text-3xl font-bold mb-6">Cookie Policy for A-Aprender</h1>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What are cookies?</h2>
            <p className="mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website.
              They are widely used to make websites work more efficiently and provide information to the owners of the
              site.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How we use cookies</h2>
            <p className="mb-4">
              A-Aprender uses cookies to improve your experience on our website and to help us understand how you use
              our site. We use the following types of cookies:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Essential cookies: These are necessary for the website to function properly.</li>
              <li>Analytical/performance cookies: These help us improve the way our website works.</li>
              <li>Functionality cookies: These allow us to remember choices you make and provide enhanced features.</li>
              <li>Targeting cookies: These are used to deliver advertising more relevant to you and your interests.</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Managing cookies</h2>
            <p className="mb-4">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your
              computer and you can set most browsers to prevent them from being placed. However, if you do this, you may
              have to manually adjust some preferences every time you visit a site and some services and functionalities
              may not work.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at{" "}
              <a href="mailto:privacy@a-aprender.com" className="text-primary hover:underline">
                privacy@a-aprender.com
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

