// At the top of your page.tsx file
export const dynamic = "force-dynamic";

import React from "react";
import { Metadata } from "next";
import { FAQ, SEO } from "@/types";
import FAQSection from "../components/FAQSection";

interface AboutPageData {
  title: string;
  subtitle: string;
  background: {
    alternativeText: string | null;
    caption: string | null;
    url: string;
  };
  FAQ: FAQ[];
  SEO: SEO;
}

interface AboutPageResponse {
  data: AboutPageData;
}

async function getAboutPageData(): Promise<AboutPageData> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/about-page?populate=*`;
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch about page data: ${response.status}`);
    }

    const responseData: AboutPageResponse = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error fetching about page data:", error);
    // Return fallback data in case of error
    return {
      title: "About PerkPal",
      subtitle:
        "Empowering independent professionals with exclusive perks and community",
      background: {
        alternativeText: "About PerkPal",
        caption: null,
        url: "/placeholder-about.jpg",
      },
      FAQ: [],
      SEO: {
        meta_title: "About PerkPal",
        meta_description:
          "Empowering independent professionals with exclusive perks and community",
      },
    };
  }
}

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutPageData = await getAboutPageData();

    return {
      title: aboutPageData.SEO.meta_title,
      description: aboutPageData.SEO.meta_description,
    };
  } catch (error) {
    console.error("Error generating metadata for about page:", error);
    // Return fallback metadata
    return {
      title: "About PerkPal",
      description:
        "Empowering independent professionals with exclusive perks and community",
    };
  }
}

export default async function AboutPage() {
  const aboutPageData = await getAboutPageData();

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[50vh] bg-cover bg-center text-white"
        style={{
          backgroundImage: `url('${process.env.NEXT_PUBLIC_APP_URL}${aboutPageData.background.url}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {aboutPageData.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90">
            {aboutPageData.subtitle}
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-12 md:py-20 px-4 md:px-10 lg:px-20 xl:px-40 bg-light-gray-bg dark:bg-background-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-background-dark dark:text-background-light">
              What We Do
            </h2>
            <p className="mt-4 text-lg text-background-dark/80 dark:text-background-light/80 max-w-3xl mx-auto">
              PerkPal is your unfair advantage. We curate exclusive deals and
              build a supportive community to help you thrive in your
              independent career.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6 bg-perk-pink dark:bg-pink-900/30 rounded-xl shadow-md">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-400">
                <span className="material-symbols-outlined text-4xl text-luxury-green">
                  military_tech
                </span>
              </div>
              <h3 className="text-xl font-bold text-background-dark dark:text-background-light mb-2">
                Exclusive Perks
              </h3>
              <p className="text-background-dark/80 dark:text-background-light/80">
                Access unbeatable discounts on software, co-working spaces,
                lifestyle brands, and more, handpicked for your needs.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-perk-yellow dark:bg-yellow-400/20 rounded-xl shadow-md">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-400">
                <span className="material-symbols-outlined text-4xl text-luxury-green">
                  groups
                </span>
              </div>
              <h3 className="text-xl font-bold text-background-dark dark:text-background-light mb-2">
                Community &amp; Events
              </h3>
              <p className="text-background-dark/80 dark:text-background-light/80">
                Connect with fellow entrepreneurs, share knowledge, and grow
                your network through our exclusive events and online platform.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-perk-purple dark:bg-purple-900/30 rounded-xl shadow-md">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-400">
                <span className="material-symbols-outlined text-4xl text-luxury-green">
                  lightbulb
                </span>
              </div>
              <h3 className="text-xl font-bold text-background-dark dark:text-background-light mb-2">
                Valuable Resources
              </h3>
              <p className="text-background-dark/80 dark:text-background-light/80">
                Gain insights from industry experts, access helpful guides, and
                get the support you need to navigate your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-12 md:py-20 bg-light-green-bg dark:bg-luxury-green/10 px-4 md:px-10 lg:px-20 xl:px-40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-background-dark dark:text-background-light">
              Who We Serve
            </h2>
            <p className="mt-4 text-lg text-background-dark/80 dark:text-background-light/80 max-w-3xl mx-auto">
              We cater to the ambitious and the self-driven in Malaysia and
              Singapore. Our platform is built for:
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-400">
                <span className="material-symbols-outlined text-4xl text-luxury-green">
                  rocket_launch
                </span>
              </div>
              <h4 className="text-xl font-bold text-background-dark dark:text-background-light">
                Founders &amp; Startups
              </h4>
              <p className="mt-2 text-background-dark/80 dark:text-background-light/80">
                Get the resources you need to scale your business without
                breaking the bank.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-400">
                <span className="material-symbols-outlined text-4xl text-luxury-green">
                  brush
                </span>
              </div>
              <h4 className="text-xl font-bold text-background-dark dark:text-background-light">
                Freelancers &amp; Solopreneurs
              </h4>
              <p className="mt-2 text-background-dark/80 dark:text-background-light/80">
                Access perks that are usually reserved for large corporations.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-400">
                <span className="material-symbols-outlined text-4xl text-luxury-green">
                  wifi
                </span>
              </div>
              <h4 className="text-xl font-bold text-background-dark dark:text-background-light">
                Remote Workers
              </h4>
              <p className="mt-2 text-background-dark/80 dark:text-background-light/80">
                Enhance your work-from-anywhere lifestyle with our curated
                benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={aboutPageData.FAQ} />
    </>
  );
}
