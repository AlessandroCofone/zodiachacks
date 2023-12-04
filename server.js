const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');  // Import cors middleware

dotenv.config();

const app = express();

app.use(cors());  // Apply cors middleware globally

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/.netlify/functions/api/keys', (req, res) => {
  const keys = {
    googleApiKey: process.env.GOOGLE_API_KEY,
    astrologyUserId: process.env.ASTROLOGY_USER_ID,
    astrologyApiKey: process.env.ASTROLOGY_API_KEY,
  };

  res.json(keys);
});

app.post('/.netlify/functions/api/location', async (req, res) => {
  const { location } = req.body;

  try {
    // Your existing code to fetch location data
  } catch (error) {
    console.error('Error handling location data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function getTimeZone(lat, lon) {
    return axios.get('https://maps.googleapis.com/maps/api/timezone/json', {
    params: {
      location: `${lat},${lon}`,
      timestamp: Math.floor(Date.now() / 1000),
      key: process.env.GOOGLE_API_KEY,
    },
  })
  .then(response => {
    const timezone = ((response.data.rawOffset / 3600) + (response.data.dstOffset / 3600)).toFixed(1);
    return timezone;
  })
  .catch(error => {
    console.error('Google Maps Time Zone API request failed:', error.message);
    return '0.0';
  });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  module.exports.handler = app;
  
