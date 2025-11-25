import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAe2Rnq5BHkC-cT687lj_7pwkcU6sBG3bM",
  authDomain: "ceapp-serv.firebaseapp.com",
  projectId: "ceapp-serv",
  storageBucket: "ceapp-serv.firebasestorage.app",
  messagingSenderId: "637503757230",
  appId: "1:637503757230:web:319a4023fcd02711f8863f",
  measurementId: "G-WHY0MS0VYS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);