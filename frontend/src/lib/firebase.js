import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence } from "firebase/auth";



 const firebaseConfig = {
    apiKey: "AIzaSyCbIdie0w-i1B9zIg2Ia2APlbzpf__5_fc",
    authDomain: "bluff-grid.firebaseapp.com",
    projectId: "bluff-grid",
    storageBucket: "bluff-grid.firebasestorage.app",
    messagingSenderId: "234841094709",
    appId: "1:234841094709:web:53226412b4fb9bbd658f7c"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {})
  .catch((error) => {});

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
