// validateFormData.js Netlify function

exports.handler = async function (event, context) {
  try {
    // Extract form data from the request body
    const { day, month, year, hour, minute, location } = JSON.parse(event.body);

    // Your existing validation logic
    if (!day || !month || !year || !hour || !minute || !location) {
      return {
        statusCode: 200,
        body: JSON.stringify({ isValid: false, error: 'All fields are required' }),
      };
    }

    if (!/^\d{2}$/.test(day) || !/^\d{2}$/.test(month) || !/^\d{4}$/.test(year) || !/^\d{2}$/.test(hour) || !/^\d{2}$/.test(minute)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ isValid: false, error: 'Invalid format for one or more fields' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ isValid: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
