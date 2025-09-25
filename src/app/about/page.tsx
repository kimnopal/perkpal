// At the top of your page.tsx file
export const dynamic = "force-dynamic";

import React from "react";
import { Metadata } from "next";
import { FAQ, SEO } from "@/types";
import FAQSection from "../components/FAQSection";

interface AboutPageData {
  HeroAbout: HeroAbout;
  WhatWeDo: WhatWeDo;
  WhoWeServe: WhoWeServe;
  FAQ: FAQ[];
  SEO: SEO;
}

interface HeroAbout {
  title: string;
  subtitle: string;
  background: {
    alternativeText: string | null;
    caption: string | null;
    url: string;
  };
}

interface WhatWeDo {
  title: string;
  subtitle: string;
  WhatWeDoItem: WhatWeDoItem[];
}

interface WhatWeDoItem {
  icon: string;
  title: string;
  description: string;
}

interface WhoWeServe {
  title: string;
  subtitle: string;
  WhoWeServeItem: WhoWeServeItem[];
}

interface WhoWeServeItem {
  icon: string;
  title: string;
  description: string;
}

interface AboutPageResponse {
  data: AboutPageData;
}

async function getAboutPageData(): Promise<AboutPageData | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/about-page?populate[HeroAbout][populate]=*&populate[WhatWeDo][populate]=*&populate[WhoWeServe][populate]=*&populate[FAQ]=*&populate[SEO]=*`;
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
    return null;
  }
}

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutPageData = await getAboutPageData();

    return {
      title: aboutPageData?.SEO.meta_title || "About PerkPal",
      description:
        aboutPageData?.SEO.meta_description ||
        "Empowering independent professionals with exclusive perks and community",
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

  if (!aboutPageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-background-dark/60 dark:text-background-light/60">
          Unable to load page data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[50vh] bg-cover bg-center text-white"
        style={{
          backgroundImage: `url('${process.env.NEXT_PUBLIC_APP_URL}${aboutPageData.HeroAbout.background.url}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {aboutPageData.HeroAbout.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90">
            {aboutPageData.HeroAbout.subtitle}
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-12 md:py-20 px-4 md:px-10 lg:px-20 xl:px-40 bg-light-gray-bg dark:bg-background-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-background-dark dark:text-background-light">
              {aboutPageData.WhatWeDo.title}
            </h2>
            <p className="mt-4 text-lg text-background-dark/80 dark:text-background-light/80 max-w-3xl mx-auto">
              {aboutPageData.WhatWeDo.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {aboutPageData.WhatWeDo.WhatWeDoItem.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-perk-pink dark:bg-pink-900/30 rounded-xl shadow-md"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-400">
                  <div
                    className="*:size-6 text-luxury-green"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                </div>
                <h3 className="text-xl font-bold text-background-dark dark:text-background-light mb-2">
                  {item.title}
                </h3>
                <p className="text-background-dark/80 dark:text-background-light/80">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-12 md:py-20 bg-light-green-bg dark:bg-luxury-green/10 px-4 md:px-10 lg:px-20 xl:px-40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-background-dark dark:text-background-light">
              {aboutPageData.WhoWeServe.title}
            </h2>
            <p className="mt-4 text-lg text-background-dark/80 dark:text-background-light/80 max-w-3xl mx-auto">
              {aboutPageData.WhoWeServe.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {aboutPageData.WhoWeServe.WhoWeServeItem.map((item, index) => (
              <div key={index} className="flex flex-col items-center p-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-400">
                  <div
                    className="*:size-6 text-luxury-green"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                </div>
                <h4 className="text-xl font-bold text-background-dark dark:text-background-light">
                  {item.title}
                </h4>
                <p className="mt-2 text-background-dark/80 dark:text-background-light/80">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={aboutPageData.FAQ} />
    </>
  );
}
