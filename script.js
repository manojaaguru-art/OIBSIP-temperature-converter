// Input element
const temperatureInput = document.getElementById('temperature');
const errorMessage = document.getElementById('errorMessage');

// Result elements
const celsiusValue = document.getElementById('celsiusValue');
const fahrenheitValue = document.getElementById('fahrenheitValue');
const kelvinValue = document.getElementById('kelvinValue');

// Conversion functions
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function fahrenheitToKelvin(fahrenheit) {
    return (fahrenheit - 32) * 5/9 + 273.15;
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
}

// Validation function
function validateInput(value) {
    errorMessage.textContent = '';
    
    if (value === '' || value === null) {
        errorMessage.textContent = 'Please enter a temperature value';
        return false;
    }
    
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
        errorMessage.textContent = 'Please enter a valid number';
        return false;
    }
    
    // Check for Kelvin constraints
    const inputUnit = document.querySelector('input[name="inputUnit"]:checked').value;
    if (inputUnit === 'kelvin' && numValue < 0) {
        errorMessage.textContent = 'Kelvin cannot be negative (absolute zero is 0K)';
        return false;
    }
    
    return true;
}

// Main conversion function
function convertTemperature() {
    // Get input value
    const temperature = temperatureInput.value;
    
    // Validate input
    if (!validateInput(temperature)) {
        celsiusValue.textContent = '--';
        fahrenheitValue.textContent = '--';
        kelvinValue.textContent = '--';
        return;
    }
    
    const temp = parseFloat(temperature);
    const inputUnit = document.querySelector('input[name="inputUnit"]:checked').value;
    
    let celsius, fahrenheit, kelvin;
    
    // Convert input to Celsius first, then to other units
    switch(inputUnit) {
        case 'celsius':
            celsius = temp;
            fahrenheit = celsiusToFahrenheit(celsius);
            kelvin = celsiusToKelvin(celsius);
            break;
        case 'fahrenheit':
            fahrenheit = temp;
            celsius = fahrenheitToCelsius(fahrenheit);
            kelvin = fahrenheitToKelvin(fahrenheit);
            break;
        case 'kelvin':
            kelvin = temp;
            celsius = kelvinToCelsius(kelvin);
            fahrenheit = kelvinToFahrenheit(kelvin);
            break;
    }
    
    // Display results rounded to 2 decimal places
    celsiusValue.textContent = celsius.toFixed(2) + '°C';
    fahrenheitValue.textContent = fahrenheit.toFixed(2) + '°F';
    kelvinValue.textContent = kelvin.toFixed(2) + 'K';
}

// Reset function
function resetConverter() {
    temperatureInput.value = '';
    document.getElementById('celsius').checked = true;
    errorMessage.textContent = '';
    celsiusValue.textContent = '--';
    fahrenheitValue.textContent = '--';
    kelvinValue.textContent = '--';
    temperatureInput.focus();
}

// Allow Enter key to trigger conversion
temperatureInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        convertTemperature();
    }
});

// Real-time validation
temperatureInput.addEventListener('input', function() {
    if (this.value !== '') {
        validateInput(this.value);
    }
});