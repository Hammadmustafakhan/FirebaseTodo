import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
const firebaseConfig = {
  apiKey: "AIzaSyBL2uX_sqOmi0EKv85iX3ObiXgqfHwsJ8c",
  authDomain: "react-todo-99100.firebaseapp.com",
  projectId: "react-todo-99100",
  storageBucket: "react-todo-99100.appspot.com",
  messagingSenderId: "937266637229",
  appId: "1:937266637229:web:7e7ee0b7191c57df42d924",
  databaseURL:"https://react-todo-99100-default-rtdb.firebaseio.com/"
};


export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);