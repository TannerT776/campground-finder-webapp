import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlWmOqkIgR2siXt5N5RhsuwMYZO2gPGwA",
  authDomain: "campground-finder-webapp.firebaseapp.com",
  projectId: "campground-finder-webapp",
  storageBucket: "campground-finder-webapp.firebasestorage.app",
  messagingSenderId: "64754829193",
  appId: "1:64754829193:web:275c808554f9b17aa14358"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
