import { NextRequest, NextResponse } from "next/server";
import { searchGames, getAllGames } from "@/lib/db/queries";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("search")?.trim();
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10) || 20));
  const offset = (page - 1) * limit;

  try {
    if (query && query.length >= 2) {
      const result = await searchGames(query, limit, offset);
      return NextResponse.json({
        games: result.games,
        total: result.total,
        page,
        totalPages: Math.ceil(result.total / limit),
        query,
      });
    }

    const result = await getAllGames(limit, offset);
    return NextResponse.json({
      games: result.games,
      total: result.total,
      page,
      totalPages: Math.ceil(result.total / limit),
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}
