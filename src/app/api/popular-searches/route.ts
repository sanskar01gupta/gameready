import { NextResponse } from "next/server";
import { getPopularSearches } from "@/lib/db/queries";

export async function GET() {
  try {
    const games = await getPopularSearches(10);
    return NextResponse.json(games);
  } catch (error) {
    console.error("Error fetching popular searches:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
