// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArrFpOduARGLoeTSb8HLB6k6Q68de7X98",
  authDomain: "recyclingapp-ad4b1.firebaseapp.com",
  projectId: "recyclingapp-ad4b1",
  storageBucket: "recyclingapp-ad4b1.appspot.com",
  messagingSenderId: "207032173091",
  appId: "1:207032173091:web:cc0f215af180a41e7f2796",
  measurementId: "G-YMFP65SS47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
