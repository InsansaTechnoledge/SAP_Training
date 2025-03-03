import React, { useState, useEffect } from 'react';

const Pricing = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [animateIn, setAnimateIn] = useState(false);
    const [selectedTab, setSelectedTab] = useState('monthly');
    const [showFeatures, setShowFeatures] = useState({});
    const [darkMode, setDarkMode] = useState(false);

    const pricingTiers = [
        {
            id: 'individual',
            name: 'Individual',
            price: 'Standard Rate',
            description: 'Perfect for individual learners seeking professional development',
            features: [
                'Full access to course materials',
                'Hands-on projects',
                'Self-paced learning resources',
                'Online community access',
                'Digital certificate upon completion',
                'Email support'
            ],
            cta: 'Get Started',
            popular: false,
            color: 'green',
            icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            id: 'group',
            name: 'Group',
            price: '30% Off Standard Rate',
            description: 'Ideal for teams of 3+ participants from the same organization',
            features: [
                'All Individual tier features',
                'Collaborative team projects',
                'Private discussion forums',
                'Progress tracking dashboard',
                'Group coaching sessions',
                'Dedicated account manager',
                'Priority support'
            ],
            cta: 'Enroll Team',
            popular: true,
            color: 'blue',
            icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: 'Custom Pricing',
            description: 'Tailored solutions for organizations requiring custom implementation',
            features: [
                'All Group tier features',
                'Customized learning paths',
                'White-labeled platform option',
                'Integration with existing systems',
                'Custom reporting and analytics',
                'Executive briefing sessions',
                'Dedicated success manager',
                'On-site training options',
                'Enterprise-wide implementation'
            ],
            cta: 'Contact Sales',
            popular: false,
            color: 'purple',
            icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        }
    ];

    const benefits = [
        {
            id: 'customizable',
            title: 'Customizable',
            description: 'Tailored to meet the specific needs of individuals and organizations of all sizes',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            ),
            color: 'blue'
        },
        {
            id: 'cost-effective',
            title: 'Cost-Effective',
            description: 'Flexible pricing options with volume discounts to maximize your return on investment',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'green'
        },
        {
            id: 'scalable',
            title: 'Scalable',
            description: 'Easily scale up as your needs grow, from individual learners to enterprise-wide implementation',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            color: 'purple'
        }
    ];

    const steps = [
        {
            step: 1,
            title: 'Skill Development',
            description: 'Focused curriculum covering in-demand technologies',
            color: 'green'
        },
        {
            step: 2,
            title: 'Project Portfolio',
            description: 'Build real-world projects showcasing your abilities',
            color: 'blue'
        },
        {
            step: 3,
            title: 'Interview Prep',
            description: 'Targeted preparation for technical interviews',
            color: 'indigo'
        },
        {
            step: 4,
            title: 'Job Placement',
            description: 'Direct connections with hiring partners',
            color: 'purple'
        }
    ];

    useEffect(() => {
        setAnimateIn(true);

        // Check system preference for dark mode
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDarkMode);

        // Apply theme class to document
        document.documentElement.classList.toggle('dark', prefersDarkMode);
    }, []);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    const toggleFeatures = (id) => {
        setShowFeatures(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const getColorClasses = (color) => {
        // Use custom CSS variables from your theme
        if (color === 'green') {
            return {
                bg: 'card-green',
                hover: 'hover:opacity-90',
                text: 'text-primary',
                border: 'border-contrast',
                light: 'card-green'
            };
        } else if (color === 'blue') {
            return {
                bg: 'card-blue',
                hover: 'hover:opacity-90',
                text: 'text-blue',
                border: 'border-contrast',
                light: 'card-blue'
            };
        } else if (color === 'purple' || color === 'indigo') {
            return {
                bg: 'card-theme-gradient',
                hover: 'hover:opacity-90',
                text: 'text-primary',
                border: 'border-contrast',
                light: 'bg-theme-gradient'
            };
        }
    };

    return (
        <div className={`py-16 px-4 bg-primary min-h-screen flex flex-col items-center overflow-hidden transition-colors duration-300`}>
            <div className="max-w-6xl mx-auto w-full relative">
               
                <div className={`text-center mb-12 transition-all duration-1000 transform ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h2 className="text-4xl font-extrabold text-primary mb-3">Flexible Pricing Options</h2>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">
                        Choose the plan that works best for you or your organization
                    </p>
                </div>

                {/* Billing toggle */}
                <div className="flex justify-center mb-8">
                    <div className="bg-card rounded-lg p-1 inline-flex shadow-md">
                        <button
                            onClick={() => setSelectedTab('monthly')}
                            className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${selectedTab === 'monthly'
                                ? 'bg-theme text-contrast'
                                : 'text-secondary hover:text-primary'
                                }`}
                        >
                            Monthly Billing
                        </button>
                        <button
                            onClick={() => setSelectedTab('annual')}
                            className={`px-4 py-2 rounded-md font-medium text-sm transition-all flex items-center ${selectedTab === 'annual'
                                ? 'bg-theme text-contrast'
                                : 'text-secondary hover:text-primary'
                                }`}
                        >
                            Annual Billing
                            <span className="ml-2 card-green text-xs px-2 py-0.5 rounded-full">Save 20%</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingTiers.map((tier, index) => {
                        const colorClasses = getColorClasses(tier.color);
                        return (
                            <div
                                key={tier.id}
                                className={`relative rounded-2xl bg-card shadow-lg transition-all duration-500 transform flex flex-col h-full ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                    } ${hoveredCard === tier.id
                                        ? 'scale-105 shadow-2xl z-10'
                                        : 'hover:shadow-xl'
                                    } ${tier.popular
                                        ? `border-2 border-contrast`
                                        : 'border border-contrast border-opacity-20'
                                    }`}
                                style={{
                                    transitionDelay: `${index * 150}ms`,
                                    backdropFilter: 'blur(8px)'
                                }}
                                onMouseEnter={() => setHoveredCard(tier.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Popular label positioned above the card */}
                                {tier.popular && (
                                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                        <span className={`${colorClasses.bg} text-primary px-6 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-1`}>
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0116 3v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6h-1a1 1 0 110-2h1V3a1 1 0 011-1zm0 10a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0116 13v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                {/* Card content with flex layout */}
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-lg ${colorClasses.light} flex items-center justify-center`}>
                                            <span className={colorClasses.text}>{tier.icon}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-primary">{tier.name}</h3>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-end justify-center mb-2">
                                            <span className="text-3xl font-extrabold text-primary">{tier.price}</span>
                                        </div>
                                        <p className="text-secondary text-center">{tier.description}</p>
                                    </div>

                                    {/* Features section with fixed height */}
                                    <div className="flex-grow mb-6">
                                        <div className={`space-y-3 overflow-hidden transition-all duration-300 ${showFeatures[tier.id] ? 'max-h-96' : 'max-h-36'}`}>
                                            {tier.features.map((feature, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-start"
                                                >
                                                    <svg
                                                        className={`h-5 w-5 mr-2 mt-0.5 ${colorClasses.text}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    <span className="text-secondary">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {tier.features.length > 3 && (
                                            <button
                                                onClick={() => toggleFeatures(tier.id)}
                                                className={`text-sm ${colorClasses.text} font-medium flex items-center mx-auto mt-3 hover:underline focus:outline-none`}
                                            >
                                                {showFeatures[tier.id] ? 'Show less' : 'Show all features'}
                                                <svg
                                                    className={`ml-1 h-4 w-4 transform transition-transform ${showFeatures[tier.id] ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                    {/* CTA button fixed at the bottom */}
                                    <div className="mt-auto">
                                        <button
                                            className={`w-full py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 font-medium ${colorClasses.bg} ${colorClasses.hover} text-primary shadow-lg hover:shadow-xl`}
                                        >
                                            {tier.cta}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={`mt-16 bg-card p-8 rounded-xl shadow-lg transition-all duration-1000 transform ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '450ms' }}>
                    <h3 className="text-2xl font-bold text-primary mb-8 text-center">Why Choose Our Platform</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit) => {
                            const colorClasses = getColorClasses(benefit.color);
                            return (
                                <div key={benefit.id} className="flex flex-col items-center text-center group">
                                    <div className={`w-16 h-16 ${colorClasses.light} rounded-xl flex items-center justify-center mb-4 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3`}>
                                        <span className={colorClasses.text}>{benefit.icon}</span>
                                    </div>
                                    <h4 className="font-semibold text-lg text-primary mb-2">{benefit.title}</h4>
                                    <p className="text-secondary">{benefit.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={`mt-16 bg-card p-8 rounded-xl shadow-lg relative overflow-hidden transition-all duration-1000 transform ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                    <div className="absolute inset-0 bg-theme-gradient opacity-20"></div>

                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-primary mb-8 text-center">
                            Placement-Focused Approach
                        </h3>

                        <div className="flex flex-wrap justify-center">
                            <div className="relative">
                                {/* Progress bar connecting steps */}
                                <div className="absolute top-6 left-0 right-0 h-1 bg-secondary bg-opacity-20 hidden md:block"></div>
                                <div className="absolute top-6 left-0 right-0 h-1 card-theme-gradient hidden md:block transition-all duration-1000" style={{ width: '100%' }}></div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    {steps.map((step) => {
                                        const colorClasses = getColorClasses(step.color);
                                        return (
                                            <div key={step.step} className="flex flex-col items-center relative">
                                                <div className={`w-12 h-12 ${colorClasses.bg} rounded-full flex items-center justify-center mb-4 text-primary font-bold text-xl shadow-lg transition-all transform hover:scale-110 z-10`}>
                                                    {step.step}
                                                </div>
                                                <h4 className="font-semibold text-primary mb-2">{step.title}</h4>
                                                <p className="text-secondary text-sm text-center">{step.description}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`mt-16 text-center transition-all duration-1000 transform ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '750ms' }}>
                    <div className="bg-card p-8 rounded-xl shadow-lg mb-8">
                        <h3 className="text-2xl font-bold mb-4 text-primary">Ready to transform your learning journey?</h3>
                        <p className="text-secondary mb-6">Join thousands of successful graduates who've accelerated their careers through our platform</p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4, 5].map(num => (
                                    <div key={num} className="w-10 h-10 rounded-full bg-secondary bg-opacity-20 border-2 border-card"></div>
                                ))}
                                <div className="w-10 h-10 rounded-full bg-theme-gradient border-2 border-card flex items-center justify-center text-primary text-xs font-medium">+2K</div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex text-yellow-400">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="ml-2 text-secondary font-medium">4.9/5 (1200+ reviews)</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-secondary mb-4">Need a solution tailored to your specific requirements?</p>
                    <button className="card-theme-gradient text-primary py-4 px-10 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                        Contact Our Team
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;