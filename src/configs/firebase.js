import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDztI_0I7reuRSlsH_RnW9W6qHIa6HXDRg",
  authDomain: "pashi-admin.firebaseapp.com",
  projectId: "pashi-admin",
  storageBucket: "pashi-admin.appspot.com",
  messagingSenderId: "296841930530",
  appId: "1:296841930530:web:fa85b1fac2a5acc265677b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();