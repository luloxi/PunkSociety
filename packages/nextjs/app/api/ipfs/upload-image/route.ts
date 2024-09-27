import { NextRequest, NextResponse } from "next/server";
import { ipfsClient } from "~~/utils/simpleNFT/ipfs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse(JSON.stringify({ error: "No file or invalid file provided" }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const res = await ipfsClient.add(buffer);

    console.log("IPFS Response:", res);

    return new NextResponse(JSON.stringify(res));
  } catch (error) {
    console.error("Error adding image to IPFS:", error);
    return new NextResponse(JSON.stringify({ error: "Error adding image to IPFS" }), { status: 500 });
  }
}
