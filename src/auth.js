// Initialize Firebase with dynamically fetched configuration
async function initializeFirebase() {
    if (!firebase.apps.length) {
        try {
            // Fetch Firebase config from Cloud Function
            const response = await fetch("https://us-central1-projectw-6c4cd.cloudfunctions.net/getFirebaseConfig");
            if (!response.ok) {
                throw new Error(`Failed to fetch Firebase config: ${response.status} ${response.statusText}`);
            }

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

// Call the initialization function
initializeFirebase();
