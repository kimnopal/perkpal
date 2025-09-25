"use client";

import React, { useState, useEffect } from "react";
import { Category, SubCategory, Perk } from "../../types";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Perks",
//   description: "Perks",
// };

interface CategoriesResponse {
  data: Category[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface PerksResponse {
  data: Perk[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// async function getPerksPageData(): Promise<PerksResponse> {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/perks?populate=*`;

//   const response = await fetch(url, {
//     cache: "no-store",
//   });

//   const responseData: PerksResponse = await response.json();

//   return responseData;
// }

// export async function generateMetadata(): Promise<Metadata> {
//   try {
//     const { data } = await getPerksPageData();

//     return {
//       title: data.SEO.meta_title,
//       description: data.SEO.meta_description,
//     };
//   } catch (error) {
//     console.error("Error generating metadata:", error);
//     // Return fallback metadata
//     return {
//       title: "Welcome to PerkPal",
//       description: "Discover exclusive perks and benefits for your business",
//     };
//   }
// }

export default function PerkPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [perks, setPerks] = useState<Perk[]>([]);
  const [loading, setLoading] = useState(true);
  const [perksLoading, setPerksLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("all");
  const [activeLocation, setActiveLocation] = useState<string>("global");

  const fetchPerks = async (
    categorySlug?: string,
    subCategorySlug?: string
  ) => {
    try {
      setPerksLoading(true);
      let url = `${process.env.NEXT_PUBLIC_API_URL}/perks?populate=*`;

      // Add category filter if not "all"
      if (categorySlug && categorySlug !== "all") {
        url += `&filters[category][slug][$eq]=${categorySlug}`;
      }

      // Add sub-category filter if not "all"
      if (subCategorySlug && subCategorySlug !== "all") {
        url += `&filters[sub_category][slug][$eq]=${subCategorySlug}`;
      }

      const response = await fetch(url, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PerksResponse = await response.json();

      if (data.data && Array.isArray(data.data)) {
        setPerks(data.data);
      } else {
        console.error("Invalid perks data structure:", data);
        setPerks([]);
      }
    } catch (err) {
      console.error("Error fetching perks:", err);
      setPerks([]);
    } finally {
      setPerksLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories?populate=sub_categories`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: CategoriesResponse = await response.json();

        // Ensure data.data exists and is an array
        if (data.data && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          console.error("Invalid categories data structure:", data);
          setError("Invalid data structure received from API");
        }

        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch categories"
        );
        setLoading(false);
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
    fetchPerks(); // Fetch all perks initially
  }, []);

  // Fetch perks when category or sub-category changes
  useEffect(() => {
    fetchPerks(activeCategory, activeSubCategory);
  }, [activeCategory, activeSubCategory]);

  const handleCategoryClick = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    setActiveSubCategory("all"); // Reset sub-category when changing category
  };

  const handleSubCategoryClick = (subCategorySlug: string) => {
    setActiveSubCategory(subCategorySlug);
  };

  const handleLocationClick = (location: string) => {
    setActiveLocation(location);
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-background-dark dark:text-background-light mb-4">
          Browse Perks
        </h1>
        <p className="text-lg text-background-dark/70 dark:text-background-light/70 max-w-3xl mx-auto">
          Exclusive deals for founders, freelancers, and remote workers in
          Malaysia &amp; Singapore.
        </p>
      </div>
      {/* <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4 border-b-2 border-background-dark/10 dark:border-background-light/10 pb-4">
          {loading ? (
            <div className="flex items-center gap-4">
              <div className="h-8 bg-background-dark/10 dark:bg-background-light/10 rounded animate-pulse w-20"></div>
              <div className="h-8 bg-background-dark/10 dark:bg-background-light/10 rounded animate-pulse w-24"></div>
              <div className="h-8 bg-background-dark/10 dark:bg-background-light/10 rounded animate-pulse w-16"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm">
              Failed to load categories: {error}
            </div>
          ) : (
            <>
              <button
                onClick={() => handleCategoryClick("all")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === "all"
                    ? "text-primary border-b-2 border-primary"
                    : "text-background-dark/70 dark:text-background-light/70 hover:text-primary dark:hover:text-primary"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === category.slug
                      ? "text-primary border-b-2 border-primary"
                      : "text-background-dark/70 dark:text-background-light/70 hover:text-primary dark:hover:text-primary"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </>
          )}
        </div>
      </div> */}
      {/* Main Category Filters */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-background-dark dark:text-background-light mb-4">
          Categories
        </h3>
        <div className="flex flex-wrap gap-3">
          {!loading && !error && (
            <>
              <button
                onClick={() => handleCategoryClick("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === "all"
                    ? "bg-yellow-400 text-background-dark shadow-md"
                    : "bg-white dark:bg-white text-background-dark hover:bg-yellow-100 shadow-sm"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === category.slug
                      ? "bg-yellow-400 text-background-dark shadow-md"
                      : "bg-white dark:bg-white text-background-dark hover:bg-yellow-100 shadow-sm"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Sub Category Filters - Only show when a main category is selected */}
      {!loading && !error && activeCategory !== "all" && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-background-dark dark:text-background-light mb-4">
            Sub Categories
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleSubCategoryClick("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSubCategory === "all"
                  ? "bg-yellow-400 text-background-dark shadow-md"
                  : "bg-white dark:bg-white text-background-dark hover:bg-yellow-100 shadow-sm"
              }`}
            >
              All Sub Categories
            </button>
            {categories
              .filter(
                (category) =>
                  category.slug === activeCategory &&
                  category.sub_categories &&
                  category.sub_categories.length > 0
              )
              .flatMap((category) => category.sub_categories!)
              .map((subCategory) => (
                <button
                  key={`filter-sub-${subCategory.id}`}
                  onClick={() => handleSubCategoryClick(subCategory.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSubCategory === subCategory.slug
                      ? "bg-yellow-400 text-background-dark shadow-md"
                      : "bg-white dark:bg-white text-background-dark hover:bg-yellow-100 shadow-sm"
                  }`}
                >
                  {subCategory.name}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Location Filters */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-background-dark dark:text-background-light mb-4">
          Location
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleLocationClick("global")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeLocation === "global"
                ? "bg-yellow-400 text-background-dark shadow-md"
                : "bg-white dark:bg-white text-background-dark hover:bg-yellow-100 shadow-sm"
            }`}
          >
            Global
          </button>
          <button
            onClick={() => handleLocationClick("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeLocation === "all"
                ? "bg-yellow-400 text-background-dark shadow-md"
                : "bg-white dark:bg-white text-background-dark hover:bg-yellow-100 shadow-sm"
            }`}
          >
            All Locations
          </button>
          <button
            onClick={() => handleLocationClick("malaysia")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeLocation === "malaysia"
                ? "bg-yellow-400 text-background-dark shadow-md"
                : "bg-white dark:bg-white text-background-dark hover:bg-yellow-100 shadow-sm"
            }`}
          >
            Malaysia
          </button>
          <button
            onClick={() => handleLocationClick("singapore")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeLocation === "singapore"
                ? "bg-yellow-400 text-background-dark shadow-md"
                : "bg-white dark:bg-white text-background-dark hover:bg-yellow-100 shadow-sm"
            }`}
          >
            Singapore
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* {perksLoading ? (
          // Loading skeleton
          [...Array(6)].map((_, index) => (
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
          ))
        ) : */}

        {perks.length > 0 ? (
          perks.map((perk, index) => (
            <div
              key={`${perk.slug}-${index}`}
              className="bg-background-light dark:bg-background-dark rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden"
            >
              <div className="relative">
                <img
                  alt={perk.logo.alternativeText}
                  className="w-full h-48 object-cover"
                  src={`${process.env.NEXT_PUBLIC_APP_URL}${perk.logo.url}`}
                />
                {perk.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-primary text-background-dark text-xs font-bold px-2 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                  {perk.title}
                </h3>
                <p className="text-background-dark/70 dark:text-background-light/70 text-sm mb-4 flex-grow line-clamp-3">
                  {perk.short_description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-background-dark/50 dark:text-background-light/50 capitalize">
                    {perk.redemption_method?.replace("_", " ")}
                  </span>
                  {perk.valid_to && (
                    <span className="text-xs text-background-dark/50 dark:text-background-light/50">
                      Valid until {new Date(perk.valid_to).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <button className="w-full cursor-pointer rounded-lg bg-primary text-background-dark font-bold py-2.5 px-4 hover:bg-primary/90 transition-colors">
                  {perk.redemption_method === "coupon_code"
                    ? "Get Code"
                    : perk.redemption_method === "affiliate_link"
                    ? "Claim Perk"
                    : "Apply Now"}
                </button>
              </div>
            </div>
          ))
        ) : (
          // No perks found
          <div className="col-span-full text-center py-16">
            <div className="text-background-dark/50 dark:text-background-light/50 text-lg mb-4">
              No perks found for the selected filters
            </div>
            <p className="text-background-dark/40 dark:text-background-light/40 text-sm">
              Try selecting a different category or check back later for new
              perks
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
