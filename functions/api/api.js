// api.js Netlify function

exports.handler = async function (event, context) {
  try {
    // Your API handling logic here

    // For demonstration purposes, return a sample response
    const responseData = {
      next_moon_phase: 'Waxing Crescent',
      next_moon_phase_date: '2023-12-06',
      next_moon_phase_sign: 'Aries',
      next_moon_phase_house: '5th',
    };

    return {
      statusCode: 200,
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
