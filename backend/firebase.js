// Import the functions you need from the SDKs you need

const { initializeApp } = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  collection,
  getDocs,
} = require("firebase-admin/firestore");

var admin = require("firebase-admin");

var serviceAccount = require("./glms-e981a-firebase-adminsdk-2k1h9-06e8bf2f7e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// const firebaseConfig = {
//   apiKey: "AIzaSyCAiJN1PfqZRyf1w2cFunq9m9SumwWUmKs",
//   authDomain: "glms-e981a.firebaseapp.com",
//   projectId: "glms-e981a",
//   storageBucket: "glms-e981a.appspot.com",
//   messagingSenderId: "141405792005",
//   appId: "1:141405792005:web:af796a8725aedac7d2b96c",
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// database firestore
// const db = getFirestore(app);

const db = getFirestore();

exports.db = db;
