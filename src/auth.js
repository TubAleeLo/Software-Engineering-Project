// Global variables
let auth;
let db;
let storage;

// Function to fetch Firebase configuration and initialize Firebase
async function fetchFirebaseConfig() {
    try {
        const response = await fetch('https://us-central1-projectw-6c4cd.cloudfunctions.net/getFirebaseConfig'); // Replace with your actual URL
        const config = await response.json();

        // Initialize Firebase with the fetched config
        firebase.initializeApp(config);

        // Initialize Firebase Auth, Firestore, and Storage
        auth = firebase.auth(); // Now auth is initialized
        db = firebase.firestore(); // Now db is initialized
        storage = firebase.storage(); // Now storage is initialized

        console.log('Firebase Auth initialized');
    } catch (error) {
        console.error("Error fetching Firebase config:", error);
    }
}

// Call the fetchFirebaseConfig to initialize Firebase
fetchFirebaseConfig().then(() => {
    setupEventListeners(); // Now set up event listeners only after auth is initialized
});

// Listen for auth status changes
auth.onAuthStateChanged(user => {
    console.log(user);
});

module.exports = { auth, db, storage };