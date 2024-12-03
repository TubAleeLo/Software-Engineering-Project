// Global variables
let auth, db, storage;

// Declare firebaseConfigUrl
let firebaseConfigUrl;
const useEmulator = true;

// Set the Firebase config URL based on the environment
firebaseConfigUrl = 'https://us-central1-projectw-6c4cd.cloudfunctions.net/getFirebaseConfig';

// Fetch Firebase config and initialize Firebase
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
