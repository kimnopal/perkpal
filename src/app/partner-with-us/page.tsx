"use client";

import React, { useState } from "react";

export default function PartnerWithUsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (faqNumber: number) => {
    setOpenFaq(openFaq === faqNumber ? null : faqNumber);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setModalOpen(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAEGgZARn4PNYu1pf0h9IJX5djkUESbj4_j-nsZzRc2_24CL7QItt2YtXKgDuzQ3tZ-hbYcZW0x6mz-ROO2MzTrSXXctL14vYc1GnKxz6UasUwn9F_pysE6Ir8GcHST-eiwuM0TibrPO51RDTTeXENWxTcxtPh_WYDrdBfmVBJwfv4mYaqgcep6fBpBiSiU5aQYlSQ9dZCHHEEHpv75DujmmwzQUgIN5n98CEhDwWeUckDYRT88c9TCZoc8wp4F9-FHHJSx1HsybKz')",
            }}
          ></div>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter">
              Reach your ideal customers
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-200">
              Connect with a highly engaged community of founders, freelancers,
              solopreneurs, and remote workers in Malaysia and Singapore.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-8 bg-primary text-gray-900 font-bold text-base py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get started
            </button>
          </div>
        </section>

        {/* Why Partner Section */}
        <section className="py-16 sm:py-24 bg-background-light dark:bg-background-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Why partner with us?
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Join our network of leading brands and gain access to a thriving
                community of professionals.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center gap-4 bg-[#FFC0CB] dark:bg-pink-900/50 p-8 rounded-xl h-80 justify-center">
                <span className="material-symbols-outlined text-gray-900 dark:text-white text-5xl">
                  group
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Reach your ideal customers
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-300">
                  Connect with a highly engaged community of founders,
                  freelancers, solopreneurs, and remote workers in Malaysia and
                  Singapore.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-4 bg-[#FFFFE0] dark:bg-yellow-900/50 p-8 rounded-xl h-80 justify-center">
                <span className="material-symbols-outlined text-gray-900 dark:text-white text-5xl">
                  visibility
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Boost your brand visibility
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-300">
                  Increase your brand awareness and reach a wider audience
                  through our platform.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-4 bg-[#E6E6FA] dark:bg-purple-900/50 p-8 rounded-xl h-80 justify-center">
                <span className="material-symbols-outlined text-gray-900 dark:text-white text-5xl">
                  track_changes
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Generate high-quality leads
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-300">
                  Generate high-quality leads and drive conversions with
                  targeted promotions and exclusive offers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-black/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                How it works
              </h2>
            </div>
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute left-8 top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"
                ></div>
                <div className="relative flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-gray-900"
                      style={{ fontSize: "32px" }}
                    >
                      edit
                    </span>
                  </div>
                  <div className="pt-1.5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Submit your offer
                    </h3>
                    <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
                      Share your exclusive offer with our community.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-start gap-6 mt-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-gray-900"
                      style={{ fontSize: "32px" }}
                    >
                      search
                    </span>
                  </div>
                  <div className="pt-1.5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      We review and approve
                    </h3>
                    <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
                      Our team will review your offer and ensure it meets our
                      quality standards.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-start gap-6 mt-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-gray-900"
                      style={{ fontSize: "32px" }}
                    >
                      rocket_launch
                    </span>
                  </div>
                  <div className="pt-1.5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Go live and start generating leads
                    </h3>
                    <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
                      Your offer will be live on our platform, and you can start
                      generating leads.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24 bg-dark-cream dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="mt-12 max-w-3xl mx-auto space-y-4">
              <div className="border-b border-gray-300 dark:border-gray-700 pb-4">
                <button
                  onClick={() => toggleFaq(1)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    What kind of businesses can partner with you?
                  </h3>
                  <span className="material-symbols-outlined text-gray-900 dark:text-white">
                    {openFaq === 1 ? "remove" : "add"}
                  </span>
                </button>
                {openFaq === 1 && (
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                    We partner with businesses that offer valuable products or
                    services to founders, freelancers, solopreneurs, and remote
                    workers in Malaysia and Singapore. This includes SaaS
                    companies, co-working spaces, professional services, and
                    more.
                  </p>
                )}
              </div>
              <div className="border-b border-gray-300 dark:border-gray-700 pb-4">
                <button
                  onClick={() => toggleFaq(2)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Is there a cost to list our perks?
                  </h3>
                  <span className="material-symbols-outlined text-gray-900 dark:text-white">
                    {openFaq === 2 ? "remove" : "add"}
                  </span>
                </button>
                {openFaq === 2 && (
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                    Listing with us is currently free. We believe in creating a
                    mutually beneficial partnership where you get exposure to
                    our community, and our members get access to great deals.
                  </p>
                )}
              </div>
              <div className="border-b border-gray-300 dark:border-gray-700 pb-4">
                <button
                  onClick={() => toggleFaq(3)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    What kind of perks perform best?
                  </h3>
                  <span className="material-symbols-outlined text-gray-900 dark:text-white">
                    {openFaq === 3 ? "remove" : "add"}
                  </span>
                </button>
                {openFaq === 3 && (
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                    Our members appreciate significant discounts, extended free
                    trials, and exclusive access to premium features. The more
                    unique and valuable your offer, the better it will perform.
                  </p>
                )}
              </div>
              <div className="border-b border-gray-300 dark:border-gray-700 pb-4">
                <button
                  onClick={() => toggleFaq(4)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    How do I track the performance of my offer?
                  </h3>
                  <span className="material-symbols-outlined text-gray-900 dark:text-white">
                    {openFaq === 4 ? "remove" : "add"}
                  </span>
                </button>
                {openFaq === 4 && (
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                    We provide basic analytics to track clicks and views on your
                    offer. For more detailed tracking, we recommend using unique
                    coupon codes or referral links.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-black/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Join our network of leading brands and gain access to a thriving
              community of professionals.
            </p>
            <div className="mt-8">
              <button
                onClick={() => setModalOpen(true)}
                className="bg-primary text-gray-900 font-bold text-base py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
              >
                Submit your offer
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onKeyDown={handleKeyDown}
        >
          <div className="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500/75 transition-opacity"
              aria-hidden="true"
              onClick={handleModalClose}
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              ​
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-background-dark rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-background-dark px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                      id="modal-title"
                    >
                      Become a Partner
                    </h3>
                    <div className="mt-4">
                      <form action="#" method="POST">
                        <div className="space-y-4">
                          <div>
                            <label
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                              htmlFor="name"
                            >
                              Name
                            </label>
                            <input
                              autoComplete="name"
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                              id="name"
                              name="name"
                              type="text"
                            />
                          </div>
                          <div>
                            <label
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                              htmlFor="company"
                            >
                              Company Name
                            </label>
                            <input
                              autoComplete="organization"
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                              id="company"
                              name="company"
                              type="text"
                            />
                          </div>
                          <div>
                            <label
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <input
                              autoComplete="email"
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                              id="email"
                              name="email"
                              type="email"
                              defaultValue="your-email@example.com?subject=Become a Partner"
                            />
                          </div>
                          <div>
                            <label
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                              htmlFor="details"
                            >
                              Additional Details
                            </label>
                            <textarea
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                              id="details"
                              name="details"
                              rows={4}
                            ></textarea>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-gray-900 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                  type="button"
                >
                  Submit
                </button>
                <button
                  onClick={handleModalClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
