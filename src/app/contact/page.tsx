export const dynamic = "force-dynamic";

import { SEO } from "@/types";
import { Metadata } from "next";

interface ContactPageData {
  title: string;
  subtitle: string;
  email: string;
  SEO: SEO;
}

interface ContactPageResponse {
  data: ContactPageData;
}

async function getContactPageData(): Promise<ContactPageData> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/contact-page?populate=*`;
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch contact page data: ${response.status}`);
    }

    const responseData: ContactPageResponse = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error fetching contact page data:", error);
    // Return fallback data in case of error
    return {
      title: "Contact Us",
      subtitle: "Get in touch with our team. We'd love to hear from you!",
      email: "hello@venturenext.io",
      SEO: {
        meta_title: "Contact Us",
        meta_description:
          "Get in touch with our team. We'd love to hear from you!",
      },
    };
  }
}

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  try {
    const contactPageData = await getContactPageData();

    return {
      title: contactPageData.SEO.meta_title,
      description: contactPageData.SEO.meta_description,
    };
  } catch (error) {
    console.error("Error generating metadata for contact page:", error);
    // Return fallback metadata
    return {
      title: "Contact Us",
      description: "Get in touch with our team. We'd love to hear from you!",
    };
  }
}

export default async function ContactPage() {
  const contactPageData = await getContactPageData();

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
            <form
              className="space-y-6"
              action={`mailto:${contactPageData.email}`}
              method="post"
            >
              <div>
                <label
                  className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <input
                  className="w-full bg-background-light dark:bg-background-dark border-transparent focus:border-primary focus:ring-primary rounded-lg py-3 px-4 text-sm placeholder:text-muted-light dark:placeholder:text-muted-dark"
                  id="name"
                  name="name"
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
                  Your Email
                </label>
                <input
                  className="w-full bg-background-light dark:bg-background-dark border-transparent focus:border-primary focus:ring-primary rounded-lg py-3 px-4 text-sm placeholder:text-muted-light dark:placeholder:text-muted-dark"
                  id="email"
                  name="email"
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
                  Subject
                </label>
                <input
                  className="w-full bg-background-light dark:bg-background-dark border-transparent focus:border-primary focus:ring-primary rounded-lg py-3 px-4 text-sm placeholder:text-muted-light dark:placeholder:text-muted-dark"
                  id="subject"
                  name="subject"
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
                  Message
                </label>
                <textarea
                  className="w-full bg-background-light dark:bg-background-dark border-transparent focus:border-primary focus:ring-primary rounded-lg py-3 px-4 text-sm placeholder:text-muted-light dark:placeholder:text-muted-dark"
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  rows={5}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-primary text-text-light font-bold text-sm py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
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
