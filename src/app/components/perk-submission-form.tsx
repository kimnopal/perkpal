"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

interface PerkFormData {
  vendorLogo: File | null;
  vendorName: string;
  perkTitle: string;
  shortDescription: string;
  longDescription: string;
  redemptionMethod: "affiliate_link" | "coupon_code" | "form_submission";
  redemptionValue: string;
}

export default function PerkSubmissionForm() {
  const [formData, setFormData] = useState<PerkFormData>({
    vendorLogo: null,
    vendorName: "",
    perkTitle: "",
    shortDescription: "",
    longDescription: "",
    redemptionMethod: "affiliate_link",
    redemptionValue: "",
  });

  const [previewImage, setPreviewImage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        vendorLogo: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      // First, upload the logo if it exists
      let logoId = null;
      if (formData.vendorLogo) {
        const logoFormData = new FormData();
        logoFormData.append("files", formData.vendorLogo);

        const logoResponse = await fetch(`${apiUrl}/upload`, {
          method: "POST",
          body: logoFormData,
        });

        if (!logoResponse.ok) {
          const logoError = await logoResponse.text();
          toast.error(logoError);
          // console.error("Logo upload failed:", logoError);
          throw new Error("Failed to upload logo");
        }

        const logoResult = await logoResponse.json();
        logoId = logoResult[0]?.id;
        // console.log("Logo uploaded with ID:", logoId);
      }

      // Then submit the perk data
      const perkData = {
        data: {
          title: formData.perkTitle,
          short_description: formData.shortDescription,
          long_description: formData.longDescription,
          vendor_name: formData.vendorName,
          redemption_method: formData.redemptionMethod,
          redemption_value: formData.redemptionValue,
          featured: false,
          valid_from: new Date().toISOString(),
          valid_to: null,
          ...(logoId && { logo: logoId }), // Add logo ID if uploaded
        },
      };

      // console.log("Submitting perk data:", perkData);

      const response = await fetch(`${apiUrl}/perks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(perkData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();

      // Reset form on success
      setFormData({
        vendorLogo: null,
        vendorName: "",
        perkTitle: "",
        shortDescription: "",
        longDescription: "",
        redemptionMethod: "affiliate_link",
        redemptionValue: "",
      });
      setPreviewImage("");

      toast.success(
        "Perk submitted successfully! It will be reviewed before being published."
      );
    } catch (error) {
      console.error("Error submitting perk:", error);
      toast.error(
        `Failed to submit perk: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-background-dark dark:text-background-light mb-4">
          Submit a Perk
        </h1>
        <p className="text-lg text-background-dark/70 dark:text-background-light/70 max-w-3xl mx-auto">
          Help us grow our community by submitting exclusive perks for founders,
          freelancers, and remote workers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-background-light dark:bg-background-dark rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-background-dark dark:text-background-light mb-6">
            Vendor Information
          </h2>

          {/* Vendor Logo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-background-dark dark:text-background-light mb-2">
              Vendor Logo *
            </label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-background-dark/20 dark:border-background-light/20 border-dashed rounded-lg hover:border-primary transition-colors">
              <div className="space-y-1 text-center">
                {previewImage ? (
                  <div className="mb-4">
                    <img
                      src={previewImage}
                      alt="Logo preview"
                      className="mx-auto h-32 w-32 object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-background-dark/40 dark:text-background-light/40"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="flex text-sm text-background-dark/60 dark:text-background-light/60">
                  <label className="relative cursor-pointer bg-primary hover:bg-primary/90 text-background-dark font-medium py-2 px-4 rounded-lg transition-colors">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                  <p className="pl-1 py-2">or drag and drop</p>
                </div>
                <p className="text-xs text-background-dark/50 dark:text-background-light/50">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Vendor Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-background-dark dark:text-background-light mb-2">
              Vendor Name *
            </label>
            <input
              type="text"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-background-dark/20 dark:border-background-light/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-background-dark text-background-dark dark:text-background-light placeholder-background-dark/50 dark:placeholder-background-light/50"
              placeholder="Enter vendor/company name"
            />
          </div>
        </div>

        {/* Perk Details */}
        <div className="bg-background-light dark:bg-background-dark rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-background-dark dark:text-background-light mb-6">
            Perk Details
          </h2>

          {/* Perk Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-background-dark dark:text-background-light mb-2">
              Perk Title *
            </label>
            <input
              type="text"
              name="perkTitle"
              value={formData.perkTitle}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-background-dark/20 dark:border-background-light/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-background-dark text-background-dark dark:text-background-light placeholder-background-dark/50 dark:placeholder-background-light/50"
              placeholder="e.g., 50% off premium subscription"
            />
          </div>

          {/* Short Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-background-dark dark:text-background-light mb-2">
              Short Description *
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-background-dark/20 dark:border-background-light/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-background-dark text-background-dark dark:text-background-light placeholder-background-dark/50 dark:placeholder-background-light/50"
              placeholder="Brief description for the perk card (max 150 characters)"
              maxLength={150}
            />
            <p className="mt-1 text-xs text-background-dark/50 dark:text-background-light/50">
              {formData.shortDescription.length}/150 characters
            </p>
          </div>

          {/* Long Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-background-dark dark:text-background-light mb-2">
              Long Description *
            </label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-background-dark/20 dark:border-background-light/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-background-dark text-background-dark dark:text-background-light placeholder-background-dark/50 dark:placeholder-background-light/50"
              placeholder="Detailed description including terms, conditions, and how to use the perk"
            />
          </div>
        </div>

        {/* Redemption Details */}
        <div className="bg-background-light dark:bg-background-dark rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-background-dark dark:text-background-light mb-6">
            Redemption Details
          </h2>

          {/* Redemption Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-background-dark dark:text-background-light mb-3">
              Redemption Method *
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div
                className={`flex items-center p-3 rounded-lg border-2 hover:border-primary/50 transition-all cursor-pointer ${
                  formData.redemptionMethod === "affiliate_link"
                    ? "bg-primary/10 border-primary"
                    : "border-background-dark/20 dark:border-background-light/20"
                }`}
              >
                <input
                  id="affiliate_link"
                  name="redemptionMethod"
                  type="radio"
                  value="affiliate_link"
                  checked={formData.redemptionMethod === "affiliate_link"}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-primary"
                />
                <label
                  htmlFor="affiliate_link"
                  className="ml-3 block text-sm font-medium text-background-dark dark:text-background-light cursor-pointer flex-1"
                >
                  Affiliate Link
                  {/* <span className="block text-xs text-background-dark/60 dark:text-background-light/60 mt-1">
                    Redirect users through your affiliate or referral link
                  </span> */}
                </label>
              </div>
              <div
                className={`flex items-center p-3 rounded-lg border-2 hover:border-primary/50 transition-all cursor-pointer ${
                  formData.redemptionMethod === "coupon_code"
                    ? "bg-primary/10 border-primary"
                    : "border-background-dark/20 dark:border-background-light/20"
                }`}
              >
                <input
                  id="coupon_code"
                  name="redemptionMethod"
                  type="radio"
                  value="coupon_code"
                  checked={formData.redemptionMethod === "coupon_code"}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-primary"
                />
                <label
                  htmlFor="coupon_code"
                  className="ml-3 block text-sm font-medium text-background-dark dark:text-background-light cursor-pointer flex-1"
                >
                  Coupon Code
                  {/* <span className="block text-xs text-background-dark/60 dark:text-background-light/60 mt-1">
                    Provide a discount code for users to apply at checkout
                  </span> */}
                </label>
              </div>
              <div
                className={`flex items-center p-3 rounded-lg border-2 hover:border-primary/50 transition-all cursor-pointer ${
                  formData.redemptionMethod === "form_submission"
                    ? "bg-primary/10 border-primary"
                    : "border-background-dark/20 dark:border-background-light/20"
                }`}
              >
                <input
                  id="form_submission"
                  name="redemptionMethod"
                  type="radio"
                  value="form_submission"
                  checked={formData.redemptionMethod === "form_submission"}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-primary"
                />
                <label
                  htmlFor="form_submission"
                  className="ml-3 block text-sm font-medium text-background-dark dark:text-background-light cursor-pointer flex-1"
                >
                  Form Submission
                  {/* <span className="block text-xs text-background-dark/60 dark:text-background-light/60 mt-1">
                    Users submit a form or contact you directly to claim
                  </span> */}
                </label>
              </div>
            </div>
          </div>

          {/* Redemption Value */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-background-dark dark:text-background-light mb-2">
              Redemption Value *
            </label>
            <input
              type="text"
              name="redemptionValue"
              value={formData.redemptionValue}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-background-dark/20 dark:border-background-light/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-background-dark text-background-dark dark:text-background-light placeholder-background-dark/50 dark:placeholder-background-light/50"
              placeholder={
                formData.redemptionMethod === "affiliate_link"
                  ? "https://example.com/affiliate-link"
                  : formData.redemptionMethod === "coupon_code"
                  ? "PERKPAL50"
                  : "Contact email or form URL"
              }
            />
            <p className="mt-1 text-xs text-background-dark/50 dark:text-background-light/50">
              {formData.redemptionMethod === "affiliate_link" &&
                "Enter the affiliate or referral link"}
              {formData.redemptionMethod === "coupon_code" &&
                "Enter the coupon or promo code"}
              {formData.redemptionMethod === "form_submission" &&
                "Enter contact email or form submission URL"}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-background-dark font-bold rounded-lg transition-colors text-lg min-w-[200px]"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-background-dark"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </div>
            ) : (
              "Submit Perk"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
