// Log a message to the console to ensure the script is linked correctly
console.log('JavaScript file is linked correctly.');

// Get references to all sliders and value displays
const drillingSlider = document.getElementById('drilling-slider');
const transportSlider = document.getElementById('transport-slider');
const filtersSlider = document.getElementById('filters-slider');
const educationSlider = document.getElementById('education-slider');

const drillingValue = document.getElementById('drilling-value');
const transportValue = document.getElementById('transport-value');
const filtersValue = document.getElementById('filters-value');
const educationValue = document.getElementById('education-value');

const pointsValue = document.getElementById('points-value');

// The total points the player can distribute
const MAX_POINTS = 100;

// This function updates the points available and slider values
function updatePoints(changedSlider) {
    // Get the current values of all sliders
    let drilling = parseInt(drillingSlider.value);
    let transport = parseInt(transportSlider.value);
    let filters = parseInt(filtersSlider.value);
    let education = parseInt(educationSlider.value);

    // Calculate the total points used
    let totalUsed = drilling + transport + filters + education;

    // If the total is more than allowed, adjust the changed slider
    if (totalUsed > MAX_POINTS) {
        // Find how much over the limit we are
        let over = totalUsed - MAX_POINTS;
        // Reduce the changed slider by the extra amount
        changedSlider.value = parseInt(changedSlider.value) - over;
        // Update the value after adjustment
        drilling = parseInt(drillingSlider.value);
        transport = parseInt(transportSlider.value);
        filters = parseInt(filtersSlider.value);
        education = parseInt(educationSlider.value);
        totalUsed = drilling + transport + filters + education;
    }

    // Update the value displays next to each slider
    drillingValue.textContent = drilling;
    transportValue.textContent = transport;
    filtersValue.textContent = filters;
    educationValue.textContent = education;

    // Update the points available display
    pointsValue.textContent = MAX_POINTS - totalUsed;
}

// Add event listeners to each slider
// When a slider is moved, call updatePoints and pass the slider

drillingSlider.addEventListener('input', function() {
    updatePoints(drillingSlider);
});
transportSlider.addEventListener('input', function() {
    updatePoints(transportSlider);
});
filtersSlider.addEventListener('input', function() {
    updatePoints(filtersSlider);
});
educationSlider.addEventListener('input', function() {
    updatePoints(educationSlider);
});

// Initialize the display when the page loads
updatePoints(drillingSlider);
