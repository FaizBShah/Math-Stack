import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const fbConfig = {
    apiKey: "AIzaSyB-aJ3JpxuFho8C_F_EJVDJrL01qMzNnK8",
    authDomain: "mathstack-3f5bc.firebaseapp.com",
    projectId: "mathstack-3f5bc",
    storageBucket: "mathstack-3f5bc.appspot.com",
    messagingSenderId: "173678877152",
    appId: "1:173678877152:web:69a4e1ce904fa15998f385",
    measurementId: "G-9ESXEP5EJ0"
  };

firebase.initializeApp(fbConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase