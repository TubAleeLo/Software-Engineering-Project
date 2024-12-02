//const fs = require("fs");
//import * as fs from "fs";   
// Global variables
let auth, db, storage;
const firebaseConfig = {"functions": [
    {
      "source": "functions",
      "codebase": "default",
      "ignore": [
        "node_modules",
        ".git",
        "firebase-debug.log",
        "firebase-debug.*.log",
        "*.local"
      ],
      "predeploy": []
    }
  ],
  "emulators": {
    "auth": {
      "port": 9099
    },
    "firestore": {
      "port": 8099
    },
    "functions": {
      "port": 5001
    },
    "ui": {
      "enabled": true
    },
    "storage": {
      "port": 9199,
      "rules": "storage.rules"
    },
    "singleProjectMode": true
  },
  "firestore": {
    "rules": "firebase.json",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  }
};


// Declare firebaseConfigUrl
let firebaseConfigUrl =  'https://us-central1-projectw-6c4cd.cloudfunctions.net/getFirebaseConfig';
const firebaseConfigPath = '/home/lee04/Desktop/SoftwareEngineering/Software-Engineering-Project/firebase.json';
const useEmulator = true;

// For local Development on the emulator
if (true) {
    /*fs.readFileSync(firebaseConfigPath, function(err, data){
        if (err) throw err;
        const config =  JSON.parse(data);
    */
        firebase.initializeApp(firebaseConfig);
    
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
//    };
    /*fetch(firebaseConfigUrl).then(response => response.json()).then(config => {
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
    */
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