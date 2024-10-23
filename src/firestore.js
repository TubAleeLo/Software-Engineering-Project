// Ensure auth.js is loaded before firestore.js
const { db, storage } = require('./auth');

/**
 * Creates a plant entry under a specific user.
 * @param {string} userId - The ID of the user.
 * @param {string} photoUrl - The URL of the plant photo.
 * @param {string} name - The name of the plant.
 * @param {string} location - The location of the plant.
 * @returns {Promise<void>}
 */
async function createPlantEntry(userId, photoUrl, name, location) {
    try {
        await db.collection('users').doc(userId).collection('plants').add({
            photoUrl: photoUrl,
            name: name,
            location: location,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Plant entry created successfully');
    } catch (error) {
        console.error('Error creating plant entry: ', error);
    }
}

async function uploadPhoto(file) {
    const storageRef = storage.ref();
    const photoRef = storageRef.child(`photos/${file.name}`);
    
    try {
        const snapshot = await photoRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();
        return downloadURL;
    } catch (error) {
        console.error('Error uploading photo: ', error);
        throw error;
    }
}

module.exports = { createPlantEntry, uploadPhoto };