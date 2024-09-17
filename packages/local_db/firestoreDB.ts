import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const getFirestoreConnector = () => {
  if (getApps().length > 0) {
    return getFirestore();
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.log("Initializing LIVE Firestore");
    initializeApp({
      credential: applicationDefault(),
    });
  } else {
    console.log("Initializing local Firestore instance");
    initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }

  return getFirestore();
};

export { getFirestoreConnector };
