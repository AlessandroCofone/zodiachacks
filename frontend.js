async function initAutocomplete() {
    try {
      const keysResponse = await fetch('ttps://golden-lamington-70f6c8.netlify.app/api/keys');
      const keys = await keysResponse.json();
      initializeAutocomplete(keys.googleApiKey);

      // Rest of your initAutocomplete function...
    } catch (error) {
      console.error('Error fetching API keys:', error);
    }
  }

  async function getLocationData(location) {
    try {
      const locationResponse = await fetch('/api/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location }),
      });

      const locationData = await locationResponse.json();

      // Rest of your getLocationData function...

    } catch (error) {
      console.error('Error fetching location data:', error);
      alert('Error fetching location data. Please try again.');
    }
  }

  // Rest of your frontend code...

  // References to existing IDs, divs, and buttons
  setInterval(function () {
    var isFormValid = validateFormData();
    $('#submitButton').prop('disabled', !isFormValid);
  }, 1000);

  $('#submitButton').on('click', function () {
    if (validateFormData()) {
      $('#inputwrapper').hide();
      $('#resultwrapper').css('display', 'flex');
      var location = $('#location').val();
      getLocationData(location);
    }
  });

  function displayResults(data) {
    var formattedDate = new Date(data.next_moon_phase_date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    $('#response-full').text('This new moon on ' + formattedDate + ' is falling into your ' + data.next_moon_phase_house + 'th astrological house of:');
    $('#response-sign').text(data.next_moon_phase_sign + ' Season rules over your ' + data.next_moon_phase_house + 'th astrological house of:' );
  }

  function validateFormData() {
    var day = $('#day').val();
    var month = $('#month').val();
    var year = $('#year').val();
    var hour = $('#hour').val();
    var minute = $('#minute').val();
    var location = $('#location').val();

    if (!day || !month || !year || !hour || !minute || !location) {
      return false;
    }

    if (!/^\d{2}$/.test(day) || !/^\d{2}$/.test(month) || !/^\d{4}$/.test(year) || !/^\d{2}$/.test(hour) || !/^\d{2}$/.test(minute)) {
      return false;
    }

    return true;
  }