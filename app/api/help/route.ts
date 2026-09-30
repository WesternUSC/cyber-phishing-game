import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { message, recipientEmail } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    if (!recipientEmail?.trim()) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["matthew.morelli@westernusc.ca"],
      replyTo: recipientEmail,
      subject: "New Help Chat Message",
      html: `
        <h2>New Help Chat Message</h2>

        <p><strong>From:</strong> ${recipientEmail}</p>

        <p><strong>Message:</strong></p>

        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        { error: error.message || "Resend failed to send the email." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}
