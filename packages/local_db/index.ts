import * as dotenv from "dotenv";
dotenv.config({ path: "../nextjs/.env.local" });

import { getFirestoreConnector } from "./firestoreDB.js";
import { importSeed } from "./utils.js";

const seedData = async () => {
  const firestoreDB = getFirestoreConnector();

  const args = process.argv.slice(2);
  const flags = args.filter((arg) => arg.startsWith("--"));
  const isForceProd = flags.includes("--force-prod");

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.log("Connected to LIVE Firestore");
    if (!isForceProd) {
      console.log("To update Live firestore use `yarn seed --force-prod`");
      console.log("Exiting...");
      return;
    }
  }

  try {
    await importSeed(firestoreDB);
  } catch (error) {
    console.error("Error seeding the data:", error);
  }
};

try {
  seedData();
} catch (error) {
  console.error("Error initializing seed data:", error);
}
