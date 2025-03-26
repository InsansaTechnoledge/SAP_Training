import mongoose from 'mongoose';
import {MONGO_URI} from '../Config/env.js';

const ConnectMongo = async function () {
    mongoose.connect(MONGO_URI)
    .then(console.log("Connected to MongoDB",ConnectMongo.name))
    .catch(err => console.log(err, "Error connecting to MongoDB"));    
}   

export default ConnectMongo; 