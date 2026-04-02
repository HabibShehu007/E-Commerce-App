// firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyAYm361cSXaZOQUcz_3MaJDEguyYZTh1lw",
  authDomain: "velora-app-b0150.firebaseapp.com",
  projectId: "velora-app-b0150",
  storageBucket: "velora-app-b0150.firebasestorage.app",
  messagingSenderId: "102491128484",
  appId: "1:102491128484:web:722844735c693601e01c31",
  measurementId: "G-13J1GX6F1B",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export references globally
window.firebaseAuth = firebase.auth();
window.firebaseDB = firebase.firestore();
