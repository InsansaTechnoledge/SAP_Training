import React from 'react';
import { ChevronRight } from 'lucide-react';

const BreadcrumbNavigation = ({ items }) => {
    // Ensure items is always an array
    const navItems = Array.isArray(items) ? items : [];

    return (
        <div className="flex items-center gap-2 text-sm text-secondary mb-6 flex-wrap">
            {navItems.map((item, index) => {
                const isLast = index === navItems.length - 1;

                return (
                    <React.Fragment key={`breadcrumb-${index}`}>
                        {/* Navigation item */}
                        <span
                            className={`${isLast ? 'text-blue' : 'text-secondary hover:text-blue cursor-pointer transition-colors'}`}
                            onClick={!isLast && item.onClick ? item.onClick : undefined}
                        >
                            {item.label}
                        </span>

                        {/* Chevron separator (don't show after the last item) */}
                        {!isLast && (
                            <ChevronRight className="h-4 w-4 text-secondary" />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default BreadcrumbNavigation;