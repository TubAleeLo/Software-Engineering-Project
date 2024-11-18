const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');

admin.initializeApp();

const API_KEY = functions.config().sec.api_key;
const AUTH_DOMAIN = functions.config().sec.auth_domain;
const PROJECT_ID = functions.config().sec.project_id;
const STORAGE_BUCKET = functions.config().sec.storage_bucket;
const APP_ID = functions.config().sec.app_id;

// Define allowed origins
const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5001', 'http://localhost:3000', 'http://127.0.0.1:5001', 'http://127.0.0.1:3000'];

// CORS middleware configuration
const corsOptions = {
    origin: function (origin, callback) {
        console.log('Origin:', origin);  // Log the origin for debugging
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

// Initialize CORS once
const corsMiddleware = cors(corsOptions);

// Key Request HTTP function
exports.getFirebaseConfig = functions.https.onRequest((req, res) => {
    // Handle OPTIONS preflight request
    if (req.method === 'OPTIONS') {
        // Pre-flight request handling
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    corsMiddleware(req, res, () => {
        // Set headers as a fallback
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        res.status(200).send({
            apiKey: API_KEY,
            authDomain: AUTH_DOMAIN,
            projectId: PROJECT_ID,
            storageBucket: STORAGE_BUCKET,
            appId: APP_ID
        });
    });
});
