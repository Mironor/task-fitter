import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAoRInzr4EQb-VwMas1DvhyIdwtf9ozdSs",
    authDomain: "time-fitness.firebaseapp.com",
    databaseURL: "https://time-fitness.firebaseio.com",
    projectId: "time-fitness",
    storageBucket: "time-fitness.appspot.com",
    messagingSenderId: "959847235961"
};

firebase.initializeApp(config);


const firestoreConfig = {
    timestampsInSnapshots: true
};


const auth = firebase.auth();

const firestore = firebase.firestore();
firestore.settings(firestoreConfig);

export {
    firebase,
    auth,
    firestore,
};
