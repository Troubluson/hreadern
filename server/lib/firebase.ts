import { FirebaseOptions, initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  databaseURL: `hacker-news.firebaseio.com`,
} as FirebaseOptions;

const firebaseApp = initializeApp(firebaseConfig);

export const db = ref(getDatabase(firebaseApp));
