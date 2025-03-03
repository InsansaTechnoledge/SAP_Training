
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://insansabddp:ya3at2fG8kCQUUu3@cluster0.5vluj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectMongo() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    console.log("MongoDB connected!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export default connectMongo;