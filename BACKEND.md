### (Backend is currently not implemented)

- [Here are the files that interact with backend](https://lulox.notion.site/Database-files-04686fe4dfde4025a7939a3a9a5caca8?pvs=4)
- [Here's how I configured the local backend](https://lulox.notion.site/Firebase-10213362a574808a80f6c0bd8f890db2?pvs=4) (good to debug if it doesn't work out of the box)
- Update `eip712.ts` info with the deployed contract info (address and chain) when deploying to a live chain or when deploying a second version on the local chaion

1. Set up your environment variables (and optionally, a local Firebase instance):
   Copy the `packages/nextjs/.env.example` file to `packages/nextjs/.env.local` and fill in the required environment variables.
   _When going online, fill in the commented out environment variables._

   (Optional) Start the firebase emulators (vs set up a live Firebase instance). You will need to install the [firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli) on macOS, Linux, or use [WSL on Windows](https://learn.microsoft.com/en-us/windows/wsl/install) and run the following command:

   ```bash
   # You might need to add a real "--project <projectName>" (run firebase projects:list)
   firebase emulators:start
   ```

2. Seed data in your local Firebase instance:

   Copy the `packages/local_db/seed.sample.json` to `packages/local_db/seed.json` and tweak the data as you see fit. Then run the following command:

   ```bash
   yarn seed
   ```

   To seed it to empty _*live*_ firestore instance you can use `yarn seed --force-prod`. If there is data in the live instance, it will not seed it again to bypass it use `yarn seed --reset --force-prod`

Visit your backend on: `http://localhost:4000/`. You can see what data is being stored in your Firebase database.
