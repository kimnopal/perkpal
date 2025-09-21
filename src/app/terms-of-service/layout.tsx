import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service & Privacy Policy",
  description:
    "Read our terms and conditions and privacy policy. Learn how we protect your data and what you can expect when using PerkPal.",
  openGraph: {
    title: "Terms of Service & Privacy Policy - PerkPal",
    description:
      "Read our terms and conditions and privacy policy. Learn how we protect your data and what you can expect when using PerkPal.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service & Privacy Policy - PerkPal",
    description:
      "Read our terms and conditions and privacy policy. Learn how we protect your data and what you can expect when using PerkPal.",
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
