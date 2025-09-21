import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Toaster } from "react-hot-toast";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - PerkPal",
    default: "PerkPal - Supercharge Your Hustle",
  },
  description:
    "Exclusive perks for Malaysia & Singapore's top founders, freelancers, solopreneurs, and remote workers. Save big on tools that grow your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={workSans.className}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <link
          crossOrigin=""
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <link href="data:image/x-icon;base64," rel="icon" type="image/x-icon" />
      </head>
      <body className="bg-white dark:bg-background-dark font-display text-background-dark dark:text-background-light">
        <Toaster position="top-right" />

        <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden">
          {/* Header */}
          <Navbar />

          {/* Main Content */}
          <main className="">{children}</main>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
