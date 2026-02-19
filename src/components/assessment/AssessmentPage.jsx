import React, { useEffect } from 'react';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import Questionnaire from './Questionnaire.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AssessmentPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: "ease-in-out",
        });
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-cyan selection:text-white">
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
