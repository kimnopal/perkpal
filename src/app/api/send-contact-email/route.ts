import { sendContactEmail } from "@/lib/email-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, recipientEmail } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
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
    const result = await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      recipientEmail: recipientEmail || "hello@venturenext.io",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact email sent successfully",
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in send-contact-email API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
