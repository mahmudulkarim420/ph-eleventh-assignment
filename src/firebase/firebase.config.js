// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbQoJ41ISsCfewITnu8SyVQpS25M-WjBE",
  authDomain: "ph-eleventh-assignment.firebaseapp.com",
  projectId: "ph-eleventh-assignment",
  storageBucket: "ph-eleventh-assignment.firebasestorage.app",
  messagingSenderId: "242943755986",
  appId: "1:242943755986:web:d918f84be6085a081d8f0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;