// netlify/functions/keys.js

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      googleApiKey: process.env.GOOGLE_API_KEY,
      astrologyUserId: process.env.ASTROLOGY_USER_ID,
      astrologyApiKey: process.env.ASTROLOGY_API_KEY,
    }),
  };
};
