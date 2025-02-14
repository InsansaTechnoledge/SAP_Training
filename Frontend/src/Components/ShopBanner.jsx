import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const ShopBanner = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        window.location.href = '/shop';
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <div
            role="banner"
            aria-label="Shop promotion banner"
            className="relative w-full bg-card shadow-sm focus-within:shadow-lg outline-none"
        >
            <button
                onClick={handleClick}
                onKeyDown={handleKeyPress}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
                className={`w-full text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-blue focus:ring-offset-2 ${isHovered ? 'bg-opacity-95' : 'bg-opacity-100'
                    }`}
                aria-expanded={isHovered}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Content Section */}
                    <div className="flex-1 min-w-0 space-y-3">
                        {/* Tag */}
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue bg-opacity-10"
                            aria-label="New collection tag"
                        >
                            <Sparkles className="w-4 h-4 text-blue" aria-hidden="true" />
                            <span className="text-sm font-medium text-blue">
                                New Collection
                            </span>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-2">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight">
                                Discover Our Latest Collection
                            </h2>
                            <p className="text-secondary text-base sm:text-lg max-w-xl">
                                Explore premium products with exclusive offers
                            </p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div
                        className={`flex items-center gap-2 text-blue font-medium transition-transform duration-300 ${isHovered ? 'translate-x-1' : 'translate-x-0'
                            }`}
                        aria-hidden="true"
                    >
                        <span>Shop Now</span>
                        <ArrowRight className="w-5 h-5" />
                    </div>
                </div>

                {/* Progress Indicator */}
                <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-blue transition-all duration-300 ${isHovered ? 'w-full' : 'w-0'
                        }`}
                    aria-hidden="true"
                />
            </button>
        </div>
    );
};

export default ShopBanner;