import React from "react";
import Header from "../components/head";
import Footer from "../components/footer/footer";

function Privacy() {
  return (
    <>
      <Header />
      
      <div className="pt-24 pb-20 px-6 min-h-screen flex justify-center text-white/80">
        <div className="max-w-4xl w-full bg-white/5 rounded-2xl p-8 md:p-12 shadow-xl border border-white/10">
          
          <header className="mb-10 border-b border-white/10 pb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm opacity-60">Last Updated: March 2026</p>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">1. Commitment to Privacy</h2>
              <p className="leading-relaxed">
                Global Cyber Associates values your privacy and is strictly committed to protecting your personal information. We employ industry-standard security protocols to ensure your data remains confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">2. Information We Collect</h2>
              <p className="leading-relaxed">
                We may collect basic information such as your name, email address, and contact details when you interact with our services, request vulnerability assessments, or communicate with our support team.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">3. How We Use Information</h2>
              <p className="leading-relaxed">
                The information collected is used exclusively to improve our cybersecurity services, process your requests efficiently, and provide better support. We do not sell or rent your data to unauthorized third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">4. Data Protection & Security</h2>
              <p className="leading-relaxed">
                As a cybersecurity firm, we take data protection seriously. We implement robust, appropriate security measures and encryption standards to protect user data from unauthorized access, alteration, or disclosure.
              </p>
            </section>
          </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Privacy;