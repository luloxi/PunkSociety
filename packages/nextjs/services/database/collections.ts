// import { firestore } from "firebase-admin";
import getFirestoreConnector from "~~/services/database/firestoreDB";

// import getFirestoreConnector from "./firestoreDB.js";

// Firestore instance
const firestoreDB = getFirestoreConnector();

// Function to create a collection
export async function createCollection({
  name,
  symbol,
  tokenURI,
  artistAddress,
}: {
  name: string;
  symbol: string;
  tokenURI: string;
  artistAddress: string;
}) {
  try {
    console.log("Creating collection with data:", { name, symbol, tokenURI, artistAddress });

    const collectionRef = await firestoreDB.collection("collections").add({
      name,
      symbol,
      tokenURI,
      artistAddress,
      // createdAt: new Date().toISOString(),
    });

    console.log("Collection created with ID:", collectionRef.id);

    return {
      id: collectionRef.id,
      name,
      symbol,
      tokenURI,
      artistAddress,
    };
  } catch (error) {
    console.error("Error creating collection:", error);
    throw new Error("Failed to create collection");
  }
}
