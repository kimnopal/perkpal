import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Stay up-to-date with the latest news, tips, and insights for founders, freelancers, solopreneurs, and remote workers in Malaysia and Singapore.",
  openGraph: {
    title: "Journal - PerkPal",
    description:
      "Stay up-to-date with the latest news, tips, and insights for founders, freelancers, solopreneurs, and remote workers in Malaysia and Singapore.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Journal - PerkPal",
    description:
      "Stay up-to-date with the latest news, tips, and insights for founders, freelancers, solopreneurs, and remote workers in Malaysia and Singapore.",
  },
};

export default function JournalsPage() {
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
          <div className="mb-20">
            <div className="group flex flex-col md:flex-row overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-2xl dark:bg-background-dark/50 dark:shadow-primary/10 dark:hover:shadow-primary/20 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="md:w-3/5">
                <div className="aspect-w-16 aspect-h-9 w-full h-full">
                  <img
                    alt="Featured Article"
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-wXf5P7b-j5K3e-rYc2B6e_A7gQ0_B7b-mQdZz-tXyK_Xw-rA8pZ0mN6aJ_KzQ3qE1vR9sW_X-cZgP6fNl-wK_JpT0qS-gHjL-oZpX-iR0kP-qL-eT_YpW-lA1sT8gYjJ-bI1sE0gZ9hK_V-bQ-sC1bA3gZ-eXw-lD9kH-bX_C-eR_B-oP_N-w"
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
                  The Ultimate Guide to Starting a Business in Southeast Asia
                </h3>
                <div className="mb-5 flex items-center text-base text-background-dark/60 dark:text-background-light/60">
                  <span>Nov 1, 2023</span>
                  <span className="mx-2">·</span>
                  <span>12 min read</span>
                </div>
                <p className="mb-8 flex-1 text-lg text-background-dark/80 dark:text-background-light/80">
                  A comprehensive guide for aspiring entrepreneurs looking to
                  navigate the dynamic business landscape of Malaysia and
                  Singapore.
                </p>
                <a
                  className="font-bold text-forest-green transition-colors hover:text-forest-green/80 text-lg"
                  href="#"
                >
                  Read More
                  <span className="material-symbols-outlined ml-1 inline-block align-middle text-xl">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="mb-8 flex justify-center">
            <div className="flex flex-wrap space-x-2 rounded-full bg-white p-1 shadow-inner dark:bg-background-dark/50">
              <a
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-forest-green"
                href="#"
              >
                All
              </a>
              <a
                className="rounded-full px-4 py-2 text-sm font-semibold text-background-dark/60 transition-colors hover:bg-primary/10 dark:text-background-light/60 dark:hover:bg-primary/20"
                href="#"
              >
                Productivity
              </a>
              <a
                className="rounded-full px-4 py-2 text-sm font-semibold text-background-dark/60 transition-colors hover:bg-primary/10 dark:text-background-light/60 dark:hover:bg-primary/20"
                href="#"
              >
                Marketing
              </a>
              <a
                className="rounded-full px-4 py-2 text-sm font-semibold text-background-dark/60 transition-colors hover:bg-primary/10 dark:text-background-light/60 dark:hover:bg-primary/20"
                href="#"
              >
                Finance
              </a>
              <a
                className="rounded-full px-4 py-2 text-sm font-semibold text-background-dark/60 transition-colors hover:bg-primary/10 dark:text-background-light/60 dark:hover:bg-primary/20"
                href="#"
              >
                Remote Work
              </a>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-background-dark/50 dark:shadow-primary/10 dark:hover:shadow-primary/20">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBIlfyvOTUdGOxF6DSq_TBFOuVIomQqeQbODvg6wWQ7zw7j_IedUsHisSnfTyY-zc33OheWCEpkfCz_qiCv2eHXiKrkCPJVJy1m7go3Bc9GFO6blwz-_P4Wb-UQoV1JSYVXuI8wE74S4Wn3DGN2gLO-J1X-qGSsuRY4stNyzBNw7XoO5ICAS0GVzQlAvr9zh1gZ9hBOAaroZ4y1A1AdZ_mgNwNkRz-JEAkfZ-xOa-fjg2ZfQCl6x92OFDaQ4EwcSNOmxd6DxJ9b6C9"
                  />
                </div>
                <div className="absolute top-4 left-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-forest-green backdrop-blur-sm">
                  Productivity
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold leading-snug text-background-dark dark:text-background-light">
                  Boost Your Productivity with These Top Tools
                </h3>
                <div className="mb-3 flex items-center text-sm text-background-dark/60 dark:text-background-light/60">
                  <span>Oct 26, 2023</span>
                  <span className="mx-2">·</span>
                  <span>5 min read</span>
                </div>
                <p className="mb-4 flex-1 text-background-dark/80 dark:text-background-light/80">
                  Explore the best productivity tools to enhance your workflow
                  and achieve more in less time.
                </p>
                <a
                  className="font-bold text-forest-green transition-colors hover:text-forest-green/80"
                  href="#"
                >
                  Read More
                  <span className="material-symbols-outlined ml-1 inline-block align-middle text-base">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-background-dark/50 dark:shadow-primary/10 dark:hover:shadow-primary/20">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC0DoU72Eme_VWu1umk-kva6thd8TfpBvb5JVnh5OyxbNOg-5zCByzM0doa0yeDu30aKS0Zom9bO9s4UQaA7jtv-TC7yCnrKohNqKUaUBci70m5GvqhN5-8GW585JdsoWGpPmmR1-pEWp4Y1N-gnRRsYztpAXMG-fXqG-fLw-sYxOYh9K1ATSn-IPkpS4Twq0X4bazd8lhe6-uqveNEDCLBSe-E9na054AJ3iEmXZwWcJCkV6Cxe8z9KqZJDD2l5wlnwoFJGmZHqXN"
                  />
                </div>
                <div className="absolute top-4 left-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-forest-green backdrop-blur-sm">
                  Marketing
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold leading-snug text-background-dark dark:text-background-light">
                  Mastering Social Media Marketing: A Comprehensive Guide
                </h3>
                <div className="mb-3 flex items-center text-sm text-background-dark/60 dark:text-background-light/60">
                  <span>Oct 25, 2023</span>
                  <span className="mx-2">·</span>
                  <span>8 min read</span>
                </div>
                <p className="mb-4 flex-1 text-background-dark/80 dark:text-background-light/80">
                  Learn effective social media marketing techniques to grow your
                  brand and engage your audience.
                </p>
                <a
                  className="font-bold text-forest-green transition-colors hover:text-forest-green/80"
                  href="#"
                >
                  Read More
                  <span className="material-symbols-outlined ml-1 inline-block align-middle text-base">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-background-dark/50 dark:shadow-primary/10 dark:hover:shadow-primary/20">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvdJwQOXvhC0_FP1kZ906MAkqHuJ_EaGRUQQzuHZH39foo-7mMJoqwUwhOYN_s-uyuDKTPhhXVz0hw1j1ubI02JaXpbZ5g0_YGiEJSmTD42g6f5GvUyPQUYP-ttakGJH_FLQcxngvEFxTlr58bFfN4M4ibDztAwK_AXXAcVMGxntbg1sXU3elpmVeX7xPQxJkP2ZFIY4-Ifvea5RXUIpNIJOap89NZ4J8T3aGGAtowqJP92SwS4eApwyDv1XoHj_9IdCV0SgO6gYIr"
                  />
                </div>
                <div className="absolute top-4 left-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-forest-green backdrop-blur-sm">
                  Finance
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold leading-snug text-background-dark dark:text-background-light">
                  Financial Planning for Freelancers: Tips and Strategies
                </h3>
                <div className="mb-3 flex items-center text-sm text-background-dark/60 dark:text-background-light/60">
                  <span>Oct 24, 2023</span>
                  <span className="mx-2">·</span>
                  <span>6 min read</span>
                </div>
                <p className="mb-4 flex-1 text-background-dark/80 dark:text-background-light/80">
                  Discover essential financial planning tips and strategies
                  tailored for freelancers.
                </p>
                <a
                  className="font-bold text-forest-green transition-colors hover:text-forest-green/80"
                  href="#"
                >
                  Read More
                  <span className="material-symbols-outlined ml-1 inline-block align-middle text-base">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-background-dark/50 dark:shadow-primary/10 dark:hover:shadow-primary/20">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOfiwGVP9jerTyF_ndmTUOpe1pTDWbXF-yAgS1Tn9S0Ad1Ps63lOJu1sLHhrwK9cn3JuKIhxNEXd0C0oRPhwVj17Twhu2Tk8W3bdGKyOgfv4lgS5cHuyDHG1Jl_v0lskaNxT8chbDPm2zVry3lpffTLNMIpWUbURf89fEqVKPGGjPoTi650trnCIajrrn_-pJgoL25H2kohPsibMm-c9QO354q9HuMc6DK89SQKe7s-sjAPpKgR6tPTgw1ChI_eZN_X2Ws5AWGLTYs"
                  />
                </div>
                <div className="absolute top-4 left-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-forest-green backdrop-blur-sm">
                  Remote Work
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold leading-snug text-background-dark dark:text-background-light">
                  The Ultimate Guide to Remote Work Success
                </h3>
                <div className="mb-3 flex items-center text-sm text-background-dark/60 dark:text-background-light/60">
                  <span>Oct 23, 2023</span>
                  <span className="mx-2">·</span>
                  <span>7 min read</span>
                </div>
                <p className="mb-4 flex-1 text-background-dark/80 dark:text-background-light/80">
                  Unlock the secrets to remote work success with our
                  comprehensive guide.
                </p>
                <a
                  className="font-bold text-forest-green transition-colors hover:text-forest-green/80"
                  href="#"
                >
                  Read More
                  <span className="material-symbols-outlined ml-1 inline-block align-middle text-base">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-background-dark/50 dark:shadow-primary/10 dark:hover:shadow-primary/20">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2KOq7IYtgEM-zGJNG8vhrBD0bYeAxetCaCmYIXch8V8wKWNuO5DJnBrcy2W1eaHg8gAJok_AI2JHp_jtR73HhaMjlWEFJiB2SCDcFL_EKJX4IdQ5l7SA2JR8SWfvK_1_BEJEFbzD69j0f8QY8vz_RihKJDbqtfprw-ctQvflckYR3K0R45U6Bqmu_ZiT8xzsnt40hma6LmoXaBx9ul0SFT_4EeaQ6hHQ0aU_Z_RdQIHb7ueGU90dFSXyhMmQTEUJoBJHF0ipdksgK"
                  />
                </div>
                <div className="absolute top-4 left-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-forest-green backdrop-blur-sm">
                  Productivity
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold leading-snug text-background-dark dark:text-background-light">
                  Top Productivity Hacks for Busy Professionals
                </h3>
                <div className="mb-3 flex items-center text-sm text-background-dark/60 dark:text-background-light/60">
                  <span>Oct 22, 2023</span>
                  <span className="mx-2">·</span>
                  <span>4 min read</span>
                </div>
                <p className="mb-4 flex-1 text-background-dark/80 dark:text-background-light/80">
                  Implement these productivity hacks to optimize your time and
                  boost your efficiency.
                </p>
                <a
                  className="font-bold text-forest-green transition-colors hover:text-forest-green/80"
                  href="#"
                >
                  Read More
                  <span className="material-symbols-outlined ml-1 inline-block align-middle text-base">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-background-dark/50 dark:shadow-primary/10 dark:hover:shadow-primary/20">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsfEZwKHBl00h1bWje6jOkDc7BACVkt76lBTEaubQhhVXpB0_cpu_MKCaUG_t9dAZqnY9a3PnueX_GonaBV8MpAQw14--SWdX1DoodLRkE9nGp-kBk8eq1t1faSYd272M7frOHYo0G8M7_QGySBtAJ1fiKxwLfAzQKFujKnJPaQpsr1aH7jrj-PGdbkO6XqD6wY2XwQUZKfoG-xcWGarR-hfxritLALDGoddT7QfDpB_gZcCb9526u1YlfLES_wNQ10F6DylIVWSYX"
                  />
                </div>
                <div className="absolute top-4 left-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-forest-green backdrop-blur-sm">
                  Marketing
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold leading-snug text-background-dark dark:text-background-light">
                  Maximizing Your Online Presence: A Marketing Blueprint
                </h3>
                <div className="mb-3 flex items-center text-sm text-background-dark/60 dark:text-background-light/60">
                  <span>Oct 21, 2023</span>
                  <span className="mx-2">·</span>
                  <span>9 min read</span>
                </div>
                <p className="mb-4 flex-1 text-background-dark/80 dark:text-background-light/80">
                  Develop a strong online presence with our marketing blueprint
                  for maximum impact.
                </p>
                <a
                  className="font-bold text-forest-green transition-colors hover:text-forest-green/80"
                  href="#"
                >
                  Read More
                  <span className="material-symbols-outlined ml-1 inline-block align-middle text-base">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-background-dark/50 dark:shadow-primary/10 dark:hover:shadow-primary/20">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBIlfyvOTUdGOxF6DSq_TBFOuVIomQqeQbODvg6wWQ7zw7j_IedUsHisSnfTyY-zc33OheWCEpkfCz_qiCv2eHXiKrkCPJVJy1m7go3Bc9GFO6blwz-_P4Wb-UQoV1JSYVXuI8wE74S4Wn3DGN2gLO-J1X-qGSsuRY4stNyzBNw7XoO5ICAS0GVzQlAvr9zh1gZ9hBOAaroZ4y1A1AdZ_mgNwNkRz-JEAkfZ-xOa-fjg2ZfQCl6x92OFDaQ4EwcSNOmxd6DxJ9b6C9"
                  />
                </div>
                <div className="absolute top-4 left-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-forest-green backdrop-blur-sm">
                  Productivity
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold leading-snug text-background-dark dark:text-background-light">
                  Boost Your Productivity with These Top Tools
                </h3>
                <div className="mb-3 flex items-center text-sm text-background-dark/60 dark:text-background-light/60">
                  <span>Oct 26, 2023</span>
                  <span className="mx-2">·</span>
                  <span>5 min read</span>
                </div>
                <p className="mb-4 flex-1 text-background-dark/80 dark:text-background-light/80">
                  Explore the best productivity tools to enhance your workflow
                  and achieve more in less time.
                </p>
                <a
                  className="font-bold text-forest-green transition-colors hover:text-forest-green/80"
                  href="#"
                >
                  Read More
                  <span className="material-symbols-outlined ml-1 inline-block align-middle text-base">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-background-dark/50 dark:shadow-primary/10 dark:hover:shadow-primary/20">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC0DoU72Eme_VWu1umk-kva6thd8TfpBvb5JVnh5OyxbNOg-5zCByzM0doa0yeDu30aKS0Zom9bO9s4UQaA7jtv-TC7yCnrKohNqKUaUBci70m5GvqhN5-8GW585JdsoWGpPmmR1-pEWp4Y1N-gnRRsYztpAXMG-fXqG-fLw-sYxOYh9K1ATSn-IPkpS4Twq0X4bazd8lhe6-uqveNEDCLBSe-E9na054AJ3iEmXZwWcJCkV6Cxe8z9KqZJDD2l5wlnwoFJGmZHqXN"
                  />
                </div>
                <div className="absolute top-4 left-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-forest-green backdrop-blur-sm">
                  Marketing
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold leading-snug text-background-dark dark:text-background-light">
                  Mastering Social Media Marketing: A Comprehensive Guide
                </h3>
                <div className="mb-3 flex items-center text-sm text-background-dark/60 dark:text-background-light/60">
                  <span>Oct 25, 2023</span>
                  <span className="mx-2">·</span>
                  <span>8 min read</span>
                </div>
                <p className="mb-4 flex-1 text-background-dark/80 dark:text-background-light/80">
                  Learn effective social media marketing techniques to grow your
                  brand and engage your audience.
                </p>
                <a
                  className="font-bold text-forest-green transition-colors hover:text-forest-green/80"
                  href="#"
                >
                  Read More
                  <span className="material-symbols-outlined ml-1 inline-block align-middle text-base">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-background-dark/50 dark:shadow-primary/10 dark:hover:shadow-primary/20">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvdJwQOXvhC0_FP1kZ906MAkqHuJ_EaGRUQQzuHZH39foo-7mMJoqwUwhOYN_s-uyuDKTPhhXVz0hw1j1ubI02JaXpbZ5g0_YGiEJSmTD42g6f5GvUyPQUYP-ttakGJH_FLQcxngvEFxTlr58bFfN4M4ibDztAwK_AXXAcVMGxntbg1sXU3elpmVeX7xPQxJkP2ZFIY4-Ifvea5RXUIpNIJOap89NZ4J8T3aGGAtowqJP92SwS4eApwyDv1XoHj_9IdCV0SgO6gYIr"
                  />
                </div>
                <div className="absolute top-4 left-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-forest-green backdrop-blur-sm">
                  Finance
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold leading-snug text-background-dark dark:text-background-light">
                  Financial Planning for Freelancers: Tips and Strategies
                </h3>
                <div className="mb-3 flex items-center text-sm text-background-dark/60 dark:text-background-light/60">
                  <span>Oct 24, 2023</span>
                  <span className="mx-2">·</span>
                  <span>6 min read</span>
                </div>
                <p className="mb-4 flex-1 text-background-dark/80 dark:text-background-light/80">
                  Discover essential financial planning tips and strategies
                  tailored for freelancers.
                </p>
                <a
                  className="font-bold text-forest-green transition-colors hover:text-forest-green/80"
                  href="#"
                >
                  Read More
                  <span className="material-symbols-outlined ml-1 inline-block align-middle text-base">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-background-dark/50 dark:shadow-primary/10 dark:hover:shadow-primary/20">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOfiwGVP9jerTyF_ndmTUOpe1pTDWbXF-yAgS1Tn9S0Ad1Ps63lOJu1sLHhrwK9cn3JuKIhxNEXd0C0oRPhwVj17Twhu2Tk8W3bdGKyOgfv4lgS5cHuyDHG1Jl_v0lskaNxT8chbDPm2zVry3lpffTLNMIpWUbURf89fEqVKPGGjPoTi650trnCIajrrn_-pJgoL25H2kohPsibMm-c9QO354q9HuMc6DK89SQKe7s-sjAPpKgR6tPTgw1ChI_eZN_X2Ws5AWGLTYs"
                  />
                </div>
                <div className="absolute top-4 left-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-forest-green backdrop-blur-sm">
                  Remote Work
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold leading-snug text-background-dark dark:text-background-light">
                  The Ultimate Guide to Remote Work Success
                </h3>
                <div className="mb-3 flex items-center text-sm text-background-dark/60 dark:text-background-light/60">
                  <span>Oct 23, 2023</span>
                  <span className="mx-2">·</span>
                  <span>7 min read</span>
                </div>
                <p className="mb-4 flex-1 text-background-dark/80 dark:text-background-light/80">
                  Unlock the secrets to remote work success with our
                  comprehensive guide.
                </p>
                <a
                  className="font-bold text-forest-green transition-colors hover:text-forest-green/80"
                  href="#"
                >
                  Read More
                  <span className="material-symbols-outlined ml-1 inline-block align-middle text-base">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-background-dark/50 dark:shadow-primary/10 dark:hover:shadow-primary/20">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2KOq7IYtgEM-zGJNG8vhrBD0bYeAxetCaCmYIXch8V8wKWNuO5DJnBrcy2W1eaHg8gAJok_AI2JHp_jtR73HhaMjlWEFJiB2SCDcFL_EKJX4IdQ5l7SA2JR8SWfvK_1_BEJEFbzD69j0f8QY8vz_RihKJDbqtfprw-ctQvflckYR3K0R45U6Bqmu_ZiT8xzsnt40hma6LmoXaBx9ul0SFT_4EeaQ6hHQ0aU_Z_RdQIHb7ueGU90dFSXyhMmQTEUJoBJHF0ipdksgK"
                  />
                </div>
                <div className="absolute top-4 left-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-forest-green backdrop-blur-sm">
                  Productivity
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold leading-snug text-background-dark dark:text-background-light">
                  Top Productivity Hacks for Busy Professionals
                </h3>
                <div className="mb-3 flex items-center text-sm text-background-dark/60 dark:text-background-light/60">
                  <span>Oct 22, 2023</span>
                  <span className="mx-2">·</span>
                  <span>4 min read</span>
                </div>
                <p className="mb-4 flex-1 text-background-dark/80 dark:text-background-light/80">
                  Implement these productivity hacks to optimize your time and
                  boost your efficiency.
                </p>
                <a
                  className="font-bold text-forest-green transition-colors hover:text-forest-green/80"
                  href="#"
                >
                  Read More
                  <span className="material-symbols-outlined ml-1 inline-block align-middle text-base">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
            <div className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-background-dark/50 dark:shadow-primary/10 dark:hover:shadow-primary/20">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsfEZwKHBl00h1bWje6jOkDc7BACVkt76lBTEaubQhhVXpB0_cpu_MKCaUG_t9dAZqnY9a3PnueX_GonaBV8MpAQw14--SWdX1DoodLRkE9nGp-kBk8eq1t1faSYd272M7frOHYo0G8M7_QGySBtAJ1fiKxwLfAzQKFujKnJPaQpsr1aH7jrj-PGdbkO6XqD6wY2XwQUZKfoG-xcWGarR-hfxritLALDGoddT7QfDpB_gZcCb9526u1YlfLES_wNQ10F6DylIVWSYX"
                  />
                </div>
                <div className="absolute top-4 left-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-forest-green backdrop-blur-sm">
                  Marketing
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold leading-snug text-background-dark dark:text-background-light">
                  Maximizing Your Online Presence: A Marketing Blueprint
                </h3>
                <div className="mb-3 flex items-center text-sm text-background-dark/60 dark:text-background-light/60">
                  <span>Oct 21, 2023</span>
                  <span className="mx-2">·</span>
                  <span>9 min read</span>
                </div>
                <p className="mb-4 flex-1 text-background-dark/80 dark:text-background-light/80">
                  Develop a strong online presence with our marketing blueprint
                  for maximum impact.
                </p>
                <a
                  className="font-bold text-forest-green transition-colors hover:text-forest-green/80"
                  href="#"
                >
                  Read More
                  <span className="material-symbols-outlined ml-1 inline-block align-middle text-base">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full text-background-dark/60 transition-colors hover:bg-primary/10 dark:text-background-light/60 dark:hover:bg-primary/20"
                href="#"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </a>
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-forest-green"
                href="#"
              >
                1
              </a>
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-background-dark/60 transition-colors hover:bg-primary/10 dark:text-background-light/60 dark:hover:bg-primary/20"
                href="#"
              >
                2
              </a>
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-background-dark/60 transition-colors hover:bg-primary/10 dark:text-background-light/60 dark:hover:bg-primary/20"
                href="#"
              >
                3
              </a>
              <span className="text-background-dark/60 dark:text-background-light/60">
                ...
              </span>
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-background-dark/60 transition-colors hover:bg-primary/10 dark:text-background-light/60 dark:hover:bg-primary/20"
                href="#"
              >
                8
              </a>
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full text-background-dark/60 transition-colors hover:bg-primary/10 dark:text-background-light/60 dark:hover:bg-primary/20"
                href="#"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </a>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
