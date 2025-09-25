// At the top of your page.tsx file
export const dynamic = "force-dynamic";

import { FAQ, Link, SEO } from "@/types";
import React from "react";
import { Metadata } from "next";
import PartnerFAQSection from "../components/PartnerFAQSection";

interface HeroPWU {
  title: string;
  subtitle: string;
  background: {
    alternativeText: string | null;
    caption: string | null;
    url: string;
  };
  CTAButton: {
    title: string;
    link: Link;
  };
}

interface WhyPartnerWithUs {
  title: string;
  subtitle: string;
  WhyPartnerWithUsItem: WhyPartnerWithUsItem[];
}

interface WhyPartnerWithUsItem {
  icon: string;
  title: string;
  description: string;
}

interface HowItWorksPWU {
  title: string;
  subtitle: string | null;
  HowItWorksItemPWU: HowItWorksItemPWU[];
}

interface HowItWorksItemPWU {
  icon: string;
  title: string;
  description: string;
}

interface FAQPWU {
  title: string;
  subtitle: string | null;
  FAQ: FAQ[];
}

interface GetStartedPWU {
  title: string;
  subtitle: string;
  CTAButton: {
    title: string;
    link: Link;
  };
}

interface PartnerWithUsPageData {
  HeroPWU: HeroPWU;
  WhyPartnerWithUs: WhyPartnerWithUs;
  HowItWorksPWU: HowItWorksPWU;
  FAQPWU: FAQPWU;
  GetStartedPWU: GetStartedPWU;
}

interface PartnerWithUsPageResponse {
  data: PartnerWithUsPageData;
}

async function getPartnerWithUsPageData(): Promise<PartnerWithUsPageData | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/partner-with-us-page?populate[HeroPWU][populate][CTAButton][populate]=*&populate[HeroPWU][populate]=background&populate[WhyPartnerWithUs][populate]=*&populate[HowItWorksPWU][populate]=*&populate[FAQPWU][populate]=*&populate[GetStartedPWU][populate][CTAButton][populate]=*`;
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch partner with us page data: ${response.status}`
      );
    }

    const responseData: PartnerWithUsPageResponse = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error fetching partner with us page data:", error);
    // Return fallback data in case of error
    return null;
  }
}

// Generate dynamic metadata
// export async function generateMetadata(): Promise<Metadata> {
//   try {
//     const partnerPageData = await getPartnerWithUsPageData();
//
//     return {
//       title: partnerPageData?.SEO.meta_title || "Partner With Us - PerkPal",
//       description:
//         partnerPageData?.SEO.meta_description ||
//         "Join our network of leading brands and gain access to a thriving community of professionals.",
//     };
//   } catch (error) {
//     console.error("Error generating metadata for partner with us page:", error);
//     // Return fallback metadata
//     return {
//       title: "Partner With Us - PerkPal",
//       description:
//         "Join our network of leading brands and gain access to a thriving community of professionals.",
//     };
//   }
// }

export default async function PartnerWithUsPage() {
  const partnerPageData = await getPartnerWithUsPageData();

  if (!partnerPageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-background-dark/60 dark:text-background-light/60">
          Unable to load page data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${process.env.NEXT_PUBLIC_APP_URL}${partnerPageData.HeroPWU.background.url}')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter">
              {partnerPageData.HeroPWU.title}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-200">
              {partnerPageData.HeroPWU.subtitle}
            </p>
            <a
              href={partnerPageData.HeroPWU.CTAButton.link.href}
              className="mt-8 inline-block bg-primary text-gray-900 font-bold text-base py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
            >
              {partnerPageData.HeroPWU.CTAButton.title}
            </a>
          </div>
        </section>

        {/* Why Partner Section */}
        <section className="py-16 sm:py-24 bg-background-light dark:bg-background-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {partnerPageData.WhyPartnerWithUs.title}
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                {partnerPageData.WhyPartnerWithUs.subtitle}
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {partnerPageData.WhyPartnerWithUs.WhyPartnerWithUsItem.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center gap-4 bg-[#FFC0CB] dark:bg-pink-900/50 p-8 rounded-xl h-80 justify-center"
                  >
                    <div
                      className="text-gray-900 dark:text-white text-5xl"
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-black/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {partnerPageData.HowItWorksPWU.title}
              </h2>
              {partnerPageData.HowItWorksPWU.subtitle && (
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  {partnerPageData.HowItWorksPWU.subtitle}
                </p>
              )}
            </div>
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute left-8 top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"
                ></div>
                {partnerPageData.HowItWorksPWU.HowItWorksItemPWU.map(
                  (item, index) => (
                    <div
                      key={index}
                      className={`relative flex items-start gap-6 ${
                        index > 0 ? "mt-8" : ""
                      }`}
                    >
                      <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <div
                          className="text-gray-900 *:size-6"
                          dangerouslySetInnerHTML={{ __html: item.icon }}
                        />
                      </div>
                      <div className="pt-1.5">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <PartnerFAQSection
          title={partnerPageData.FAQPWU.title}
          subtitle={partnerPageData.FAQPWU.subtitle}
          faqs={partnerPageData.FAQPWU.FAQ}
        />

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-black/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {partnerPageData.GetStartedPWU.title}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              {partnerPageData.GetStartedPWU.subtitle}
            </p>
            <div className="mt-8">
              <a
                href={partnerPageData.GetStartedPWU.CTAButton.link.href}
                className="inline-block bg-primary text-gray-900 font-bold text-base py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
              >
                {partnerPageData.GetStartedPWU.CTAButton.title}
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
