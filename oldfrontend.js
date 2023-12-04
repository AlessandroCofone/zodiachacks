 // Declare initAutocomplete in the global scope
    function initAutocomplete() {
        // Fetch API keys from the server
        fetch('https://golden-lamington-70f6c8.netlify.app')
            .then(response => response.json())
            .then(keys => {
                initializeAutocomplete(keys.googleApiKey);
                const astrologyUserId = keys.astrologyUserId;
                const astrologyApiKey = keys.astrologyApiKey;

                setInterval(function () {
                    var isFormValid = validateFormData();
                    $('#submitButton').prop('disabled', !isFormValid);
                }, 1000);

                // Add an event listener for the button click
                $('#submitButton').on('click', function () {
                    // Validate form data on submission
                    if (validateFormData()) {
                        // Hide input wrapper and show result wrapper
                        $('#inputwrapper').hide();
                        $('#resultwrapper').css('display', 'flex');

                        // Get user input and perform API request
                        var location = $('#location').val();
                        getLocationData(location, astrologyUserId, astrologyApiKey);
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching API keys:', error);
                // Handle the error as needed
            });
    }

    function initializeAutocomplete(apiKey) {
        // Initialize the Places Autocomplete service
        var input = document.getElementById('location');
        var autocomplete = new google.maps.places.Autocomplete(input, { apiKey: apiKey });
    }

    // Function to validate form data
    function validateFormData() {
        // Check if all fields are filled
        var day = $('#day').val();
        var month = $('#month').val();
        var year = $('#year').val();
        var hour = $('#hour').val();
        var minute = $('#minute').val();
        var location = $('#location').val();

        if (!day || !month || !year || !hour || !minute || !location) {
            // Return false if any field is empty
            return false;
        }

        // Validate the format of day, month, year, hour, and minute
        if (!/^\d{2}$/.test(day) || !/^\d{2}$/.test(month) || !/^\d{4}$/.test(year) || !/^\d{2}$/.test(hour) || !/^\d{2}$/.test(minute)) {
            // Return false if any format is invalid
            return false;
        }

        // If all validations pass, return true
        return true;
    }

    // Function to handle form submission with validation
    function submitForm() {
        // Validate form data
        if (validateFormData()) {
            // Hide input wrapper and show result wrapper
            $('#inputwrapper').hide();
            $('#resultwrapper').css('display', 'flex');

            // Get user input and perform API request
            var location = $('#location').val();
            getLocationData(location);
        } else {
            // Show alert for incorrect data when the button is pressed
            alert('Data is incorrect.');
        }
    }

    // Function to fetch location data using Google Maps Geocoding API
    function getLocationData(location) {
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            data: {
                address: location,
                key: keys.googleApiKey
            },
            dataType: 'json',
            success: function (geoData) {
                if (geoData.results && geoData.results.length > 0) {
                    var locationData = geoData.results[0].geometry.location;

                    // Your existing code here
                    var formData = {
                        day: $('#day').val(),
                        month: $('#month').val(),
                        year: $('#year').val(),
                        hour: $('#hour').val(),
                        min: $('#minute').val(),
                        lat: locationData.lat,
                        lon: locationData.lng,
                        tzone: getTimeZone(locationData.lat, locationData.lng),
                        predicted_timezone: getTimeZone(locationData.lat, locationData.lng),
                        house_type: "koch",
                        // Add other form fields as needed
                    };

                    // Make astrology API request
                    makeAstrologyApiRequest(formData);
                } else {
                    alert('Location not found. Please enter a valid location.');
                }
            },
            error: function (xhr, status, error) {
                console.log("Google Maps API request failed:", status, error);
                alert("Google Maps API request failed: " + status + ", " + error);
            }
        });
    }
    // Function to make astrology API request
    function makeAstrologyApiRequest(formData) {
        var api = 'custom_moon_solar_ingress';
        var userId = astrologyUserId;
        var apiKey = astrologyApiKey;
        var auth = "Basic " + btoa(userId + ":" + apiKey);

        // Your existing AJAX request to astrology API here
        $.ajax({
            url: "https://json.astrologyapi.com/v1/" + api,
            method: "POST",
            dataType: 'json',
            headers: {
                "Authorization": auth,
                "Content-Type": 'application/json'
            },
            data: JSON.stringify(formData),
            success: function (response) {
                if (response && response.next_moon_phase) {
                    displayResults(response);
                } else {
                    var errorMessage = response.msg || 'An error occurred.';
                    console.log('Error message:', errorMessage);
                    alert("Error: " + errorMessage);
                }
            },
            error: function (xhr, status, error) {
                // Handle AJAX errors
                console.log("AJAX request failed:", status, error);
                alert("AJAX request failed: " + status + ", " + error);
            }
        });
    }
// Function to display results in the HTML
function displayResults(data) {
// Format and display the full response
    var formattedDate = new Date(data.next_moon_phase_date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    $('#response-full').text('This new moon on ' + formattedDate + ' is falling into your ' + data.next_moon_phase_house + 'th astrological house of:');
    $('#response-sign').text(data.next_moon_phase_sign + ' Season rules over your ' + data.next_moon_phase_house + 'th astrological house of:' );

}
// Function to get the timezone using Google Maps Time Zone API
function getTimeZone(lat, lon) {
    var timezone = "0.0"; // Default to "0.0"

    // Make synchronous AJAX request to Google Maps Time Zone API
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/timezone/json',
        data: {
            location: lat + ',' + lon,
            timestamp: Math.floor(Date.now() / 1000),
            key: keys.googleApiKey
        },
        async: false, // Make the request synchronous
        dataType: 'json',
        success: function (timezoneData) {
            // Calculate timezone as a decimal number and format it as "0.0"
            timezone = ((timezoneData.rawOffset / 3600) + (timezoneData.dstOffset / 3600)).toFixed(1);
        },
        error: function (xhr, status, error) {
            console.log("Google Maps Time Zone API request failed:", status, error);
        }
    });

    return timezone;
}