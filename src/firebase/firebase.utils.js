import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBaFxFbu5bhkxU4C_PDi5DUzdJ8XjN47Ng',
  authDomain: 'e-commerce-2afad.firebaseapp.com',
  projectId: 'e-commerce-2afad',
  storageBucket: 'e-commerce-2afad.appspot.com',
  messagingSenderId: '900986986065',
  appId: '1:900986986065:web:902d54afb441ce9d862270',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

