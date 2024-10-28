document.getElementById('convertButton').addEventListener('click', function() {
    const temperatureInput = document.getElementById('temperatureInput').value;
    const unit = document.querySelector('input[name="unit"]:checked').value;
    let result = '';

    // Validate input
    if (isNaN(temperatureInput) || temperatureInput === '') {
        result = 'Please enter a valid number.';
    } else {
        const temperature = parseFloat(temperatureInput);

        if (unit === 'C') {
            const toF = (temperature * 9/5) + 32;
            const toK = temperature + 273.15;
            result = `${temperature}°C is ${toF.toFixed(2)}°F and ${toK.toFixed(2)}K.`;
        } else if (unit === 'F') {
            const toC = (temperature - 32) * 5/9;
            const toK = toC + 273.15;
            result = `${temperature}°F is ${toC.toFixed(2)}°C and ${toK.toFixed(2)}K.`;
        } else if (unit === 'K') {
            const toC = temperature - 273.15;
            const toF = (toC * 9/5) + 32;
            result = `${temperature}K is ${toC.toFixed(2)}°C and ${toF.toFixed(2)}°F.`;
        }
    }

    document.getElementById('result').innerText = result;
});