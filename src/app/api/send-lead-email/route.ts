import { sendLeadEmail } from "@/lib/email-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, perkTitle, perkSlug, recipientEmail } = body;

    // Validate required fields
    if (!name || !email || !perkTitle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email using the email service
    const result = await sendLeadEmail({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim(),
      perkTitle,
      perkSlug,
      recipientEmail: recipientEmail || "hello@venturenext.io",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lead email sent successfully",
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in send-lead-email API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
