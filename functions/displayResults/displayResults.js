// displayResults.js Netlify function

exports.handler = async function (event, context) {
  try {
    // Extract data from the request body
    const { data } = JSON.parse(event.body);

    // Your existing displayResults logic
    const formattedDate = new Date(data.next_moon_phase_date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const response = {
      responseFull: 'This new moon on ' + formattedDate + ' is falling into your ' + data.next_moon_phase_house + 'th astrological house of:',
      responseSign: data.next_moon_phase_sign + ' Season rules over your ' + data.next_moon_phase_house + 'th astrological house of:',
    };

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
