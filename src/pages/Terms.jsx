import React from "react";
import Header from "../components/head";
import Footer from "../components/footer/footer";

function Terms() {
  return (
    <>
      <Header />


      <div className="pt-24 pb-20 px-6 min-h-screen flex justify-center text-white/80">

        <div className="max-w-4xl w-full bg-white/5 rounded-2xl p-8 md:p-12 shadow-xl border border-white/10">

          <header className="mb-10 border-b border-white/10 pb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms & Conditions
            </h1>
            <p className="text-sm opacity-60">Last Updated: March 2026</p>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">1. Agreement to Terms</h2>
              <p className="leading-relaxed">
                By accessing or using the GlobalCyberAssociates website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services or website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">2. Use of Services</h2>
              <p className="leading-relaxed">
                Our cybersecurity services, vulnerability assessments, and educational materials are provided strictly for legitimate professional and defensive purposes. You agree to use these services only for lawful purposes and in accordance with these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">3. User Responsibilities & Restrictions</h2>
              <p className="leading-relaxed mb-4">As a user of our platform, you strictly agree not to:</p>
              <ul className="list-disc pl-6 space-y-3 opacity-90">
                <li>Engage in unauthorized penetration testing, vulnerability scanning, or any cyber-attacks against our infrastructure.</li>
                <li>Misuse our content or attempt to disrupt the services offered through the website.</li>
                <li>Use our tools, methodologies, or knowledge base for malicious purposes against third-party systems without explicit authorization.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">4. Intellectual Property</h2>
              <p className="leading-relaxed">
                All content, features, and functionality on this website—including text, graphics, logos, and software—are the exclusive property of GlobalCyberAssociates and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">5. Limitation of Liability</h2>
              <p className="leading-relaxed">
                GlobalCyberAssociates shall not be held liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of our services, or any actions taken based on the information provided on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">6. Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to modify or replace these Terms at any time without prior notice. Your continued use of the website after any such changes constitutes your formal acceptance of the new Terms and Conditions.
              </p>
            </section>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Terms;