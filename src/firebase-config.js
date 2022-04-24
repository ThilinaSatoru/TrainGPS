// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { doc, onSnapshot } from 'firebase/firestore';
import {
  getDatabase, ref, get, child,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAIUZGiX9u0MnAjrg37rVGCFSd2ABTV1Ww',
  authDomain: 'railwaymap-cb396.firebaseapp.com',
  databaseURL:
    'https://railwaymap-cb396-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'railwaymap-cb396',
  storageBucket: 'railwaymap-cb396.appspot.com',
  messagingSenderId: '153773630407',
  appId: '1:153773630407:web:4cdb1df518d01ae38dafe2',
  measurementId: 'G-SP1JMTSQXP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const database = getDatabase(app);

export {
  database, ref, get, child, doc, onSnapshot,
};
