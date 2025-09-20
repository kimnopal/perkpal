import React from "react";

interface ContactPageData {
  title: string;
  subtitle: string;
}

interface ContactPageResponse {
  data: ContactPageData;
}

async function getContactPageData(): Promise<ContactPageData> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/contact-page?populate=*`;
  const response = await fetch(url);
  const data: ContactPageResponse = await response.json();
  return data.data;
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
            <form className="space-y-6">
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
              href="mailto:support@perks.com"
            >
              {" "}
              support@perks.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
