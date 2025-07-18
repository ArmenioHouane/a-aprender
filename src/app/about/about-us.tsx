'use client'
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutUs() {
    return (
        <>
        <Header />
        <div className="min-h-screen mt-6 bg-background text-foreground p-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-end mb-6">

                </div>
                <main>
                    <h1 className="text-3xl font-bold mb-6">About A-Aprender</h1>
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p className="mb-4">
                            At A-Aprender, our mission is to make education accessible,
                             practical, and transformative. We believe that learning 
                             should be a lifelong journey, empowering individuals to 
                             achieve their goals, whether in their careers or personal 
                             growth. Our platform connects passionate instructors with 
                             eager learners, creating a space where knowledge is shared 
                             and skills are built for the future.
                        </p>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                        <p className="mb-4">
                          A-Aprender was founded with a simple vision: to bridge the gap between education and opportunity. We saw a need for a learning platform that not only delivers high-quality courses but also ensures that students gain practical, real-world skills. From a small idea to a thriving community, our platform continues to grow, helping learners worldwide unlock their full potential.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
                        <p className="mb-4">
                            Our diverse team of educators, technologists, and lifelong learners work together to create the best
                            learning experience for our users. We work tirelessly to create an engaging and seamless learning experience, ensuring that every student and instructor has the tools they need to succeed. Our diverse team brings expertise from various fields, all united by a common goal: to make education more accessible and impactful.
                        </p>
                    </section>
                </main>
            </div>
        </div>
        <Footer />
        </>
    )
}

