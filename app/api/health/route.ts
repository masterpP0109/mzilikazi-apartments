import { NextResponse } from "next/server";

export async function GET() {
  const status = {
    status: "ok",
    service: "mzilikazi-apartments",
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(status, { status: 200 });
}
