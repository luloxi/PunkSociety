import getFirestoreConnector from "~~/services/database/firestoreDB";

// Firestore instance
const firestoreDB = getFirestoreConnector();

// Find a user (or artist) by their wallet address
export async function findUserByAddress(address: string) {
  const userSnapshot = await firestoreDB.collection("users").where("walletAddress", "==", address).get();

  if (!userSnapshot.empty) {
    const userDoc = userSnapshot.docs[0];
    return { exists: true, data: userDoc.data() };
  }

  return { exists: false };
}
