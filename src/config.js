const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Validate required environment variables
function validateConfig() {
  const required = ['GOOGLE_CLOUD_PROJECT'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Check if service account key exists
  const keyPath = process.env.SERVICE_ACCOUNT_KEY_PATH || './service-account-key.json';
  if (!fs.existsSync(keyPath)) {
    throw new Error(`Service account key file not found: ${keyPath}`);
  }
}

validateConfig();

const config = {
  googleCloud: {
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
    model: process.env.VERTEX_AI_MODEL || 'gemini-2.0-flash-001',
    keyFilename: process.env.SERVICE_ACCOUNT_KEY_PATH || './service-account-key.json'
  },
  chatbot: {
    maxTokens: 8192,    // Gemini 2.0 supports more tokens
    temperature: 0.7,
    topP: 0.95,         // Better for Gemini
    topK: 40
  }
};

console.log('Config loaded:', {
  projectId: config.googleCloud.projectId,
  location: config.googleCloud.location,
  model: config.googleCloud.model,
  keyFileExists: fs.existsSync(config.googleCloud.keyFilename)
});

module.exports = config;