"use client";

import React, { useState } from "react";
import { FAQ } from "@/types";

interface PartnerFAQSectionProps {
  title: string;
  subtitle: string | null;
  faqs: FAQ[];
}

export default function PartnerFAQSection({
  title,
  subtitle,
  faqs,
}: PartnerFAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (faqNumber: number) => {
    setOpenFaq(openFaq === faqNumber ? null : faqNumber);
  };

  return (
    <section className="py-16 sm:py-24 bg-dark-cream dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        <div className="mt-12 max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 dark:border-gray-700 pb-4"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <span className="material-symbols-outlined text-gray-900 dark:text-white">
                  {openFaq === index ? "remove" : "add"}
                </span>
              </button>
              {openFaq === index && (
                <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
