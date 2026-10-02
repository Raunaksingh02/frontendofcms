import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMYld7v1tfgK17EJL9sQtsjAm2_E12pTU",
  authDomain: "lmsotp-3ddb5.firebaseapp.com",
  projectId: "lmsotp-3ddb5",
  storageBucket: "lmsotp-3ddb5.firebasestorage.app",
  messagingSenderId: "239024878412",
  appId: "1:239024878412:web:da97238d0aa4f938b955e9",
  measurementId: "G-8G76HESD79",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;