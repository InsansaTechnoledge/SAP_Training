import React, { useState } from 'react';

const StudyMaterialsShop = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption, setSortOption] = useState('popular');

    // Sample data for study materials
    const studyMaterials = [
        {
            id: 1,
            title: "Web Development Fundamentals Handbook",
            price: 24.99,
            category: "development",
            format: "PDF",
            pages: 240,
            rating: 4.8,
            sales: 1254,
            image: "/api/placeholder/300/200",
            description: "Complete guide to HTML, CSS and JavaScript basics with practical examples."
        },
        {
            id: 2,
            title: "Data Science Essentials Workbook",
            price: 32.99,
            category: "data-science",
            format: "PDF + Worksheets",
            pages: 320,
            rating: 4.7,
            sales: 876,
            image: "/api/placeholder/300/200",
            description: "Learn data analysis, visualization and machine learning fundamentals."
        },
        {
            id: 3,
            title: "UI/UX Design Principles Guide",
            price: 19.99,
            category: "design",
            format: "PDF",
            pages: 180,
            rating: 4.9,
            sales: 1487,
            image: "/api/placeholder/300/200",
            description: "Comprehensive guide to creating intuitive and engaging user interfaces."
        },
        {
            id: 4,
            title: "Python Programming Cheat Sheets",
            price: 14.99,
            category: "development",
            format: "PDF",
            pages: 85,
            rating: 4.6,
            sales: 2345,
            image: "/api/placeholder/300/200",
            description: "Quick reference guide with code snippets for Python developers."
        },
        {
            id: 5,
            title: "Digital Marketing Strategy Handbook",
            price: 29.99,
            category: "marketing",
            format: "PDF + Templates",
            pages: 210,
            rating: 4.5,
            sales: 645,
            image: "/api/placeholder/300/200",
            description: "Comprehensive guide to digital marketing strategies and implementation."
        },
        {
            id: 6,
            title: "Machine Learning Algorithms Explained",
            price: 39.99,
            category: "data-science",
            format: "PDF",
            pages: 350,
            rating: 4.8,
            sales: 789,
            image: "/api/placeholder/300/200",
            description: "Detailed explanations of machine learning algorithms with examples."
        }
    ];

    const categories = [
        { id: 'all', name: 'All Categories' },
        { id: 'development', name: 'Development' },
        { id: 'data-science', name: 'Data Science' },
        { id: 'design', name: 'Design' },
        { id: 'marketing', name: 'Marketing' }
    ];

    // Filter study materials based on search and category
    const filteredMaterials = studyMaterials
        .filter(material =>
            (selectedCategory === 'all' || material.category === selectedCategory) &&
            material.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === 'price-low') return a.price - b.price;
            if (sortOption === 'price-high') return b.price - a.price;
            if (sortOption === 'rating') return b.rating - a.rating;
            // Default: sort by popularity (sales)
            return b.sales - a.sales;
        });

    return (
        <div className="min-h-screen bg-gray-50">
           
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Study Materials Shop</h1>
                    <p className="text-xl max-w-2xl">Access comprehensive reading materials, worksheets, and guides to support your learning journey.</p>
                </div>
            </div>

            {/* Filter and Search Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-lg shadow-sm">
                    {/* Search */}
                    <div className="w-full md:w-1/3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search study materials..."
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="absolute left-3 top-3 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="w-full md:w-1/3">
                        <select
                            className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort Options */}
                    <div className="w-full md:w-1/3">
                        <select
                            className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="popular">Most Popular</option>
                            <option value="rating">Highest Rated</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Study Materials Grid */}
            <div className="container mx-auto px-4 py-6 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMaterials.map(material => (
                        <div key={material.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:scale-105">
                            <img
                                src={material.image}
                                alt={material.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{material.title}</h3>
                                    <span className="text-lg font-bold text-blue-600">${material.price}</span>
                                </div>
                                <p className="text-gray-600 mb-4">{material.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                        {material.format}
                                    </span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                                        {material.pages} pages
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="ml-1 text-gray-600">{material.rating}</span>
                                    </div>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudyMaterialsShop;