// Global variables
let auth, db, storage;

// Declare firebaseConfigUrl
const firebaseConfigUrl = 'https://us-central1-projectw-6c4cd.cloudfunctions.net/getFirebaseConfig';

// Fetch Firebase configuration and initialize Firebase services
fetch(firebaseConfigUrl)
    .then(response => response.json())
    .then(config => {
        // Initialize Firebase app with the fetched configuration
        firebase.initializeApp(config);

        // Initialize Firebase services
        auth = firebase.auth();
        db = firebase.firestore();
        storage = firebase.storage();

        // Set up auth state change listener after initialization
        auth.onAuthStateChanged(user => {
            if (user != null) {
                console.log("Auth State Changed: " + user.email);
            }
        });
    })
    .catch(error => {
        console.error("Error fetching Firebase config:", error.message);
        console.error("Stack trace:", error.stack);
    });
