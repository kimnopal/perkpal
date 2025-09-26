import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadEmail({
  name,
  email,
  phone,
  perkTitle,
  perkSlug,
  recipientEmail,
}: {
  name: string;
  email: string;
  phone?: string;
  perkTitle: string;
  perkSlug?: string;
  recipientEmail: string;
}) {
  try {
    console.log(name, email, phone, perkTitle, perkSlug, recipientEmail);

    const { data, error } = await resend.emails.send({
      from: "Lead Form <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `PerkPal Lead Form: ${perkTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Lead from PerkPal</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #666;">Perk Details</h3>
            <p><strong>Perk:</strong> ${perkTitle}</p>
            <p><strong>Slug:</strong> ${perkSlug || "N/A"}</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Lead Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f4fd; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This email was sent from PerkPal lead form. You can reply directly to this email to contact the lead.
            </p>
          </div>
        </div>
      `,
      replyTo: email, // This allows you to reply directly to the lead
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send email");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
  recipientEmail,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
  recipientEmail: string;
}) {
  try {
    console.log(name, email, subject, message, recipientEmail);

    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `PerkPal Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Message from PerkPal</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #666;">Subject</h3>
            <p style="font-size: 16px; font-weight: 600;">${subject}</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f4fd; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This email was sent from PerkPal contact form. You can reply directly to this email to respond to the sender.
            </p>
          </div>
        </div>
      `,
      replyTo: email, // This allows you to reply directly to the sender
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send email");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}

// Alternative: Using Nodemailer with SMTP
/*
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendLeadEmailWithSMTP({
  name,
  email,
  phone,
  perkTitle,
  perkSlug,
  recipientEmail
}: {
  name: string;
  email: string;
  phone?: string;
  perkTitle: string;
  perkSlug?: string;
  recipientEmail: string;
}) {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: recipientEmail,
      subject: `PerkPal Lead Form: ${perkTitle}`,
      html: `
        <h2>New Lead from PerkPal</h2>
        <h3>Perk Details</h3>
        <p><strong>Perk:</strong> ${perkTitle}</p>
        <p><strong>Slug:</strong> ${perkSlug || 'N/A'}</p>
        
        <h3>Lead Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        
        <p><em>This email was sent from PerkPal lead form.</em></p>
      `,
      replyTo: email,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('SMTP email sending error:', error);
    throw error;
  }
}
*/
