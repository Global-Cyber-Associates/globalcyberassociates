import React from "react";
import Header from "../components/head";
import Footer from "../components/footer/footer";

function Refund() {
  return (
    <>
      <Header />
      
      <div className="pt-24 pb-20 px-6 min-h-screen flex justify-center text-white/80">
        <div className="max-w-4xl w-full bg-white/5 rounded-2xl p-8 md:p-12 shadow-xl border border-white/10">
          
          <header className="mb-10 border-b border-white/10 pb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Refund Policy
            </h1>
            <p className="text-sm opacity-60">Last Updated: March 2026</p>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">1. Customer Satisfaction</h2>
              <p className="leading-relaxed">
                We strive to ensure complete satisfaction with our cybersecurity solutions and services. If you are not satisfied with our deliverables, you may request a refund subject to the conditions outlined below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">2. Eligibility</h2>
              <p className="leading-relaxed">
                Refund requests must be formally submitted within the specified time period following the purchase or commencement of the service contract. Engagements or assessments that have already been fully executed may not be eligible for a full refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">3. Processing Times</h2>
              <p className="leading-relaxed">
                Once a refund request is reviewed and approved by our billing department, it will be processed within a few business days. The exact time it takes for funds to appear in your account depends on your financial institution.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">4. Contact Information</h2>
              <p className="leading-relaxed">
                For all refund-related queries or to initiate a request, please contact our support team directly at{" "}
                <a 
                  href="mailto:info@globalcyberassociate.com" 
                  className="text-blue-400 hover:text-blue-300 underline transition-colors"
                >
                  info@globalcyberassociate.com
                </a>.
              </p>
            </section>
          </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Refund;