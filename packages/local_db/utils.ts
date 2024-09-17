import { Firestore } from "firebase-admin/firestore";
import { constants, copyFileSync, existsSync, readFileSync } from "fs";

type SeedData = {
  version: string;
  users: Record<string, object>;
  builds: Record<string, object>;
  events: Record<string, object>;
  config: Record<string, object>;
  cohorts: Record<string, object>;
  notifications: Record<string, object>;
  grants: Record<string, object>;
};

async function importCollectionData(
  database: Firestore,
  collectionName: string,
  data: Record<string, object>,
  ignoreId: boolean = false,
) {
  for (const [id, docData] of Object.entries(data)) {
    if (ignoreId) {
      await database.collection(collectionName).add(docData);
      continue;
    }
    await database.collection(collectionName).doc(id).set(docData);
  }
}

export const importSeed = async (database: Firestore) => {
  const SEED_PATH = "./seed.json";
  const SEED_EXAMPLE_PATH = "./seed.sample.json";

  const args = process.argv.slice(2);
  const flags = args.filter((arg) => arg.startsWith("--"));
  const isReset = flags.includes("--reset");

  const existingCollections = await database.listCollections();
  if (existingCollections.length > 0) {
    if (!isReset) {
      console.log("*** Local Firestore is not empty. Skipping seed import...");
      console.log("To reset the local Firestore, run `yarn seed --reset`");
      return;
    }
  }

  if (!existsSync(SEED_PATH)) {
    copyFileSync(SEED_EXAMPLE_PATH, SEED_PATH, constants.COPYFILE_EXCL);
  }

  const exampleSeed: SeedData = JSON.parse(
    readFileSync(SEED_EXAMPLE_PATH, "utf8"),
  );
  const currentSeed: SeedData = JSON.parse(readFileSync(SEED_PATH, "utf8"));

  const needsToUpdateDbVersion = exampleSeed.version !== currentSeed.version;
  if (needsToUpdateDbVersion) {
    console.log("New local db version: overwriting existing seed file");
    copyFileSync(SEED_EXAMPLE_PATH, SEED_PATH);
  }

  const seedToImport = needsToUpdateDbVersion ? exampleSeed : currentSeed;
  console.log("Importing seed to Firestore emulator....");

  await Promise.all([
    importCollectionData(database, "users", seedToImport.users),
    importCollectionData(database, "builds", seedToImport.builds),
    importCollectionData(database, "events", seedToImport.events),
    importCollectionData(database, "config", seedToImport.config),
    importCollectionData(database, "cohorts", seedToImport.cohorts),
    importCollectionData(database, "notifications", seedToImport.notifications),
    importCollectionData(database, "grants", seedToImport.grants, true),
  ]);

  console.log("Seed completed successfully! 🌱");
};
