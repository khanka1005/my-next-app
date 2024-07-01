// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyMomQ446Q67H3VILeIOe8j_lyYdxbjMw",
  authDomain: "my-next-app-335b2.firebaseapp.com",
  projectId: "my-next-app-335b2",
  storageBucket: "my-next-app-335b2.appspot.com",
  messagingSenderId: "623525375330",
  appId: "1:623525375330:web:d9d7e6e159a805f0b1103b",
  measurementId: "G-2YD3RYK60D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Check if analytics is supported before initializing
if (typeof window !== "undefined" && window?.navigator?.cookieEnabled) {
  isSupported().then((supported) => {
    if (supported) {
      const analytics = getAnalytics(app);
    } else {
      console.warn("Analytics is not supported in this environment.");
    }
  }).catch((error) => {
    console.error("Error checking analytics support:", error);
  });
} else {
  console.warn("Analytics is not initialized because the window object is not available or cookies are disabled.");
}
