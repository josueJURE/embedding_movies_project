const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to receive text
app.post('/send-text', (req, res) => {
    const { text } = req.body;
    console.log('Received text:', text);
    res.json({ message: 'Text received successfully', text });
});

// Start the server 
// run following command: node server.js  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
