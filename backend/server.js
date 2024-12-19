

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(
  process.env.MONGO_DB_KEY
);

const app = express();
const PORT = 3000;


// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to receive text
app.post("/send-text", (req, res) => {
  const { text } = req.body;
  // console.log("Received text:", text);
  res.json({ message: "Text received successfully", text });

  async function generateEmbedding(param) {
    const embedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: param,
      encoding_format: "float",
    });
  
    console.log(embedding.data[0].embedding);
    return embedding.data[0].embedding
  }






  async function main() {
    try {
      // Connect to mongoDB
      await mongoClient.connect();
      const db = mongoClient.db("sample_mflix");
      const collection = db.collection("movies");

      // Generate the embedding for the query
      const queryEmbedding = await generateEmbedding(text)

      console.log({queryEmbedding})

      console.log("Received text in main():", text);
      

      // perform vector search
      const results = await collection.aggregate([
        {
          "$vectorSearch": {
            "queryVector": queryEmbedding,
            "path": "plot_embedding",
            "numCandidates": 100,
            "limit": 4,
            "index": "PlotSemanticSearch5",
          },
        },
        
      ]).toArray(); // convert the cursor to an array

      

      console.log(results)

      // print documents from results
      for (const document of results) {
       
          console.log(`Movie Name: ${document.title}, \nMovie Plot: ${document.plot}\n`);
        

      }

      // starts

      console.log("Connecting to MongoDB...");

// Check database and collection
console.log("Database:", db.databaseName);
console.log("Collection:", collection.collectionName);

// Check documents in the collection
const sampleDocs = await collection.find({}).limit(1).toArray();
console.log("Sample Documents:", sampleDocs);
console.log("Sample length:", sampleDocs.length);

// Check query embedding
console.log("Query Embedding:", queryEmbedding);

// Check vector search results
console.log("Vector Search Results:", results);



      /// ends


        // Check index information
        const indexInfo = await collection.indexInformation();
        console.log("Index Information:", indexInfo);

            // Print keys of a single document
            // const doc = await collection.findOne();
            const doc = await collection.findOne();
            console.log("Document Keys:", Object.keys(doc));
            console.log("Document Object:", doc);
    } catch (error) {
      console.error("An error occurred:", error);
  } finally {
      // Close the MongoDB connection
      await mongoClient.close();
  }
  }
  
 // Execute the main function
main();




});







// Start the server
// run following command: node server.js
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
