"use client";

import React, { useState, useEffect } from "react";
import { SEO } from "@/types";

interface ContactPageData {
  title: string;
  subtitle: string;
  email: string;
  SEO: SEO;
}

interface ContactPageResponse {
  data: ContactPageData;
}

export default function ContactPage() {
  const [contactPageData, setContactPageData] = useState<ContactPageData>({
    title: "Contact Us",
    subtitle: "Get in touch with our team. We'd love to hear from you!",
    email: "hello@venturenext.io",
    SEO: {
      meta_title: "Contact Us",
      meta_description:
        "Get in touch with our team. We'd love to hear from you!",
    },
  });
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch contact page data
  useEffect(() => {
    const fetchContactPageData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/contact-page?populate=*`;
        const response = await fetch(url, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch contact page data: ${response.status}`
          );
        }

        const responseData: ContactPageResponse = await response.json();
        setContactPageData(responseData.data);
      } catch (error) {
        console.error("Error fetching contact page data:", error);
        // Keep fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchContactPageData();
  }, []);

  // Form handlers
  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setFormError("All fields are required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError("Please enter a valid email address");
      return;
    }

    try {
      setFormLoading(true);
      setFormError(null);

      // Send email via API route
      const response = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          recipientEmail: contactPageData.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send email");
      }

      setFormSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormSuccess(false);
      }, 5000);
    } catch (err) {
      console.error("Email sending error:", err);
      setFormError(
        err instanceof Error
          ? err.message
          : "Failed to send email. Please try again."
      );
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <>
      <div className="bg-soft-pink text-text-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {contactPageData.title}
          </h2>
          <p className="mt-4 text-lg text-muted-light max-w-2xl mx-auto">
            {contactPageData.subtitle}
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-background-dark/80 p-8 rounded-xl shadow-lg border border-black/5 dark:border-white/5 backdrop-blur-sm">
            {formSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Thank you for contacting us. We'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {formError && (
                  <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                    {formError}
                  </div>
                )}

                <div>
                  <label
                    className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
                    htmlFor="name"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full bg-background-light dark:bg-background-dark border-transparent focus:border-primary focus:ring-primary rounded-lg py-3 px-4 text-sm placeholder:text-muted-light dark:placeholder:text-muted-dark"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    placeholder="e.g., Jane Doe"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
                    htmlFor="email"
                  >
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full bg-background-light dark:bg-background-dark border-transparent focus:border-primary focus:ring-primary rounded-lg py-3 px-4 text-sm placeholder:text-muted-light dark:placeholder:text-muted-dark"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    placeholder="e.g., jane.doe@example.com"
                    type="email"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
                    htmlFor="subject"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full bg-background-light dark:bg-background-dark border-transparent focus:border-primary focus:ring-primary rounded-lg py-3 px-4 text-sm placeholder:text-muted-light dark:placeholder:text-muted-dark"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      handleFormChange("subject", e.target.value)
                    }
                    placeholder="What can we help you with?"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
                    htmlFor="message"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full bg-background-light dark:bg-background-dark border-transparent focus:border-primary focus:ring-primary rounded-lg py-3 px-4 text-sm placeholder:text-muted-light dark:placeholder:text-muted-dark"
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      handleFormChange("message", e.target.value)
                    }
                    placeholder="Your message here..."
                    rows={5}
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-primary text-text-light font-bold text-sm py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={formLoading}
                  >
                    {formLoading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>
          <p className="text-center mt-8 text-sm text-muted-light dark:text-muted-dark">
            Alternatively, you can email us at
            <a
              className="font-medium text-primary hover:underline"
              href={`mailto:${contactPageData.email}`}
            >
              {" "}
              {contactPageData.email}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
