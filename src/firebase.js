// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBR0dpAncTw-DNj78lYXeMZKfMRyqZQrPQ",
  authDomain: "agora-sei-710e3.firebaseapp.com",
  projectId: "agora-sei-710e3",
  storageBucket: "agora-sei-710e3.appspot.com",
  messagingSenderId: "823276301119",
  appId: "1:823276301119:web:5a013906bc226d49b5c18a",
  measurementId: "G-5JQ82L195G",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Exportar os serviços necessários
export const db = getFirestore(app);
export const storage = getStorage(app);
