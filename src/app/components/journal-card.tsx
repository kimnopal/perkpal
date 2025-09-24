import { Journal } from "@/types";
import Link from "next/link";
import React from "react";

function calculateReadTime(content: any[]): number {
  const wordsPerMinute = 200;
  let totalWords = 0;

  const countWords = (nodes: any[]): number => {
    return nodes.reduce((count, node) => {
      if (node.children) {
        return count + countWords(node.children);
      }
      if (node.text) {
        return (
          count +
          node.text.split(/\s+/).filter((word: string) => word.length > 0)
            .length
        );
      }
      return count;
    }, 0);
  };

  totalWords = countWords(content);
  return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface JournalCardProps {
  journal: Journal;
  isFeatured?: boolean;
}

export default function JournalCard({
  journal,
  isFeatured = false,
}: JournalCardProps) {
  const readTime = 0;
  const imageUrl = `${process.env.NEXT_PUBLIC_APP_URL}${journal.banner.url}`;
  console.log(journal);
  if (isFeatured) {
    return (
      <div className="group flex flex-col md:flex-row overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl dark:bg-background-dark/50 dark:shadow-primary/10 dark:hover:shadow-primary/20 transform hover:-translate-y-1 duration-300">
        <div className="md:w-3/5">
          <div className="aspect-w-16 aspect-h-9 w-full h-full">
            <img
              alt={journal.banner?.alternativeText || journal.title}
              className="h-full w-full object-cover"
              src={imageUrl}
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-10 md:p-14 md:w-2/5 justify-center">
          <div className="mb-4">
            <span className="rounded-full bg-primary/80 px-4 py-1.5 text-sm font-semibold text-forest-green backdrop-blur-sm">
              Featured
            </span>
          </div>
          <h3 className="mb-4 text-4xl font-bold leading-tight text-background-dark dark:text-background-light">
            {journal.title}
          </h3>
          <div className="mb-5 flex items-center text-base text-background-dark/60 dark:text-background-light/60">
            <span>{formatDate(journal.date)}</span>
            <span className="mx-2">·</span>
            <span>{readTime} min read</span>
          </div>
          <p className="mb-8 flex-1 text-lg text-background-dark/80 dark:text-background-light/80">
            {journal.excerpt}
          </p>
          <Link
            className="font-bold text-forest-green transition-colors hover:text-forest-green/80 text-lg"
            href={`/journal/${journal.slug}`}
          >
            Read More
            <span className="material-symbols-outlined ml-1 inline-block align-middle text-xl">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-background-dark/50 dark:shadow-primary/10 dark:hover:shadow-primary/20">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 w-full">
          <img
            alt={journal.banner?.alternativeText || journal.title}
            className="h-full w-full object-cover"
            src={imageUrl}
          />
        </div>
        <div className="absolute top-4 left-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-forest-green backdrop-blur-sm">
          {journal.category.name}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-lg font-bold leading-snug text-background-dark dark:text-background-light">
          {journal.title}
        </h3>
        <div className="mb-3 flex items-center text-sm text-background-dark/60 dark:text-background-light/60">
          <span>{formatDate(journal.date)}</span>
          <span className="mx-2">·</span>
          <span>{readTime} min read</span>
        </div>
        <p className="mb-4 flex-1 text-background-dark/80 dark:text-background-light/80">
          {journal.excerpt}
        </p>
        <Link
          className="font-bold text-forest-green transition-colors hover:text-forest-green/80"
          href={`/journal/${journal.slug}`}
        >
          Read More
          <span className="material-symbols-outlined ml-1 inline-block align-middle text-base">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
}
