const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('https://golden-lamington-70f6c8.netlify.app/api/keys', (req, res) => {
  const keys = {
    googleApiKey: process.env.GOOGLE_API_KEY,
    astrologyUserId: process.env.ASTROLOGY_USER_ID,
    astrologyApiKey: process.env.ASTROLOGY_API_KEY,
  };

  res.json(keys);
});

app.post('https://golden-lamington-70f6c8.netlify.app/api/location', async (req, res) => {
  const { location } = req.body;

  try {
    const geoData = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: process.env.GOOGLE_API_KEY,
      },
    });

    if (geoData.data.results && geoData.data.results.length > 0) {
      const locationData = geoData.data.results[0].geometry.location;
      const timezone = await getTimeZone(locationData.lat, locationData.lng);

      res.json({ locationData, timezone });
    } else {
      res.status(404).json({ error: 'Location not found. Please enter a valid location.' });
    }
  } catch (error) {
    console.error('Google Maps API request failed:', error.message);
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