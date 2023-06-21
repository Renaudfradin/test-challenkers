import { initializeApp } from "firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getDatabase } from "@firebase/database";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAsqyovUyMZ59FXXpJcPZ7wzV02WwAl4A",
  authDomain: "test-challenkers.firebaseapp.com",
  databaseURL: "https://test-challenkers-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-challenkers",
  storageBucket: "test-challenkers.appspot.com",
  messagingSenderId: "853044018313",
  appId: "1:853044018313:web:77a5920ca7fa396b469a58",
  measurementId: "G-RMS1LLX70F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);

export default { database, analytics, firestore };