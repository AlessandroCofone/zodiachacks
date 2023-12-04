// makeAstrologyApiRequest.js Netlify function

exports.handler = async function (event, context) {
  try {
    // Extract formData from the request body
    const formData = JSON.parse(event.body);

    // Your existing makeAstrologyApiRequest logic
    const api = 'custom_moon_solar_ingress';
    const userId = process.env.ASTROLOGY_USER_ID; // Make sure to adjust this based on your actual formData structure
    const apiKey = process.env.ASTROLOGY_API_KEY;
    const auth = "Basic " + btoa(userId + ":" + apiKey);

    // Your existing AJAX request to astrology API here
    const astrologyApiResponse = await fetch("https://json.astrologyapi.com/v1/" + api, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(formData),
    });

    if (!astrologyApiResponse.ok) {
      throw new Error('Astrology API request failed');
    }

    const response = await astrologyApiResponse.json();

    // Your existing success and error handling logic
    if (response && response.next_moon_phase) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, response }),
      };
    } else {
      const errorMessage = response.msg || 'An error occurred.';
      console.error('Error message:', errorMessage);
      return {
        statusCode: 200,
        body: JSON.stringify({ success: false, error: errorMessage }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
