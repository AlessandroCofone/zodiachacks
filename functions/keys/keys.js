exports.handler = async function (event, context) {
  try {
    // Your existing logic to fetch API keys
    const keys = {
      googleApiKey: process.env.GOOGLE_API_KEY,
      astrologyUserId: process.env.ASTROLOGY_USER_ID,
      astrologyApiKey: process.env.ASTROLOGY_API_KEY,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(keys),
    };
  } catch (error) {
    console.error('Error fetching API keys:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
