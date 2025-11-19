import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.BW_API_KEY;

    if (!apiKey) {
      console.error("BW_API_KEY environment variable is not set");
      return NextResponse.json(
        { error: "API configuration error" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.jaxius.net/bw/bw_hansard", {
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (!response.ok) {
      console.error(`Hansard API error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: "Failed to fetch Hansard records" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Hansard records:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
