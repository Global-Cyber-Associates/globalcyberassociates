import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import Questionnaire from './Questionnaire.jsx';
const AssessmentPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-cyan selection:text-white">
            <Helmet>
              <title>Free Cybersecurity Risk Assessment | Global Cyber Associates</title>
              <meta name="description" content="Take the free GCA cybersecurity risk assessment. Identify your organisation's exposure to threats in under 5 minutes — no commitment required." />
              <meta name="robots" content="index,follow" />
              <link rel="canonical" href="https://www.globalcyberassociates.com/assessment" />
              <meta property="og:type" content="website" />
              <meta property="og:title" content="Free Cybersecurity Risk Assessment | Global Cyber Associates" />
              <meta property="og:description" content="Take the free GCA cybersecurity risk assessment. Identify your organisation's exposure to threats in under 5 minutes — no commitment required." />
              <meta property="og:url" content="https://www.globalcyberassociates.com/assessment" />
              <meta property="og:image" content="https://www.globalcyberassociates.com/logo.png" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Free Cybersecurity Risk Assessment | Global Cyber Associates" />
              <meta name="twitter:description" content="Take the free GCA cybersecurity risk assessment. Identify your organisation's exposure to threats in under 5 minutes — no commitment required." />
              <meta name="twitter:image" content="https://www.globalcyberassociates.com/logo.png" />
            </Helmet>
            <Header />

            <main className="pt-24 pb-12">
                <div className="container mx-auto">
                    <div data-aos="fade-up">
                        <Questionnaire />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AssessmentPage;
