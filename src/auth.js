// Global variables
let auth;
let db;
let storage;

// Declare firebaseConfigUrl
let firebaseConfigUrl;

// For local Development on the emulator
if (true) {
    firebaseConfigUrl = 'https://us-central1-projectw-6c4cd.cloudfunctions.net/getFirebaseConfig';
    fetch(firebaseConfigUrl).then(response => response.json()).then(config => {
        firebase.initializeApp(config);

        auth = firebase.auth();
        db = firebase.firestore();
        storage = firebase.storage();

        auth.useEmulator("http://localhost:9099");
        db.useEmulator("http://localhost:8099");
        storage.useEmulator("http://localhost:9199");

        console.log('Firebase emulators initialized');

        // Set up auth state change listener after initialization
        auth.onAuthStateChanged(user => {
            if (user != null) {
                console.log("Auth State Changed: " + user.email);
            }
        });
    }).catch(error => {
        console.error("Error fetching Firebase config:", error);
    });
} else {
    firebaseConfigUrl = 'https://us-central1-projectw-6c4cd.cloudfunctions.net/getFirebaseConfig';
    fetch(firebaseConfigUrl).then(response => response.json()).then(config => {
        firebase.initializeApp(config);

        auth = firebase.auth();
        db = firebase.firestore();
        storage = firebase.storage();

        // Set up auth state change listener after initialization
        auth.onAuthStateChanged(user => {
            if (user != null) {
                console.log("Auth State Changed: " + user.email);
            }
        });
    }).catch(error => {
        console.error("Error fetching Firebase config:", error);
    });
}