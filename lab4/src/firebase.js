import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: `AIzaSyDhY2bu1_0q9GitPd7fhfiHK9gKgxmMaJ8`,
  authDomain: `goalstream-f269f.firebaseapp.com`,
  projectId: `goalstream-f269f`,
  storageBucket: `goalstream-f269f.firebasestorage.app`,
  messagingSenderId: `400849393508`,
  appId: `1:400849393508:web:5565339d4a047327b2cc71`
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
