"use client";

import React, { useState, useEffect } from "react";
import { Metadata } from "next";
import { Category, Journal } from "@/types";
import JournalCard from "../components/journal-card";

// export const metadata: Metadata = {
//   title: "Journal",
//   description:
//     "Stay up-to-date with the latest news, tips, and insights for founders, freelancers, solopreneurs, and remote workers in Malaysia and Singapore.",
// };

interface JournalResponse {
  data: Journal[];
}

interface CategoriesResponse {
  data: Category[];
}

export default function JournalPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [featuredJournal, setFeaturedJournal] = useState<Journal | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [journalsLoading, setJournalsLoading] = useState(false);

  const fetchJournals = async (categorySlug?: string) => {
    try {
      setJournalsLoading(true);
      let url = `${process.env.NEXT_PUBLIC_API_URL}/journals?populate=*`;

      // Add category filter if not "all"
      if (categorySlug && categorySlug !== "all") {
        url += `&filters[category][slug][$eq]=${categorySlug}`;
      }

      const response = await fetch(url, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: JournalResponse = await response.json();
      setJournals(responseData.data);
    } catch (error) {
      console.error("Error fetching journals:", error);
      setJournals([]);
    } finally {
      setJournalsLoading(false);
    }
  };

  const fetchFeaturedJournal = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/journals?populate=*&filters[featured][$eq]=true`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: JournalResponse = await response.json();
      setFeaturedJournal(responseData.data[0] || null);
    } catch (error) {
      console.error("Error fetching featured journal:", error);
      setFeaturedJournal(null);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories?populate=*`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: CategoriesResponse = await response.json();
      setCategories(responseData.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await Promise.all([
        fetchCategories(),
        fetchFeaturedJournal(),
        fetchJournals(),
      ]);
      setLoading(false);
    };

    loadInitialData();
  }, []);

  // Fetch journals when active category changes
  useEffect(() => {
    if (!loading) {
      fetchJournals(activeCategory);
    }
  }, [activeCategory, loading]);

  const handleCategoryClick = (categorySlug: string) => {
    setActiveCategory(categorySlug);
  };

  return (
    <>
      <section className="bg-light-pink py-28 text-center dark:bg-background-dark/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tighter text-forest-green md:text-7xl">
            Journal
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-forest-green/80">
            Stay up-to-date with the latest news, tips, and insights for
            founders, freelancers, solopreneurs, and remote workers in Malaysia
            and Singapore.
          </p>
        </div>
      </section>
      <section className="py-16 bg-background-light dark:bg-background-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Featured Article */}
          {featuredJournal && (
            <div className="mb-20">
              <JournalCard journal={featuredJournal} isFeatured={true} />
            </div>
          )}

          {/* Category Filter */}
          <div className="mb-8 flex justify-center">
            <div className="flex flex-wrap space-x-2 rounded-full bg-white p-1 shadow-inner dark:bg-background-dark/50">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-8 bg-background-dark/10 dark:bg-background-light/10 rounded-full animate-pulse w-16"></div>
                  <div className="h-8 bg-background-dark/10 dark:bg-background-light/10 rounded-full animate-pulse w-20"></div>
                  <div className="h-8 bg-background-dark/10 dark:bg-background-light/10 rounded-full animate-pulse w-24"></div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleCategoryClick("all")}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      activeCategory === "all"
                        ? "bg-primary text-forest-green"
                        : "text-background-dark/60 hover:bg-primary/10 dark:text-background-light/60 dark:hover:bg-primary/20"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      onClick={() => handleCategoryClick(category.slug)}
                      key={category.id}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        activeCategory === category.slug
                          ? "bg-primary text-forest-green"
                          : "text-background-dark/60 hover:bg-primary/10 dark:text-background-light/60 dark:hover:bg-primary/20"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Journal Grid */}
          {/* {journalsLoading ? (
            // Loading skeleton
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-background-light dark:bg-background-dark rounded-xl shadow-lg animate-pulse"
                >
                  <div className="h-48 bg-background-dark/10 dark:bg-background-light/10 rounded-t-xl"></div>
                  <div className="p-6">
                    <div className="h-6 bg-background-dark/10 dark:bg-background-light/10 rounded mb-2"></div>
                    <div className="h-4 bg-background-dark/10 dark:bg-background-light/10 rounded mb-2"></div>
                    <div className="h-4 bg-background-dark/10 dark:bg-background-light/10 rounded mb-4 w-3/4"></div>
                    <div className="h-10 bg-background-dark/10 dark:bg-background-light/10 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) :  */}
          {journals.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {journals.map((journal) => (
                <JournalCard key={journal.id} journal={journal} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-background-dark/60 dark:text-background-light/60">
                {activeCategory === "all"
                  ? "No journal articles found."
                  : `No journal articles found for the selected category.`}
              </p>
              {activeCategory !== "all" && (
                <button
                  onClick={() => handleCategoryClick("all")}
                  className="mt-4 text-primary hover:underline"
                >
                  Show all articles
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {/* {journalsData.meta.pagination.pageCount > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full text-background-dark/60 transition-colors hover:bg-primary/10 dark:text-background-light/60 dark:hover:bg-primary/20"
                  disabled={journalsData.meta.pagination.page === 1}
                >
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </button>

                {Array.from(
                  {
                    length: Math.min(5, journalsData.meta.pagination.pageCount),
                  },
                  (_, i) => (
                    <button
                      key={i + 1}
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                        i + 1 === journalsData.meta.pagination.page
                          ? "bg-primary text-forest-green font-bold"
                          : "text-background-dark/60 hover:bg-primary/10 dark:text-background-light/60 dark:hover:bg-primary/20"
                      }`}
                    >
                      {i + 1}
                    </button>
                  )
                )}

                {journalsData.meta.pagination.pageCount > 5 && (
                  <>
                    <span className="text-background-dark/60 dark:text-background-light/60">
                      ...
                    </span>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-background-dark/60 transition-colors hover:bg-primary/10 dark:text-background-light/60 dark:hover:bg-primary/20">
                      {journalsData.meta.pagination.pageCount}
                    </button>
                  </>
                )}

                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full text-background-dark/60 transition-colors hover:bg-primary/10 dark:text-background-light/60 dark:hover:bg-primary/20"
                  disabled={
                    journalsData.meta.pagination.page ===
                    journalsData.meta.pagination.pageCount
                  }
                >
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
              </nav>
            </div>
          )} */}
        </div>
      </section>
    </>
  );
}
