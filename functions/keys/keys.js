// netlify/functions/keys.js
exports.handler = async function (event, context) {
  try {
    // Fetch and return the API keys from your secure storage
    const googleApiKey = process.env.GOOGLE_API_KEY;
    const astrologyUserId = process.env.ASTROLOGY_USER_ID;
    const astrologyApiKey = process.env.ASTROLOGY_API_KEY;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        googleApiKey,
        astrologyUserId,
        astrologyApiKey,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
