const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  console.log('--- Database Connection Test ---');
  console.log('URI being used:', process.env.MONGO_URI ? 'URI found in .env' : 'No URI found in .env!');
  
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds
    });
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    process.exit(0);
  } catch (err) {
    console.log('❌ FAILED: Could not connect.');
    console.log('\n--- ERROR DETAILS ---');
    console.log(err.message);
    console.log('\n--- WHAT TO DO ---');
    if (err.message.includes('whitelist')) {
      console.log('Action: Go to Atlas -> Network Access and add "0.0.0.0/0"');
    } else if (err.message.includes('Authentication failed')) {
      console.log('Action: Check your password in the .env file. It is NOT your login password.');
    } else {
      console.log('Action: Check if your MONGO_URI is copied correctly from Atlas.');
    }
    process.exit(1);
  }
};

testConnection();
