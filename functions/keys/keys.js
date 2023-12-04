// netlify/functions/keys.js

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify({
      googleApiKey: process.env.GOOGLE_API_KEY,
      astrologyUserId: process.env.ASTROLOGY_USER_ID,
      astrologyApiKey: process.env.ASTROLOGY_API_KEY,
    }),
  };
};
  