// Global variables
let auth, db, storage;

// Declare firebaseConfigUrl
const firebaseConfigUrl = 'https://us-central1-projectw-6c4cd.cloudfunctions.net/getFirebaseConfig';

<<<<<<< HEAD
// Fetch Firebase configuration and initialize Firebase services
fetch(firebaseConfigUrl)
    .then(response => response.json())
    .then(config => {
        // Initialize Firebase app with the fetched configuration
=======
<<<<<<< HEAD
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
=======
// For local Development on the emulator
if (true) {
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
>>>>>>> main
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
>>>>>>> zachary
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
