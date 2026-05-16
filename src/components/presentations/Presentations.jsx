import React, { useState, useEffect } from 'react';

const Presentation = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const slides = [
        {
            id: 'question',
            title: 'How productive was your employee yesterday?',
            subtitle: 'Most leaders pay for hours that never happened. Visun-AI tells you the truth.',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072',
            type: 'hero'
        },
        {
            id: 'foundation',
            title: 'The First Thing You Install.',
            subtitle: 'Before you hire. Before you scale. Build your company on data, not blind trust. Start with Visun-AI.',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
            type: 'hero'
        },
        {
            id: 'the_vision',
            title: 'Monitor Everything. Simply.',
            items: [
                { title: 'Watch Work Live', desc: 'Real-time screen access. No hiding, no filters.' },
                { title: 'Expose Idle Time', desc: 'Separate the workers from the clock-watchers.' },
                { title: 'Asset Protection', desc: 'See every file created, moved, or deleted instantly.' },
                { title: 'Rogue Detection', desc: 'Detect unauthorized hardware the second it connects.' }
            ],
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070',
            type: 'grid'
        },
        {
            id: 'efficiency',
            title: 'Absolute Transparency.',
            metrics: [
                { label: 'Reclaimed Output', value: '43%', detail: 'Immediate efficiency jump.' },
                { label: 'Risk Shield', value: '100%', detail: 'Total endpoint visibility.' },
                { label: 'IT Control', value: '-25%', detail: 'Reduced management overhead.' }
            ],
            image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=2006',
            type: 'reality'
        },
        {
            id: 'security_first',
            title: 'Visibility Drives Productivity.',
            items: [
                { title: 'Focus Time Tracking', desc: 'Measure how much time is spent on productive work.' },
                { title: 'App Usage Insights', desc: 'Identify tools that improve output and tools that waste time.' },
                { title: 'Team Performance Map', desc: 'Understand who needs support, coaching, or workload balancing.' }
            ],
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2070',
            type: 'grid-3'
        },
        {
            id: 'dashboard_truth',
            title: 'Zero Timesheets. 100% Productivity.',
            subtitle: 'A complete, automated dashboard that replaces guesswork with hard data.',
            items: [
                { id: 'AUTO', title: 'Automated Truth', desc: 'No manual logs. No fake hours. Every second is captured directly from the source.' },
                { id: 'LIVE', title: 'Live Benchmarking', desc: 'See who is actually driving revenue and who is just idling. Instantly.' },
                { id: 'DATA', title: 'Workforce DNA', desc: 'Deep analytics on application usage, focus levels, and department performance.' },
                { id: 'KILL', title: 'Remove the Blockers', desc: 'Identify and remove productivity blockers before they impact your profit.' }
            ],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015',
            type: 'enhanced-summary'
        },
        {
            id: 'with_without_visun_ai',
            title: 'Company With and Without Visun-AI',
            subtitle: 'A clear view of business outcomes before and after implementation.',
            withoutPoints: [
                'Manual timesheets and inconsistent reporting.',
                'Hidden idle time across teams and shifts.',
                'Delayed management action due to late insights.',
                'Lower output from unresolved workflow blockers.'
            ],
            withPoints: [
                'Live dashboard visibility across every team.',
                'Automatic tracking of productive and idle hours.',
                'Faster, data-backed decisions in real time.',
                'Higher accountability, output, and ROI.'
            ],
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070',
            type: 'comparison'
        },
        {
            id: 'closing_call',
            title: 'Lead with Clarity. Win with Productivity.',
            subtitle: 'You cannot manage what you cannot see. Install Visun-AI First.',
            cta: 'Initiate Day 1 Deployment',
            ctaLink: 'https://visun.globalcyberassociates.com/login',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072',
            type: 'hero-final'
        }
    ];

    const totalSlides = slides.length;
    const isComparisonSlide = slides[activeSlide].type === 'comparison';

    const goToSlide = (index) => {
        if (isTransitioning || index < 0 || index >= totalSlides) return;
        setIsTransitioning(true);
        setActiveSlide(index);
        setTimeout(() => setIsTransitioning(false), 800);
    };

    useEffect(() => {
        const handleKeys = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') goToSlide(activeSlide + 1);
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goToSlide(activeSlide - 1);
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [activeSlide, isTransitioning]);

    return (
        <div className="fixed inset-0 bg-black text-white font-sans overflow-hidden select-none cursor-default">

            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeSlide ? (slide.id === 'with_without_visun_ai' ? 'opacity-0' : 'opacity-30') : 'opacity-0'}`}
                >
                    <img
                        src={slide.image}
                        className={`w-full h-full object-cover transition-transform duration-[20s] ease-linear ${index === activeSlide ? 'scale-105' : 'scale-100'}`}
                        alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
                </div>
            ))}

            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10 z-50">
                <div
                    className="h-full bg-blue-600 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                    style={{ width: `${((activeSlide + 1) / totalSlides) * 100}%` }}
                ></div>
            </div>

            <div className="absolute top-10 left-10 z-[60] flex items-center gap-3 mix-blend-overlay opacity-30">
                <div className="text-xl font-black tracking-tighter italic uppercase text-white">
                    GCA <span className="text-blue-600">Global</span>
                </div>
                <div className="h-[1px] w-8 bg-white/50"></div>
                <div className="text-[10px] font-bold tracking-[0.3rem] text-white/50">VISUN AI</div>
            </div>

            <div className={`h-full w-full relative z-10 flex ${isComparisonSlide ? 'items-stretch px-0' : 'items-center px-10 md:px-24 lg:px-32'}`}>
                <div className={`w-full ${isComparisonSlide ? 'max-w-none h-full' : 'max-w-5xl'} transition-all duration-700 ease-out ${isTransitioning ? 'opacity-0 translate-y-4 blur-sm' : 'opacity-100 translate-y-0 blur-0'}`}>

                    <div className={isComparisonSlide ? 'h-full' : 'space-y-10 lg:space-y-16'}>

                        {(slides[activeSlide].type === 'hero' || slides[activeSlide].type === 'hero-final') && (
                            <div className="space-y-6 lg:space-y-8">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase italic max-w-4xl transition-all">
                                    {slides[activeSlide].title}
                                </h1>
                                <p className="text-lg md:text-xl lg:text-2xl font-light text-white/40 max-w-2xl leading-relaxed">
                                    {slides[activeSlide].subtitle}
                                </p>
                                {slides[activeSlide].cta && (
                                    <div className="pt-6">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (slides[activeSlide].ctaLink) {
                                                    window.location.assign(slides[activeSlide].ctaLink);
                                                }
                                            }}
                                            className="px-10 py-4 bg-blue-600 text-white text-base lg:text-lg font-black rounded-full hover:bg-blue-500 transition-all shadow-xl active:scale-95 uppercase italic tracking-tight"
                                        >
                                            {slides[activeSlide].cta}
                                        </button>
                                        {slides[activeSlide].tagline && (
                                            <p className="mt-4 text-sm md:text-base font-semibold tracking-wide text-blue-300 uppercase">
                                                {slides[activeSlide].tagline}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {slides[activeSlide].type === 'reality' && (
                            <div className="space-y-12 lg:space-y-16">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase italic max-w-4xl">
                                    {slides[activeSlide].title}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
                                    {slides[activeSlide].metrics.map((m, i) => (
                                        <div key={i} className="space-y-2 lg:space-y-4 border-l-[1px] border-blue-600 pl-6 lg:pl-8">
                                            <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white italic tracking-tighter leading-none">{m.value}</div>
                                            <div className="text-[10px] lg:text-xs font-black uppercase tracking-[0.2rem] text-blue-500">{m.label}</div>
                                            <div className="text-xs lg:text-sm font-medium text-white/30 uppercase tracking-wide leading-tight">{m.detail}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(slides[activeSlide].type === 'grid' || slides[activeSlide].type === 'grid-3') && (
                            <div className="space-y-10 lg:space-y-12">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase italic">
                                    {slides[activeSlide].title}
                                </h2>
                                <div className={`grid grid-cols-1 ${slides[activeSlide].type === 'grid' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-6 lg:gap-8`}>
                                    {slides[activeSlide].items.map((item, i) => (
                                        <div key={i} className="bg-black/40 backdrop-blur-md p-8 lg:p-10 rounded-2xl border border-white/5 space-y-4 hover:border-blue-600/50 transition-all duration-500 group">
                                            <h3 className="text-base lg:text-lg font-black uppercase tracking-tight text-blue-500 italic group-hover:translate-x-1 transition-transform">{item.title}</h3>
                                            <p className="text-xs lg:text-sm font-medium text-white/30 leading-relaxed uppercase tracking-wide italic">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {slides[activeSlide].type === 'enhanced-summary' && (
                            <div className="space-y-12">
                                <div className="space-y-4">
                                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase italic leading-none text-blue-600">
                                        {slides[activeSlide].title}
                                    </h2>
                                    <p className="text-lg font-light text-white/40 italic">{slides[activeSlide].subtitle}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
                                    {slides[activeSlide].items.map((item, i) => (
                                        <div key={i} className="flex gap-8 group">
                                            <div className="flex flex-col items-center">
                                                <div className="w-[1px] h-12 bg-blue-600/30"></div>
                                                <div className="text-[10px] font-black text-blue-500 my-4 tracking-widest">{item.id}</div>
                                                <div className="w-[1px] flex-grow bg-blue-600/30"></div>
                                            </div>
                                            <div className="space-y-2 py-4">
                                                <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter italic group-hover:text-blue-500 transition-colors">{item.title}</h3>
                                                <p className="text-xs lg:text-sm font-medium text-white/30 uppercase tracking-widest italic leading-relaxed max-w-sm">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {slides[activeSlide].type === 'comparison' && (
                            <div className="h-full w-full">
                                <div className="h-full w-full flex flex-col">
                                    <div className="w-full px-8 md:px-12 lg:px-16 pt-12 md:pt-14 pb-8 text-center border-b border-white/10">
                                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase italic leading-none">
                                            {slides[activeSlide].title}
                                        </h2>
                                        <p className="text-base md:text-lg font-light text-white/70 italic mt-3 mx-auto max-w-3xl">
                                            {slides[activeSlide].subtitle}
                                        </p>
                                    </div>
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 min-h-0">
                                        <div className="h-full bg-gradient-to-b from-rose-950/60 via-black to-black border-r border-red-400/30 px-8 md:px-12 lg:px-16 pt-10 pb-12 overflow-auto">
                                            <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-red-300 italic mb-8">Without Visun-AI</h3>
                                            <ul className="space-y-5">
                                                {slides[activeSlide].withoutPoints.map((point, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-base lg:text-lg text-white/90 leading-relaxed bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3">
                                                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-red-300 shrink-0"></span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="h-full bg-gradient-to-b from-blue-950/70 via-black to-black px-8 md:px-12 lg:px-16 pt-10 pb-12 overflow-auto">
                                            <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-cyan-300 italic mb-8">With Visun-AI</h3>
                                            <ul className="space-y-5">
                                                {slides[activeSlide].withPoints.map((point, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-base lg:text-lg text-white/95 leading-relaxed bg-cyan-400/[0.06] border border-cyan-300/20 rounded-xl px-4 py-3">
                                                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-300 shrink-0"></span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 right-10 flex items-center gap-10 z-50">
                <div className="flex items-center gap-4 md:gap-6 bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/5">
                    <button onClick={() => goToSlide(activeSlide - 1)} className="text-white/20 hover:text-white transition-colors">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <div className="text-lg md:text-xl font-black italic w-14 md:w-16 text-center text-white">
                        {activeSlide + 1}<span className="text-blue-600/50 mx-1 md:mx-2">/</span>{totalSlides}
                    </div>
                    <button onClick={() => goToSlide(activeSlide + 1)} className="text-white/20 hover:text-white transition-colors">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Presentation;
