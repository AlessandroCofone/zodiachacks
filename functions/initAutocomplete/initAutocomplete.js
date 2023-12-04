// initAutocomplete.js Netlify function

exports.handler = async function (event, context) {
  try {
    // Fetch API keys
    const keysResponse = await fetch('https://golden-lamington-70f6c8.netlify.app/.netlify/functions/keys', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!keysResponse.ok) {
      throw new Error('Failed to fetch API keys');
    }

    const keys = await keysResponse.json();
    
    // Your existing initializeAutocomplete logic here
    function initializeAutocomplete(apiKey) {
      // Your existing initialization logic
      // ...
    }

    // Call initializeAutocomplete
    initializeAutocomplete(keys.googleApiKey);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'initAutocomplete function executed successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
