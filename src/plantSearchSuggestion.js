// Mock plant database
const plantDatabase = [
    'Aloe Vera',
    'Fiddle Leaf Fig',
    'Spider Plant',
    'Basil',
    'Rosemary',
    'Pothos',
    'Peace Lily',
    'Succulent',
    'Dracaena',
    'Snake Plant',
    'Philodendron',
    'Bird of Paradise',
    'Chinese Evergreen',
    'Rubber Plant',
    'Jade Plant',
    'Monstera',
    'Orchid',
    'Calathea',
    'Lavender',
    'Chrysanthemum',
    'Daisy',
    'Petunia',
    'Maranta',
    'Hoya',
    'Cactus',
    'Lavender',
    'Geranium',
    'Clover',
    'Carnivorous Plant',
    'Coleus'
];

// Function that returns plant suggestions based on user input
function getPlantSuggestions(input) {
    if (!input.trim()) {
        return [];  // Return an empty array if the input is empty or just whitespace
    }
    const lowerCaseInput = input.toLowerCase();
    return plantDatabase.filter(plant => plant.toLowerCase().startsWith(lowerCaseInput));
}

// Function to display suggestions
function displaySuggestions(suggestions) {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = ''; // Clear previous suggestions

    if (suggestions.length > 0) {
        suggestionsDiv.style.display = 'block'; // Show dropdown
        suggestions.forEach((suggestion, index) => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = suggestion;

            // Add click event to select suggestion
            div.addEventListener('click', function () {
                selectSuggestion(suggestion);
            });

            suggestionsDiv.appendChild(div);
        });
    } else {
        suggestionsDiv.style.display = 'none'; // Hide if no suggestions
    }
}

const inputField = document.getElementById('plantInput');
let currentFocus = -1; // Track the current focused suggestion

// Event listener for input
inputField.addEventListener('input', function () {
    const input = this.value;
    const suggestions = getPlantSuggestions(input);  // Call the function directly
    displaySuggestions(suggestions);
    currentFocus = -1; // Reset current focus when input changes
});

// Arrow key navigation and selection
inputField.addEventListener('keydown', function(event) {
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    if (event.key === 'ArrowDown') {
        currentFocus++;
        addActive(suggestionItems);
        event.preventDefault(); // Prevent cursor from moving to the beginning of the input field
    } else if (event.key === 'ArrowUp') {
        currentFocus--;
        addActive(suggestionItems);
        event.preventDefault(); // Prevent cursor from moving to the beginning of the input field
    } else if (event.key === 'Enter') {
        if (currentFocus > -1) {
            selectSuggestion(suggestionItems[currentFocus].textContent);
        }
    }
});

// Add "active" class to the current suggestion
function addActive(suggestionItems) {
    if (!suggestionItems.length) return;

    // Remove active class from all suggestions
    suggestionItems.forEach(item => item.classList.remove('active'));

    // Wrap around if currentFocus exceeds the number of suggestions
    if (currentFocus >= suggestionItems.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = suggestionItems.length - 1;

    // Add "active" class to the current suggestion
    suggestionItems[currentFocus].classList.add('active');
}

// Select suggestion function
function selectSuggestion(suggestion) {
    inputField.value = suggestion; // Set input value to selected suggestion
    document.getElementById('suggestions').innerHTML = ''; // Clear suggestions
    document.getElementById('suggestions').style.display = 'none'; // Hide suggestions
    currentFocus = -1; // Reset current focus
}

// Click outside to close suggestions
document.addEventListener('click', function (event) {
    const suggestionsDiv = document.getElementById('suggestions');
    if (!event.target.closest('#plantInput')) {
        suggestionsDiv.style.display = 'none';
    }
});
