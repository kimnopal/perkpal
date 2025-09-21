import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Perks",
  description:
    "Exclusive deals for founders, freelancers, and remote workers in Malaysia & Singapore. Discover perks that help you grow your business and save money.",
  openGraph: {
    title: "Browse Perks - PerkPal",
    description:
      "Exclusive deals for founders, freelancers, and remote workers in Malaysia & Singapore. Discover perks that help you grow your business and save money.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Browse Perks - PerkPal",
    description:
      "Exclusive deals for founders, freelancers, and remote workers in Malaysia & Singapore. Discover perks that help you grow your business and save money.",
  },
};

export default function PerksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
