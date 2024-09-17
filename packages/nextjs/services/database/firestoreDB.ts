import { firestore } from "firebase-admin";
import admin from "firebase-admin";

// Ensure Firebase Admin SDK is initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const getFirestoreConnector = () => {
  console.log("Initializing Firestore");
  return firestore(); // Correctly returns the Firestore instance
};

export default getFirestoreConnector;
