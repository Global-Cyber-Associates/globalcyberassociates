import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
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
              <title>Free Risk Assessment | Global Cyber Associates</title>
              <meta name="description" content="Take the free GCA cybersecurity risk assessment. Identify your organisation's exposure to threats in under 5 minutes — no commitment required." />
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
