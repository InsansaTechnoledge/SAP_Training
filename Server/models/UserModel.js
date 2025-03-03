import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: [Number]
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Wishlist"
        }
    ],
    modulesPurchased: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "PurchasedModule"
        }
    ],
    payment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment"
        }
    ]

});

const User = mongoose.model("User", UserSchema);
export default User;