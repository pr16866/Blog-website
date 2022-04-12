import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5kIwwGA4ETifve877JWKIz-VqZI3AFNA",
  authDomain: "blog-website-f6952.firebaseapp.com",
  projectId: "blog-website-f6952",
  storageBucket: "blog-website-f6952.appspot.com",
  messagingSenderId: "551073631576",
  appId: "1:551073631576:web:de3d31c3725a702803e92d",
};
 
  firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  
  // googleAuthProvider(); 
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export  { auth,googleAuthProvider,facebookAuthProvider};
