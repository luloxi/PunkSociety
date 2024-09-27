import { NextResponse } from "next/server";
import { recoverTypedDataAddress } from "viem";
import { createCollection } from "~~/services/database/collections";
// import { getFirestoreConnector } from "~~/services/database/firestoreDB";
// import getFirestoreConnector from "~~/services/database/firestoreDB.js";
// This function will be created
import { EIP_712_DOMAIN, EIP_712_TYPES__START_COLLECTION } from "~~/utils/eip712";

type ReqBody = {
  collectionName: string;
  collectionSymbol: string;
  description: string;
  image: string;
  animationUrl: string;
  attributes: object[];
  user: string;
  signature: `0x${string}`;
  signer: string;
};

// Use Firestore instance for collection
// const firestoreDB = getFirestoreConnector();

export async function POST(req: Request) {
  try {
    const { collectionName, collectionSymbol, description, image, animationUrl, attributes, user, signature, signer } =
      (await req.json()) as ReqBody;

    console.log("Received request data:", {
      collectionName,
      collectionSymbol,
      description,
      image,
      attributes,
      signature,
      signer,
    });

    if (!collectionName || !collectionSymbol || !description || !image || !attributes || !signature || !signer) {
      return NextResponse.json({ error: "Invalid form details submitted" }, { status: 400 });
    }

    // Verify the signature using EIP-712
    const recoveredAddress = await recoverTypedDataAddress({
      domain: EIP_712_DOMAIN,
      types: EIP_712_TYPES__START_COLLECTION,
      primaryType: "StartCollection",
      message: {
        collectionName,
        collectionSymbol,
        description,
        image,
        animationUrl,
        attributes: JSON.stringify(attributes),
        user,
      },
      signature: signature,
    });

    if (recoveredAddress !== signer) {
      return NextResponse.json({ error: "Recovered address did not match signer" }, { status: 401 });
    }

    // Create collection in Firestore
    const collection = await createCollection({
      name: collectionName,
      symbol: collectionSymbol,
      tokenURI: image, // Assuming the image acts as tokenURI
      userAddress: user,
    });

    // Store the signature with the collection in Firestore
    // See if this is necessary
    // await firestoreDB.collection("collections").doc(collection.id).update({
    //   signature,
    // });

    return NextResponse.json({ collection }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error processing collection creation" }, { status: 500 });
  }
}
