// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvtBC_F9Zyw5_0rUgP29XT6i3uEMex6ps",
  authDomain: "proapp-25ad0.firebaseapp.com",
  projectId: "proapp-25ad0",
  storageBucket: "proapp-25ad0.appspot.com",
  messagingSenderId: "812566747763",
  appId: "1:812566747763:web:2c5b5b568b4fe85b88a806",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const provider = new GoogleAuthProvider();

// export const auth = getAuth(app);

export const storage = getStorage();

export default app;
