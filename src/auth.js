// Initialize Firebase with dynamically fetched configuration
async function initializeFirebase() {
    if (!firebase.apps.length) {
        try {
            // Fetch Firebase config from Cloud Function
            const response = await fetch("https://us-central1-projectw-6c4cd.cloudfunctions.net/getFirebaseConfig");
            if (!response.ok) {
                throw new Error(`Failed to fetch Firebase config: ${response.status} ${response.statusText}`);
            }

<<<<<<< HEAD
            const firebaseConfig = await response.json();

            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            console.log("Firebase initialized successfully:", firebaseConfig);

            // Initialize Firebase services
            window.auth = firebase.auth(); // Store in `window` for global access
        } catch (error) {
            console.error("Error initializing Firebase:", error.message);
        }
    } else {
        console.log("Firebase already initialized.");
        window.auth = firebase.auth(); // Assign the global auth instance
    }
}
=======
// Declare firebaseConfigUrl
let firebaseConfigUrl;
const useEmulator = false;

// For local Development on the emulator
if (false) {
    fetch(firebaseConfigUrl).then(response => response.json()).then(config => {
        firebase.initializeApp(config);
    
        auth = firebase.auth();
        db = firebase.firestore();
        storage = firebase.storage();
    
        if (useEmulator) {
            auth.useEmulator("http://localhost:9099");
            db.useEmulator("http://localhost:8099");
            storage.useEmulator("http://localhost:9199");
            console.log('Firebase emulators initialized');
        }
     
        auth.onAuthStateChanged(user => {
            if (user != null) {
                console.log("Auth State Changed: " + user.email);
            }
        });
    }).catch(error => {
        console.error("Error fetching Firebase config:", error.message);
        console.error("Stack trace:", error.stack);
    });
} else {
    firebaseConfigUrl = 'https://us-central1-projectw-6c4cd.cloudfunctions.net/getFirebaseConfig';
    fetch(firebaseConfigUrl).then(response => response.json()).then(config => {
        firebase.initializeApp(config);
>>>>>>> zachary

// Call the initialization function
initializeFirebase();
