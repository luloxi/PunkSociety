import { NextRequest, NextResponse } from "next/server";
import { ipfsClient } from "~~/utils/simpleNFT/ipfs";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes (2 * 1024 * 1024 = 2,097,152 bytes)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse(JSON.stringify({ error: "No file or invalid file provided" }), { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return new NextResponse(JSON.stringify({ error: "File size exceeds the maximum limit of 2 MB" }), {
        status: 400,
      });
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
