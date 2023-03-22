import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    projectId: 'food-recipes-app-5d498',
    appId: '1:242622028615:web:f1ce2fafefe565ae7e4a62',
    storageBucket: 'food-recipes-app-5d498.appspot.com',
    apiKey: 'AIzaSyAF08rDv0ycFGKiLMFS-hK0KKcqUDa9OH0',
    authDomain: 'food-recipes-app-5d498.firebaseapp.com',
    messagingSenderId: '242622028615',
    measurementId: 'G-KRB30694HS',
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);