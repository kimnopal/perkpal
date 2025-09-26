"use client";

import React, { useState, useEffect } from "react";
import { Category, SubCategory, Perk } from "../../types";
import { Metadata } from "next";
import Image from "next/image";

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

interface PerkPageData {
  show_redemption_method: string;
  email: string;
}

interface PerkPageResponse {
  data: PerkPageData;
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
  const [showPerkPageData, setShowPerkPageData] = useState<PerkPageData | null>(
    null
  );
  const [pageDataLoading, setPageDataLoading] = useState(true);

  // Lead form popup state
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedPerk, setSelectedPerk] = useState<Perk | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch perk page data to get show_redemption_method setting
  const fetchPerkPageData = async () => {
    try {
      setPageDataLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/perk-page?populate=*`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PerkPageResponse = await response.json();

      if (data.data && data.data.show_redemption_method) {
        setShowPerkPageData(data.data);
      }
    } catch (err) {
      console.error("Error fetching perk page data:", err);
      // Continue with default behavior if this fails
    } finally {
      setPageDataLoading(false);
    }
  };

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

      // Add show_redemption_method filter if available and not "all"
      // This filter controls which perks are shown based on the page configuration
      if (
        showPerkPageData?.show_redemption_method &&
        showPerkPageData.show_redemption_method !== "all"
      ) {
        url += `&filters[redemption_method][$eq]=${showPerkPageData.show_redemption_method}`;
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

    // Initialize data fetching
    const initializeData = async () => {
      await fetchPerkPageData(); // Fetch page data first to get show_redemption_method
      fetchCategories();
    };

    initializeData();
  }, []);

  // Fetch perks when showRedemptionMethod is loaded
  useEffect(() => {
    if (!pageDataLoading) {
      fetchPerks(activeCategory, activeSubCategory);
    }
  }, [pageDataLoading, showPerkPageData]);

  // Fetch perks when category or sub-category changes
  useEffect(() => {
    if (!pageDataLoading) {
      fetchPerks(activeCategory, activeSubCategory);
    }
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

  // Lead form handlers
  const handlePerkClick = (perk: Perk) => {
    if (perk.redemption_method === "lead_form") {
      setSelectedPerk(perk);
      setShowLeadForm(true);
      setFormSuccess(false);
      setFormError(null);
    }
  };

  const handleCloseLeadForm = () => {
    setShowLeadForm(false);
    setSelectedPerk(null);
    setFormData({ name: "", email: "", phone: "" });
    setFormSuccess(false);
    setFormError(null);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError("Name and email are required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError("Please enter a valid email address");
      return;
    }

    try {
      setFormLoading(true);
      setFormError(null);

      // Send email via API route
      const response = await fetch("/api/send-lead-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          perkTitle: selectedPerk?.title,
          perkSlug: selectedPerk?.slug,
          recipientEmail: showPerkPageData?.email || "hello@venturenext.io",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send email");
      }

      setFormSuccess(true);
      setTimeout(() => {
        handleCloseLeadForm();
      }, 2000);
    } catch (err) {
      console.error("Email sending error:", err);
      setFormError(
        err instanceof Error
          ? err.message
          : "Failed to send email. Please try again."
      );
    } finally {
      setFormLoading(false);
    }
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
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="size-12 rounded-full bg-white p-1">
                    <Image
                      src={process.env.NEXT_PUBLIC_APP_URL + perk.banner.url}
                      alt={perk?.banner?.alternativeText ?? "Perk Image"}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-12 h-auto rounded-full"
                    />
                  </div>
                  <span
                    className="text-white font-semibold text-lg drop-shadow-md"
                    style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                  >
                    {perk.vendor_name}
                  </span>
                </div>
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
                <button
                  onClick={() => handlePerkClick(perk)}
                  className="w-full cursor-pointer rounded-lg bg-primary text-background-dark font-bold py-2.5 px-4 hover:bg-primary/90 transition-colors"
                >
                  {perk.redemption_method === "coupon_code"
                    ? "Get Code"
                    : perk.redemption_method === "affiliate_link"
                    ? "Claim Perk"
                    : perk.redemption_method === "lead_form"
                    ? "Get This Perk"
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

      {/* Lead Form Modal */}
      {showLeadForm && selectedPerk && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Get Access to {selectedPerk.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Fill out the form below to receive this perk
                  </p>
                </div>
                <button
                  onClick={handleCloseLeadForm}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {formSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Form Submitted Successfully!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    We'll be in touch soon with your perk details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {formError && (
                    <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                      {formError}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleFormChange("email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleFormChange("phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCloseLeadForm}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="cursor-pointer flex-1 px-4 py-2 bg-primary text-background-dark rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formLoading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
