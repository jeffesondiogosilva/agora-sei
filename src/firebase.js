// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBR0dpAncTw-DNj78lYXeMZKfMRyqZQrPQ",
  authDomain: "agora-sei-710e3.firebaseapp.com",
  projectId: "agora-sei-710e3",
  storageBucket: "agora-sei-710e3.appspot.com",
  messagingSenderId: "823276301119",
  appId: "1:823276301119:web:5a013906bc226d49b5c18a",
  measurementId: "G-5JQ82L195G"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Inicializa o analytics

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
