import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id);
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailLower = email.toLowerCase().trim();

    // Verify user exists
    const user = await db.user.findUnique({
      where: { email: emailLower },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User account not found. Please sign in first." },
        { status: 401 }
      );
    }

    // Verify event exists
    const event = await db.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Check if already registered
    const existingReg = await db.registration.findUnique({
      where: {
        userId_eventId: {
          userId: user.id,
          eventId: eventId,
        },
      },
    });

    if (existingReg) {
      return NextResponse.json(
        { error: "You are already registered for this event." },
        { status: 400 }
      );
    }

    // Create registration and increment registrationsCount inside a transaction
    await db.$transaction([
      db.registration.create({
        data: {
          userId: user.id,
          eventId: eventId,
        },
      }),
      db.event.update({
        where: { id: eventId },
        data: {
          registrationsCount: {
            increment: 1,
          },
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Event registration error:", error);
    return NextResponse.json(
      { error: "Failed to register for this event" },
      { status: 500 }
    );
  }
}
