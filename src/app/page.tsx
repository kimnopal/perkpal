// At the top of your page.tsx file
export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { Link, Perk, SEO, Journal } from "@/types";

// Hero Section
interface Hero {
  title: string;
  subtitle: string;
  image: {
    url: string;
    alternativeText: string | null;
    caption: string | null;
  };
  HeroCard: HeroCard[];
  ButtonTop: ButtonTop;
  ButtonBottom: ButtonBottom;
}

interface HeroCard {
  title: string;
  subtitle: string;
}

interface ButtonTop {
  title: string;
  link: Link;
}

interface ButtonBottom {
  title: string;
  link: Link;
}

// How it works Section
interface HowItWorks {
  title: string;
  subtitle: string;
  HowItWorksItem: HowItWorksItem[];
}

interface HowItWorksItem {
  icon: string;
  title: string;
  description: string;
}

interface HomePageData {
  Hero: Hero;
  HowItWorks: HowItWorks;
  SEO: SEO;
}

interface HomePageResponse {
  data: HomePageData;
}

async function getHomePageData(): Promise<HomePageData | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/home-page?populate[Hero][populate][ButtonTop][populate]=*&populate[Hero][populate][ButtonBottom][populate]=*&populate[Hero][populate][HeroCard]=*&populate[Hero][populate]=image&populate[HowItWorks][populate]=*&populate[SEO]=*`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch home page data: ${response.status}`);
    }

    const responseData: HomePageResponse = await response.json();

    return responseData.data;
    // return data;
  } catch (error) {
    console.error("Error fetching home page data:", error);
    // Return fallback data in case of error
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getHomePageData();

    return {
      title: data?.SEO.meta_title,
      description: data?.SEO.meta_description,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    // Return fallback metadata
    return {
      title: "Welcome to PerkPal",
      description: "Discover exclusive perks and benefits for your business",
    };
  }
}

interface PerksResponse {
  data: Perk[];
}

interface JournalResponse {
  data: Journal[];
}

async function getLatestPerks(): Promise<Perk[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/perks?populate=*&category=*&sort=id:desc&pagination[limit]=3`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  const responseData: PerksResponse = await response.json();

  return responseData.data;
}

async function getLatestJournals(): Promise<Journal[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/journals?populate=*&sort=id:desc&pagination[limit]=3`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch journals: ${response.status}`);
    }

    const responseData: JournalResponse = await response.json();

    return responseData.data;
  } catch (error) {
    console.error("Error fetching latest journals:", error);
    return [];
  }
}

function getIconSvg(iconType: string) {
  const icons = {
    search: (
      <path
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    ),
    select: (
      <path
        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    ),
    redeem: (
      <path
        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    ),
  };

  return icons[iconType as keyof typeof icons] || icons.search;
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} MIN READ`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function HomePage() {
  const data = await getHomePageData();
  const latestPerks = await getLatestPerks();
  const latestJournals = await getLatestJournals();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[85vh] flex items-center bg-background-light dark:bg-background-dark text-background-dark dark:text-background-light border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left flex flex-col items-start gap-6 md:pr-10">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter max-w-xl">
              {data?.Hero.title}
            </h1>
            <p className="text-base md:text-lg max-w-xl text-background-dark/80 dark:text-background-light/80">
              {data?.Hero.subtitle}
            </p>
            <div className="flex flex-wrap justify-start gap-4 mt-4">
              <a
                className="px-8 py-4 rounded-lg text-lg font-bold bg-primary text-background-dark hover:bg-opacity-90 transition-transform transform hover:scale-105"
                href={data?.Hero.ButtonTop.link.href}
              >
                {data?.Hero.ButtonTop.title}
              </a>
              <a
                className="px-8 py-4 rounded-lg text-lg font-bold bg-forest-green text-white hover:bg-opacity-90 transition-transform transform hover:scale-105"
                href={data?.Hero.ButtonBottom.link.href}
              >
                {data?.Hero.ButtonBottom.title}
              </a>
            </div>
          </div>
          <div className="relative w-full max-w-lg mx-auto md:mx-0 justify-self-end">
            <img
              alt={data?.Hero.image.alternativeText || "Hero Image"}
              className="rounded-full aspect-square object-cover"
              src={`${process.env.NEXT_PUBLIC_APP_URL}${data?.Hero.image.url}`}
            />
            {data?.Hero.HeroCard && data?.Hero.HeroCard.length > 0 && (
              <>
                <div className="absolute top-0 -left-10 transform -translate-x-1/4 -translate-y-1/4 animate-float">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                    <p className="font-bold text-sm">
                      {data?.Hero.HeroCard[0]?.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {data?.Hero.HeroCard[0]?.subtitle}
                    </p>
                  </div>
                </div>
                {data?.Hero.HeroCard[1] && (
                  <div className="absolute top-10 right-0 transform translate-x-1/4 -translate-y-1/2 animate-float animation-delay-1000">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                      <p className="font-bold text-sm">
                        {data?.Hero.HeroCard[1].title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {data?.Hero.HeroCard[1].subtitle}
                      </p>
                    </div>
                  </div>
                )}
                {data?.Hero.HeroCard[2] && (
                  <div className="absolute bottom-20 -right-12 transform translate-x-1/2 translate-y-1/2 animate-float animation-delay-2000">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                      <p className="font-bold text-sm">
                        {data?.Hero.HeroCard[2].title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {data?.Hero.HeroCard[2].subtitle}
                      </p>
                    </div>
                  </div>
                )}
                {data?.Hero.HeroCard[3] && (
                  <div className="absolute bottom-5 left-0 transform -translate-x-1/2 translate-y-1/4 animate-float animation-delay-3000">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                      <p className="font-bold text-sm">
                        {data?.Hero.HeroCard[3].title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {data?.Hero.HeroCard[3].subtitle}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
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
              {data?.HowItWorks.title}
            </h2>
            <p className="mt-2 text-lg text-background-dark/70 dark:text-background-light/70">
              {data?.HowItWorks.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {data?.HowItWorks.HowItWorksItem.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-4">
                <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-full">
                  <div
                    className="*:size-9 text-primary *:stroke-2"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                </div>
                <h3 className="text-xl font-bold text-background-dark dark:text-background-light">
                  {item.title}
                </h3>
                <p className="text-background-dark/70 dark:text-background-light/70">
                  {item.description}
                </p>
              </div>
            ))}
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
            {latestPerks.map((perkItem) => (
              <div
                key={perkItem.slug}
                className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-gray-800"
              >
                <div
                  className="w-full h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${process.env.NEXT_PUBLIC_APP_URL}${perkItem.logo.url})`,
                  }}
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-background-dark dark:text-background-light mt-2">
                    {perkItem.title}
                  </h3>
                  <p className="text-background-dark/70 dark:text-background-light/70 mt-2">
                    {perkItem.short_description}
                  </p>
                  <a
                    className="inline-block mt-4 font-bold text-primary hover:underline"
                    href={`/perk/${perkItem.slug}`}
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
          {latestJournals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestJournals.map((journal) => (
                <a
                  key={journal.id}
                  href={`/journal/${journal.slug}`}
                  className="group cursor-pointer"
                >
                  <div
                    className="w-full aspect-video bg-cover bg-center rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage: `url(${process.env.NEXT_PUBLIC_APP_URL}${journal.banner.url})`,
                    }}
                  ></div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                      {journal.category.name} •{" "}
                      {calculateReadingTime(journal.content)}
                    </p>
                    <h3 className="text-xl font-bold text-background-dark dark:text-background-light mt-2 group-hover:text-primary transition-colors">
                      {journal.title}
                    </h3>
                    <p className="text-background-dark/70 dark:text-background-light/70 mt-2">
                      {journal.excerpt}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-background-dark/60 dark:text-background-light/60">
                No journal articles available at the moment.
              </p>
              <a
                href="/journal"
                className="mt-4 inline-block text-primary hover:underline"
              >
                View all articles →
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
