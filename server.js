// netlify/functions/server.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.post('/initAutocomplete', require('./initAutocomplete').handler);
app.post('/keys', require('./keys').handler);
app.post('/validateFormData', require('./validateFormData').handler);
app.post('/submitForm', require('./submitForm').handler);
app.post('/getLocationData', require('./getLocationData').handler);
app.post('/makeAstrologyApiRequest', require('./makeAstrologyApiRequest').handler);
app.post('/displayResults', require('./displayResults').handler);
app.post('/getTimeZone', require('./getTimeZone').handler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
