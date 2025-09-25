"use client";

import { FAQ } from "@/types";
import React, { useState } from "react";

type FAQSectionProps = {
  faqs: FAQ[];
};

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (faqNumber: number) => {
    setOpenFaq(openFaq === faqNumber ? null : faqNumber);
  };

  return (
    <section className="py-12 md:py-20 bg-perk-yellow/50 dark:bg-yellow-400/10 px-4 md:px-10 lg:px-20 xl:px-40">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-background-dark dark:text-background-light">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-background-dark/80 dark:text-background-light/80 max-w-3xl mx-auto">
            Have questions? We&apos;ve got answers. If you can&apos;t find what
            you&apos;re looking for, feel free to contact us.
          </p>
        </div>
        <div className="space-y-4">
          {/* FAQ Item 1 */}
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-luxury-green/20 rounded-lg shadow-md"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left px-6 py-4"
              >
                <h3 className="text-lg font-semibold text-background-dark dark:text-background-light">
                  {faq.question}
                </h3>
                <span
                  className={`material-symbols-outlined text-luxury-green dark:text-yellow-400 transition-transform ${
                    openFaq === index ? "rotate-45" : ""
                  }`}
                >
                  add
                </span>
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4 text-background-dark/80 dark:text-background-light/80">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
