// getTimeZone.js Netlify function

exports.handler = async function (event, context) {
  try {
    // Extract latitude and longitude from the request body
    const { lat, lon } = JSON.parse(event.body);

    // Your existing getTimeZone logic
    var timezone = "0.0"; // Default to "0.0"

    // Make synchronous AJAX request to Google Maps Time Zone API
    const timezoneResponse = await fetch('https://maps.googleapis.com/maps/api/timezone/json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `location=${lat},${lon}&timestamp=${Math.floor(Date.now() / 1000)}&key=${process.env.GOOGLE_API_KEY}`,
    });

    if (!timezoneResponse.ok) {
      throw new Error('Google Maps Time Zone API request failed');
    }

    const timezoneData = await timezoneResponse.json();

    // Calculate timezone as a decimal number and format it as "0.0"
    timezone = ((timezoneData.rawOffset / 3600) + (timezoneData.dstOffset / 3600)).toFixed(1);

    return {
      statusCode: 200,
      body: JSON.stringify({ timezone }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
