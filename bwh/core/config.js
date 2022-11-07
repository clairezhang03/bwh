import { initializeApp } from "firebase/app";
import firebaseConfig from "./keys";

const app = initializeApp(firebaseConfig);

export const db = getFirestone(app);

export const auth = getAuth(app);