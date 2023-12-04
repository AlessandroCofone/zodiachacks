const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  // Expose credentials from .env file
  res.json({
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    ASTROLOGY_USER_ID: process.env.ASTROLOGY_USER_ID,
    ASTROLOGY_API_KEY: process.env.ASTROLOGY_API_KEY,
  });
});

exports.handler = async function (event, context) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://zodiac-hacks-a1a317.webflow.io',
        // Add other necessary headers
      },
      body: JSON.stringify({ message: 'Hello World' }),
    };
  };

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});