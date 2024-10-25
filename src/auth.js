// Define the URL for the Firebase configuration Testing and Emulation
const firebaseConfigUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
    ? 'http://localhost:5001/projectw-6c4cd/us-central1/getFirebaseConfig' 
    : 'https://us-central1-projectw-6c4cd.cloudfunctions.net/getFirebaseConfig';

// Global variables
let auth;
let db;
let storage;

// Function to fetch Firebase configuration and initialize Firebase
async function fetchFirebaseConfig() {
    try {
        const response = await fetch(firebaseConfigUrl); 
        const config = await response.json();

        // Initialize Firebase with the fetched config
        firebase.initializeApp(config);

        if (window.location.hostname === 'localhost') {
            firebase.auth().useEmulator('http://localhost:9099/');
            firebase.firestore().useEmulator('localhost', 8080);
            firebase.storage().useEmulator('localhost', 9199);
            firebase.functions().useEmulator('localhost', 5001);
        }

        // Initialize Firebase Auth, Firestore, and Storage
        auth = firebase.auth(); // Now auth is initialized
        db = firebase.firestore(); // Now db is initialized
        storage = firebase.storage(); // Now storage is initialized

        console.log('Firebase Auth initialized');
    } catch (error) {
        console.error("Error fetching Firebase config:", error);
    }
}

// Call the fetchFirebaseConfig to initialize Firebase and set up envent listeners
fetchFirebaseConfig().then(() => {

    auth.onAuthStateChanged(user => {
        if (user != null) {
            console.log("Auth State Changed" + user.email);
        }
        
    });
    //Set up event listeners, only after auth is initialized, here!
});
