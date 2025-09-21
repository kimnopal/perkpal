// At the top of your page.tsx file
export const dynamic = "force-dynamic";

import { Perk } from "@/types";

interface HeroCard {
  title: string;
  subtitle: string;
}

interface HeroSection {
  title: string;
  subtitle: string;
  image: {
    url: string;
    alternativeText: string | null;
    caption: string | null;
  };
  HeroCard: HeroCard[];
}

interface ApiHomePageResponse {
  data: {
    Hero: HeroSection;
  };
}

async function getHomePageData(): Promise<HeroSection> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/home-page?populate[Hero][populate]=*`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch home page data: ${response.status}`);
    }

    const responseData: ApiHomePageResponse = await response.json();

    return responseData.data.Hero;
    // return data;
  } catch (error) {
    console.error("Error fetching home page data:", error);
    // Return fallback data in case of error
    return {
      title: "Welcome to PerkPal",
      subtitle: "Discover exclusive perks and benefits for your business",
      image: {
        url: "",
        alternativeText: "PerkPal Hero Image",
        caption: null,
      },
      HeroCard: [
        { title: "Exclusive Deals", subtitle: "Access unique offers" },
        { title: "Easy Redemption", subtitle: "Simple process" },
        { title: "Business Growth", subtitle: "Scale your venture" },
        { title: "Community Support", subtitle: "Connect with peers" },
      ],
    };
  }
}

interface PerksResponse {
  data: Perk[];
}

async function getLatestPerks(): Promise<Perk[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/perks?populate=*&category=*&sort=id:desc&pagination[limit]=3`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  const data: PerksResponse = await response.json();

  return data.data;
}

export default async function HomePage() {
  const heroSection = await getHomePageData();
  const latestPerks = await getLatestPerks();
  console.log(latestPerks);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[85vh] flex items-center bg-background-light dark:bg-background-dark text-background-dark dark:text-background-light border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left flex flex-col items-start gap-6 md:pr-10">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter max-w-xl">
              {heroSection.title}
            </h1>
            <p className="text-base md:text-lg max-w-xl text-background-dark/80 dark:text-background-light/80">
              {heroSection.subtitle}
            </p>
            <div className="flex flex-wrap justify-start gap-4 mt-4">
              <a
                className="px-8 py-4 rounded-lg text-lg font-bold bg-primary text-background-dark hover:bg-opacity-90 transition-transform transform hover:scale-105"
                href="#latest-perks"
              >
                Explore All Perks
              </a>
              <a
                className="px-8 py-4 rounded-lg text-lg font-bold bg-forest-green text-white hover:bg-opacity-90 transition-transform transform hover:scale-105"
                href="#"
              >
                List Your Perks
              </a>
            </div>
          </div>
          <div className="relative w-full max-w-lg mx-auto md:mx-0 justify-self-end">
            <img
              alt={heroSection.image.alternativeText || "Hero Image"}
              className="rounded-full aspect-square object-cover"
              src={`${process.env.NEXT_PUBLIC_APP_URL}${heroSection.image.url}`}
            />
            <div className="absolute top-0 -left-10 transform -translate-x-1/4 -translate-y-1/4 animate-float">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                <p className="font-bold text-sm">
                  {heroSection?.HeroCard[0].title}
                </p>
                <p className="text-xs text-gray-500">
                  {heroSection?.HeroCard[0].subtitle}
                </p>
              </div>
            </div>
            <div className="absolute top-10 right-0 transform translate-x-1/4 -translate-y-1/2 animate-float animation-delay-1000">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                <p className="font-bold text-sm">
                  {heroSection?.HeroCard[1].title}
                </p>
                <p className="text-xs text-gray-500">
                  {heroSection?.HeroCard[1].subtitle}
                </p>
              </div>
            </div>
            <div className="absolute bottom-20 -right-12 transform translate-x-1/2 translate-y-1/2 animate-float animation-delay-2000">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                <p className="font-bold text-sm">
                  {heroSection?.HeroCard[2].title}
                </p>
                <p className="text-xs text-gray-500">
                  {heroSection?.HeroCard[2].subtitle}
                </p>
              </div>
            </div>
            <div className="absolute bottom-5 left-0 transform -translate-x-1/2 translate-y-1/4 animate-float animation-delay-3000">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                <p className="font-bold text-sm">
                  {heroSection?.HeroCard[3].title}
                </p>
                <p className="text-xs text-gray-500">
                  {heroSection?.HeroCard[3].subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="py-16 md:py-24 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-700"
        id="how-it-works"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-background-dark dark:text-background-light">
              How It Works
            </h2>
            <p className="mt-2 text-lg text-background-dark/70 dark:text-background-light/70">
              It&apos;s as easy as 1, 2, 3.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-full">
                <svg
                  className="h-10 w-10 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-background-dark dark:text-background-light">
                1. Browse Perks
              </h3>
              <p className="text-background-dark/70 dark:text-background-light/70">
                Explore our curated marketplace of exclusive deals.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-full">
                <svg
                  className="h-10 w-10 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-background-dark dark:text-background-light">
                2. Select a Deal
              </h3>
              <p className="text-background-dark/70 dark:text-background-light/70">
                Choose the offer that best fits your needs.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-full">
                <svg
                  className="h-10 w-10 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-background-dark dark:text-background-light">
                3. Redeem &amp; Save
              </h3>
              <p className="text-background-dark/70 dark:text-background-light/70">
                Follow the link to the partner&apos;s site and enjoy your
                discount.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Perks Section */}
      <section
        className="py-16 md:py-24 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-700"
        id="latest-perks"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-background-dark dark:text-background-light">
              Latest Perks
            </h2>
            <p className="mt-2 text-lg text-background-dark/70 dark:text-background-light/70">
              Fresh deals added every week.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPerks.map((perks, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-gray-800"
              >
                <div
                  className="w-full h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${process.env.NEXT_PUBLIC_APP_URL}${perks.logo.url})`,
                  }}
                ></div>
                <div className="p-6">
                  {/* <p className="text-sm text-primary font-bold">{perks.}</p> */}
                  <h3 className="text-xl font-bold text-background-dark dark:text-background-light mt-2">
                    {perks.title}
                  </h3>
                  <p className="text-background-dark/70 dark:text-background-light/70 mt-2">
                    {perks.short_description}
                  </p>
                  <a
                    className="inline-block mt-4 font-bold text-primary hover:underline"
                    href="/"
                  >
                    Claim Perk →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal Section */}
      <section
        className="py-16 md:py-24 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-700"
        id="journal"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-background-dark dark:text-background-light">
              From The Journal
            </h2>
            <p className="mt-2 text-lg text-background-dark/70 dark:text-background-light/70">
              Insights and stories for the modern professional.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div
                className="w-full aspect-video bg-cover bg-center rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB4OLlHf2izWpBNAFGOXyrGFWhgXQlMlZMfOqH7RfaVjVW1OCfwRCvXqsbdDAsi6wDUB0tX00T3D0b15cB4_mziqJYPYWYZcptPU5qIha7I54PdLNuz6VnFdOYxK_DlQt8KcFyq026uCR6fI8NVyS7T4FIthnEGEnVRpJ8ypoOA4qKDWP8ebitk8j0TK6hsCDsVna5M8R7IaEb4FHtvb8GYSL4eX5KpBG468IVkraRFCNvVfgFi879Bw5JbeiPWvKRP8dWmNA5MNuqj")',
                }}
              ></div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  PRODUCTIVITY • 5 MIN READ
                </p>
                <h3 className="text-xl font-bold text-background-dark dark:text-background-light mt-2 group-hover:text-primary transition-colors">
                  The Solopreneur&apos;s Guide to Staying Focused
                </h3>
                <p className="text-background-dark/70 dark:text-background-light/70 mt-2">
                  Discover tips and tricks to maintain productivity when
                  you&apos;re your own boss.
                </p>
              </div>
            </div>
            <div className="group">
              <div
                className="w-full aspect-video bg-cover bg-center rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB4OLlHf2izWpBNAFGOXyrGFWhgXQlMlZMfOqH7RfaVjVW1OCfwRCvXqsbdDAsi6wDUB0tX00T3D0b15cB4_mziqJYPYWYZcptPU5qIha7I54PdLNuz6VnFdOYxK_DlQt8KcFyq026uCR6fI8NVyS7T4FIthnEGEnVRpJ8ypoOA4qKDWP8ebitk8j0TK6hsCDsVna5M8R7IaEb4FHtvb8GYSL4eX5KpBG468IVkraRFCNvVfgFi879Bw5JbeiPWvKRP8dWmNA5MNuqj")',
                }}
              ></div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  STARTUPS • 8 MIN READ
                </p>
                <h3 className="text-xl font-bold text-background-dark dark:text-background-light mt-2 group-hover:text-primary transition-colors">
                  Navigating the Seed Funding Landscape in SEA
                </h3>
                <p className="text-background-dark/70 dark:text-background-light/70 mt-2">
                  An insider look at securing your first round of investment in
                  Singapore and Malaysia.
                </p>
              </div>
            </div>
            <div className="group">
              <div
                className="w-full aspect-video bg-cover bg-center rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB4OLlHf2izWpBNAFGOXyrGFWhgXQlMlZMfOqH7RfaVjVW1OCfwRCvXqsbdDAsi6wDUB0tX00T3D0b15cB4_mziqJYPYWYZcptPU5qIha7I54PdLNuz6VnFdOYxK_DlQt8KcFyq026uCR6fI8NVyS7T4FIthnEGEnVRpJ8ypoOA4qKDWP8ebitk8j0TK6hsCDsVna5M8R7IaEb4FHtvb8GYSL4eX5KpBG468IVkraRFCNvVfgFi879Bw5JbeiPWvKRP8dWmNA5MNuqj")',
                }}
              ></div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  REMOTE WORK • 6 MIN READ
                </p>
                <h3 className="text-xl font-bold text-background-dark dark:text-background-light mt-2 group-hover:text-primary transition-colors">
                  Top 10 Tools for Asynchronous Collaboration
                </h3>
                <p className="text-background-dark/70 dark:text-background-light/70 mt-2">
                  How to work effectively with your team across different time
                  zones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
