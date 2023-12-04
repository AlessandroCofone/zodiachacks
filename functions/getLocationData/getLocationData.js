// getLocationData.js Netlify function

exports.handler = async function (event, context) {
  try {
    // Extract location data from the request body
    const { location } = JSON.parse(event.body);

    // Send location data to the location function
    const locationResponse = await fetch('https://golden-lamington-70f6c8.netlify.app/.netlify/functions/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location }),
    });

    if (!locationResponse.ok) {
      throw new Error('Failed to fetch location data');
    }

    const locationData = await locationResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ locationData }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
