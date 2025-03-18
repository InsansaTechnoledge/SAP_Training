import React from 'react'
import abap from '../../assets/ABAP.jpg'
import { ArrowRight, Book, BookOpen, Clock, Heart, Star, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../Context/WishlistContext';
import { useCart } from '../../Context/CartContext';

const InterestBasedCourses = () => {
    const { addToCart } = useCart();
    const { wishlist, addToWishlist } = useWishlist();
    const navigate = useNavigate();
    const isInWishlist = (courseTitle) => wishlist.some(item => item.title === courseTitle);
    return (
        <>
            <div
                className="relative bg-secondary rounded-2xl shadow-md shadow-gray-500 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
                <div className="relative">
                    <img
                        src={abap}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <button
                        // onClick={() => addToWishlist(course)}
                        className="absolute top-4 right-4 p-2 bg-secondary rounded-full"
                    >
                        <Heart className={`w-5 h-5 
                            ${isInWishlist('title') ? 
                            'text-red-500 fill-current' : 
                            'text-secondary'}`} />
                    </button>
                    <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                        <div className="p-2 bg-white/90 rounded-lg backdrop-blur-sm">
                            <Book />
                        </div>
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                            SAP
                        </div>
                    </div>
                </div>

                <div className="p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-secondary">title</h3>
                        <p className="text-secondary text-sm mb-4">
                            description
                        </p>



                        <div className="flex flex-wrap gap-2 mb-4">
                            <span
                                className="text-xs px-3 py-1 bg-primary text-primary rounded-full"
                            >
                                feature1
                            </span>
                            <span
                                className="text-xs px-3 py-1 bg-primary text-primary rounded-full"
                            >
                                feature2
                            </span>

                        </div>
                    </div>
                    <div className='bottom-0'>
                        <div className="flex items-center justify-between mb-4 text-sm">
                            <div className="flex items-center space-x-1">
                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                <span className="font-medium text-primary">4.3</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Users className="w-5 h-5 text-gray-400" />
                                <span className='text-primary'>1000</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Clock className="w-5 h-5 text-gray-400" />
                                <span className='text-primary'>2 months</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Price</span>
                                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        ₹1299
                                    </span>
                                </div>
                                <button
                                    onClick={() => addToCart(course)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg"
                                >
                                    <span>Enroll Now</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div

                                className="w-full text-center bg-contrast hover:bg-gray-200 dark:hover:bg-gray-600 text-contrast px-6 py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-200"
                                onClick={() => { }}
                            >
                                {/* {!course.$id ? */}
                                {/* <span>Coming soon!!</span> */}
                                {/* : */}
                                <span>Explore for Free</span>
                                {/* } */}
                                <BookOpen className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InterestBasedCourses