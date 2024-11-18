// Global variables
let auth;
let db;
let storage;

// Declare firebaseConfigUrl
let firebaseConfigUrl;

// Check if running in a local development environment MUST BE REMOVED BEFORE DEPLOYMENT
const isLocalhost = window.location.hostname.startsWith('localhost:5500');

// Set the Firebase config URL based on the environment
firebaseConfigUrl = isLocalhost 
    ? 'http://localhost:5001/projectw-6c4cd/us-central1/getFirebaseConfig' 
    : 'https://us-central1-projectw-6c4cd.cloudfunctions.net/getFirebaseConfig';

// Fetch Firebase config and initialize Firebase
fetch(firebaseConfigUrl).then(response => response.json()).then(config => {
    firebase.initializeApp(config);

    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();

    if (isLocalhost) {
        auth.useEmulator('http://localhost:9099/');
        db.useEmulator('localhost', 8080);
        storage.useEmulator('localhost', 9199);
        console.log('Firebase emulators initialized');
    }

    // Set up auth state change listener after initialization
    auth.onAuthStateChanged(user => {
        if (user != null) {
            console.log("Auth State Changed: " + user.email);
        }
    });
}).catch(error => {
    console.error("Error fetching Firebase config:", error);
});