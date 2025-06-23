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

// Get the submit button
const submitBtn = document.getElementById('submit-btn');

// Get overlay and result message elements
const resultOverlay = document.getElementById('result-overlay');
const resultMessage = document.getElementById('result-message');
const replayBtn = document.getElementById('replay-btn');
const nextBtn = document.getElementById('next-btn');

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

    // Enable the submit button only if all points are used
    if ((MAX_POINTS - totalUsed) === 0) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
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

// List of possible scenarios for different villages (no hints about solutions)
const scenarios = [
    "A remote village with contaminated water sources.",
    "A community where children often miss school due to water collection duties.",
    "A village that experiences frequent water shortages during the dry season.",
    "A town where waterborne diseases are common.",
    "A rural area with no nearby clean water wells.",
    "A village where families walk long distances to fetch water.",
    "A community struggling with dirty and unsafe drinking water.",
    "A village affected by seasonal flooding that pollutes water supplies.",
    "A settlement where most homes lack access to safe water.",
    "A village where people rely on river water that is not clean."
];

// Function to pick a random scenario and show it on the page
function showRandomScenario() {
    // Pick a random index from the scenarios array
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    // Get the scenario text
    const scenarioText = scenarios[randomIndex];
    // Find the scenario div and set its text
    const scenarioDiv = document.getElementById('scenario');
    scenarioDiv.innerHTML = `<strong>Scenario:</strong> ${scenarioText}`;
}

// Show a random scenario when the page loads
showRandomScenario();

// When the player clicks Submit Plan
submitBtn.addEventListener('click', function() {
    // For now, randomly decide if the plan is correct or not
    // (You can add your own logic here later)
    const isCorrect = Math.random() < 0.5;
    if (isCorrect) {
        resultMessage.textContent = "Great job! You distributed the water correctly!";
    } else {
        resultMessage.textContent = "Oops! The water wasn't distributed correctly. Try again!";
    }
    // Show the overlay
    resultOverlay.style.display = 'flex';
});

// When the player clicks Replay Level
replayBtn.addEventListener('click', function() {
    // Reset all sliders to 0
    drillingSlider.value = 0;
    transportSlider.value = 0;
    filtersSlider.value = 0;
    educationSlider.value = 0;
    // Update the display
    updatePoints(drillingSlider);
    // Hide the overlay
    resultOverlay.style.display = 'none';
    // Show a new random scenario
    showRandomScenario();
});

// When the player clicks Go to Next Level
nextBtn.addEventListener('click', function() {
    // For now, just reset like replay, but you could add more levels
    drillingSlider.value = 0;
    transportSlider.value = 0;
    filtersSlider.value = 0;
    educationSlider.value = 0;
    updatePoints(drillingSlider);
    resultOverlay.style.display = 'none';
    showRandomScenario();
});
