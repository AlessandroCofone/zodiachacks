const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

// Netlify function to handle API key request
router.get('/api/keys', (req, res) => {
    const keys = {
      googleApiKey: process.env.GOOGLE_API_KEY,
      astrologyUserId: process.env.ASTROLOGY_USER_ID,
      astrologyApiKey: process.env.ASTROLOGY_API_KEY,
    };
    res.json(keys);
});

app.use('/.netlify/functions/server', router);

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}

// Export the express app wrapped with serverless
module.exports.handler = serverless(app);
