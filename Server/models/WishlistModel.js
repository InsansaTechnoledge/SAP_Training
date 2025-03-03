import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const Wishlist = new mongoose.model('Wishlist', WishlistSchema);
export default Wishlist;