const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// server.js
exports.handler = async function (event, context) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        // Add other necessary headers
      },
      body: JSON.stringify({ message: 'Hello World' }),
    };
  };

// Define routes
app.post('/.netlify/functions/initAutocomplete', require('./netlify/functions/initAutocomplete').handler);
app.post('/.netlify/functions/validateFormData', require('./netlify/functions/validateFormData').handler);
app.post('/.netlify/functions/submitForm', require('./netlify/functions/submitForm').handler);
app.post('/.netlify/functions/getLocationData', require('./netlify/functions/getLocationData').handler);
app.post('/.netlify/functions/makeAstrologyApiRequest', require('./netlify/functions/makeAstrologyApiRequest').handler);
app.post('/.netlify/functions/displayResults', require('./netlify/functions/displayResults').handler);
app.post('/.netlify/functions/getTimeZone', require('./netlify/functions/getTimeZone').handler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
