// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

let firebaseApp;
let auth;
let db;
let storage;

// Firebase configuration
// For development, we'll fetch the config from the server
async function initializeFirebase() {
  try {
    const response = await fetch('https://us-central1-projectw-6c4cd.cloudfunctions.net/getFirebaseConfig');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Firebase config: ${response.status}`);
    }
    
    const firebaseConfig = await response.json();
    
    // Initialize Firebase
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
    storage = getStorage(firebaseApp);
    
    console.log('Firebase initialized successfully');
    
    return { auth, db, storage };
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
}

// Export the initialization function and services
export { initializeFirebase, auth, db, storage };