/* eslint-disable no-console, no-restricted-globals */
document.addEventListener("DOMContentLoaded", initializeAppContent);

async function initializeAppContent() {
    try {
        const auth = firebase.auth();
        const db = firebase.firestore();
        const storage = firebase.storage();

        if (window.location.hostname === "localhost") {
            auth.useEmulator("http://localhost:9099");
            db.useEmulator("localhost", 8099);
            storage.useEmulator("localhost", 9199);
        }

        auth.onAuthStateChanged(user => {
            if (!user) {
                window.location.href = 'login.html';
            } else {
                document.querySelector("h1").textContent = `Welcome, ${user.displayName || "User"}`;
                loadUserPlants(user.uid);
            }
        });

        document.getElementById("getWeatherBtn").addEventListener("click", displayWeatherData);

        window.handleLogout = () => auth.signOut().then(() => window.location.href = 'login.html');
    } catch (error) {
        console.error("Error initializing app:", error);
    }
}

/**
 * Validates plant form input.
 */
function validatePlantForm() {
    const name = document.getElementById("plant-name").value;
    const location = document.getElementById("plant-location").value;
    return name.trim().length > 0 && location.trim().length > 0;
}

/**
 * Loads user's plant data from Firestore.
 * @param {string} userId
 */
async function loadUserPlants(userId) {
    const plantsList = document.querySelector(".plants-list");
    plantsList.innerHTML = '';
    try {
        const plantsRef = db.collection(`users/${userId}/plants`);
        const querySnapshot = await plantsRef.get();
        querySnapshot.forEach(doc => {
            const plant = doc.data();
            const li = document.createElement("li");
            li.textContent = plant.name;
            plantsList.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading plants:", error);
    }
}

/**
 * Adds a plant to Firestore and Firebase Storage if form is valid.
 */
async function addPlant() {
    if (!validatePlantForm()) {
        alert("Please fill in all required fields for the plant.");
        return;
    }

    const user = firebase.auth().currentUser;
    if (!user) return;

    const file = document.getElementById("plant-photo").files[0];
    const name = document.getElementById("plant-name").value;
    const location = document.getElementById("plant-location").value;

    try {
        const photoUrl = await uploadPhoto(file);
        await createPlantEntry(user.uid, photoUrl, name, location);
        alert("Plant added successfully!");
        loadUserPlants(user.uid);
    } catch (error) {
        console.error("Error adding plant:", error);
        alert("Failed to add plant.");
    }
}

/**
 * Displays real-time weather data based on user input.
 */
function displayWeatherData() {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const country = document.getElementById('country').value;

    if (city && state && country) {
        fetchGeocode(city, state, country);
    } else {
        document.getElementById('weather-details').innerHTML = 'Please enter a city, state, and country.';
    }
}

/**
 * Real-time plant search suggestions.
 * @param {string} input
 */
function showPlantSuggestions(input) {
    const suggestions = getPlantSuggestions(input);
    displaySuggestions(suggestions);
}

/**
 * Sends a message to the server-side chatbot and displays the assistant's response.
 */
async function sendMessage() {
    const message = document.getElementById('user-input').value.trim();
    if (!message) return;

    displayMessage('You', message);

    try {
        const response = await fetch('/ask-assistant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        displayMessage('Assistant', data.response || "I'm here to help!");
    } catch (error) {
        console.error("Error sending message:", error);
        displayMessage('Error', 'Something went wrong. Please try again.');
    }

    document.getElementById('user-input').value = '';
}

/**
 * Displays a message in the chatbox.
 * @param {string} role - The sender of the message ('You' or 'Assistant')
 * @param {string} message - The message content
 */
function displayMessage(role, message) {
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<p><b>${role}:</b> ${message}</p>`;
    chatbox.scrollTop = chatbox.scrollHeight;
}
