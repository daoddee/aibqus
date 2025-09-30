import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, consent } = await req.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    // TODO: Persist to DB, Google Sheets, or send email notification.
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Bad Request" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
