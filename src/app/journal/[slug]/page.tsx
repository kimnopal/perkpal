import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Journal } from "@/types";
import MarkdownRenderer from "../../components/MarkdownRenderer";
import { notFound } from "next/navigation";

interface JournalResponse {
  data: Journal[];
}

async function getJournalBySlug(slug: string): Promise<Journal | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/journals?populate=*&filters[slug][$eq]=${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData: JournalResponse = await response.json();
    return responseData.data[0] || null;
  } catch (error) {
    console.error("Error fetching journal:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const journal = await getJournalBySlug(slug);

  if (!journal) {
    return {
      title: "Journal Not Found",
      description: "The requested journal article could not be found.",
    };
  }

  return {
    title: journal.title,
    description: journal.excerpt,
    openGraph: {
      title: journal.title,
      description: journal.excerpt,
      images: journal.banner
        ? [`${process.env.NEXT_PUBLIC_APP_URL}${journal.banner.url}`]
        : [],
    },
  };
}

export default async function ShowJournalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const journal = await getJournalBySlug(slug);

  if (!journal) {
    notFound();
  }

  const formattedDate = new Date(journal.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeAgo = (date: string) => {
    const now = new Date();
    const publishDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - publishDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-8 md:mb-10">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-background-dark/60 dark:text-background-light/60 hover:text-background-dark dark:hover:text-background-light transition-colors group underline text-sm md:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left group-hover:-translate-x-1 transition-transform size-4 md:size-5"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <span>Back to Journal</span>
        </Link>
      </div>

      {/* Header Section */}
      <header className="mb-8">
        {/* Category Tag */}
        {journal.category && (
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-tag-icon lucide-tag size-3"
              >
                <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>{" "}
              {journal.category.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-background-dark dark:text-background-light mb-6 leading-tight">
          {journal.title}
        </h1>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-5 text-background-dark/60 dark:text-background-light/60 mb-8">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-calendar-icon lucide-calendar size-4"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
            <span className="text-sm">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-clock-icon lucide-clock size-4"
            >
              <path d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span className="text-sm">{timeAgo(journal.date)}</span>
          </div>
          {journal.category && (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-book-open-icon lucide-book-open size-4"
              >
                <path d="M12 7v14" />
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
              </svg>
              <span className="text-sm">{journal.category.name}</span>
            </div>
          )}
          {/* {journal.featured && (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star-icon lucide-star size-4"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-sm">Featured</span>
            </div>
          )} */}
        </div>

        {/* Author Profile */}
        {journal.author && (
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-background-dark/20 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user-icon lucide-user size-5"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-background-dark dark:text-background-light">
                {journal.author.username}
              </h3>
              <p className="text-sm text-background-dark/60 dark:text-background-light/60">
                {journal.author.email}
              </p>
            </div>
          </div>
        )}

        {/* Share Button */}
        <button className="flex items-center gap-2 px-4 py-2 dark:bg-background-dark/50 text-background-dark dark:text-background-light rounded-lg hover:bg-background-dark/5 dark:hover:bg-primary/20 transition-colors border border-background-dark/10 dark:border-background-light/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-share2-icon lucide-share-2 size-4"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
          </svg>
          <span>Share Article</span>
        </button>
      </header>

      {/* Hero Image */}
      <section className="mb-8">
        {journal.banner ? (
          <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden">
            <img
              src={`${process.env.NEXT_PUBLIC_APP_URL}${journal.banner.url}`}
              alt={journal.banner.alternativeText || journal.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-64 md:h-96 bg-background-dark/10 dark:bg-background-light/10 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="text-center text-background-dark/40 dark:text-background-light/40">
              <div className="w-16 h-16 mx-auto mb-4 bg-background-dark/20 dark:bg-background-light/20 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-image-icon lucide-image size-5"
                >
                  <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
                  <path d="M15 3v4a3 3 0 0 1-3 3H6l3 3 3-3 4-4z" />
                </svg>
              </div>
              <p className="text-sm">No banner image available</p>
            </div>
          </div>
        )}
      </section>

      {/* Article Excerpt */}
      <div className="pb-4 border-b border-background-dark/10 dark:border-background-light/10 mb-8">
        {journal.preface && <MarkdownRenderer content={journal.preface} />}
      </div>

      {/* Article Content */}
      <article className="mb-12">
        {journal.content && <MarkdownRenderer content={journal.content} />}
      </article>

      {/* Bottom Section */}
      <footer className="border-t border-background-dark/10 dark:border-background-light/10 pt-8">
        {/* Share Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-background-dark dark:text-background-light mb-4">
            Share
          </h3>
          <div className="flex gap-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                `${process.env.NEXT_PUBLIC_APP_URL}/journal/${
                  journal.slug || slug
                }`
              )}`}
              className="flex items-center justify-center w-10 h-10 bg-background-dark/5 text-background-dark dark:text-background-light rounded-full hover:bg-background-dark/10 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 text-background-dark dark:text-background-light"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                `${process.env.NEXT_PUBLIC_APP_URL}/journal/${
                  journal.slug || slug
                }`
              )}&text=${encodeURIComponent(journal.title)}`}
              className="flex items-center justify-center w-10 h-10 bg-background-dark/5 text-background-dark dark:text-background-light rounded-full hover:bg-background-dark/10 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 text-background-dark dark:text-background-light"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                `${process.env.NEXT_PUBLIC_APP_URL}/journal/${
                  journal.slug || slug
                }`
              )}&title=${encodeURIComponent(
                journal.title
              )}&summary=${encodeURIComponent(journal.excerpt || "")}`}
              className="flex items-center justify-center w-10 h-10 bg-background-dark/5 text-background-dark dark:text-background-light rounded-full hover:bg-background-dark/10 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 text-background-dark dark:text-background-light"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Tags Section */}
        {journal.tags && journal.tags.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-background-dark dark:text-background-light mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {journal.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 border border-background-dark/20 dark:border-background-light/20 text-background-dark dark:text-background-light rounded-full text-sm hover:border-background-dark/30 dark:hover:border-background-light/30 transition-colors"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </footer>
    </div>
  );
}
