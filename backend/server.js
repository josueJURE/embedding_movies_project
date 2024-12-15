const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

const app = express();
const PORT = 3000;


// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to receive text
app.post("/send-text", (req, res) => {
  const { text } = req.body;
  console.log("Received text:", text);
  res.json({ message: "Text received successfully", text });

  async function main() {
    const embedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
      encoding_format: "float",
    });
  
    console.log(embedding.data[0].embedding);
  }
  
  main();




});







// Start the server
// run following command: node server.js
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
