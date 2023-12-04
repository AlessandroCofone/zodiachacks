// netlify/functions/location.js

exports.handler = async function (event, context) {
  try {
    const { location } = JSON.parse(event.body);

    // Your existing code to fetch location data
    // ...

    return {
      statusCode: 200,
      body: JSON.stringify({ /* your processed data here */ }),
    };
  } catch (error) {
    console.error('Error handling location data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
