import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBaFxFbu5bhkxU4C_PDi5DUzdJ8XjN47Ng',
//   authDomain: 'e-commerce-2afad.firebaseapp.com',
//   projectId: 'e-commerce-2afad',
//   storageBucket: 'e-commerce-2afad.appspot.com',
//   messagingSenderId: '900986986065',
//   appId: '1:900986986065:web:902d54afb441ce9d862270',
// };
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN, 
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

