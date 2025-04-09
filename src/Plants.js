/**
 * Class representing a Plant
 */
class Plant {
    /**
     * Create a new Plant instance
     * @param {Object} data - Plant data
     * @param {string} data.id - Unique identifier (Firestore document ID)
     * @param {string} data.name - Plant name
     * @param {string} data.location - Where the plant is located
     * @param {string} data.type - Type or species of plant
     * @param {string} data.description - Description of the plant
     * @param {Date} data.plantedDate - When the plant was planted
     * @param {Date} data.lastWatered - When the plant was last watered
     * @param {Date} data.lastFertilized - When the plant was last fertilized
     * @param {string} data.photoUrl - URL to plant image (if available)
     * @param {Object} data.careInstructions - Care instructions for the plant
     */
    constructor(data = {}) {
      this.id = data.id || null;
      this.name = data.name || '';
      this.location = data.location || '';
      this.type = data.type || '';
      this.description = data.description || '';
      this.plantedDate = data.plantedDate || null;
      this.lastWatered = data.lastWatered || null;
      this.lastFertilized = data.lastFertilized || null;
      this.photoUrl = data.photoUrl || '';
      this.careInstructions = data.careInstructions || {};
      this.createdAt = data.createdAt || new Date();
      this.updatedAt = data.updatedAt || new Date();
    }
  
    /**
     * Convert the plant object to a Firestore-compatible object
     * @returns {Object} Firestore-compatible object
     */
    toFirestore() {
      return {
        name: this.name,
        location: this.location,
        type: this.type,
        description: this.description,
        plantedDate: this.plantedDate,
        lastWatered: this.lastWatered,
        lastFertilized: this.lastFertilized,
        photoUrl: this.photoUrl,
        careInstructions: this.careInstructions,
        createdAt: this.createdAt,
        updatedAt: new Date() // Always update the updatedAt timestamp
      };
    }
  
    /**
     * Create a Plant instance from Firestore data
     * @param {string} id - Firestore document ID
     * @param {Object} data - Firestore document data
     * @returns {Plant} Plant instance
     */
    static fromFirestore(id, data) {
      return new Plant({
        id,
        ...data,
        // Convert Firestore Timestamps to JavaScript Dates
        plantedDate: data.plantedDate?.toDate() || null,
        lastWatered: data.lastWatered?.toDate() || null,
        lastFertilized: data.lastFertilized?.toDate() || null,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      });
    }
  }
  
  export default Plant;
  