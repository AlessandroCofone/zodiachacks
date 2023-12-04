const express = require('express');
const app = express();
const port = 3000;

// Use environment variables to store sensitive information
const googleApiKey = process.env.GOOGLE_API_KEY;
const astrologyUserId = process.env.ASTROLOGY_USER_ID;
const astrologyApiKey = process.env.ASTROLOGY_API_KEY;

app.get('/credentials', (req, res) => {
  res.json({
    googleApiKey,
    astrologyUserId,
    astrologyApiKey,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
