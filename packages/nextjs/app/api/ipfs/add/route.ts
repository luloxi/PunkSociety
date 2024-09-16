import { ipfsClient } from "~~/utils/simpleNFT/ipfs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Request Body:", body); // Log the request body for debugging

    const res = await ipfsClient.add(JSON.stringify(body));
    console.log("IPFS Response:", res); // Log the IPFS response

    return Response.json(res);
  } catch (error) {
    console.error("Error adding to IPFS:", error); // Add error logging

    return new Response(JSON.stringify({ error: "Error adding to IPFS" }), { status: 500 });
  }
}
