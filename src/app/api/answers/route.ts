import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "GET request handled" });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "POST request handled" });
}
