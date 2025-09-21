import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Join our network of leading brands and gain access to a thriving community of founders, freelancers, solopreneurs, and remote workers in Malaysia and Singapore.",
  openGraph: {
    title: "Partner With Us - PerkPal",
    description:
      "Join our network of leading brands and gain access to a thriving community of founders, freelancers, solopreneurs, and remote workers in Malaysia and Singapore.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Partner With Us - PerkPal",
    description:
      "Join our network of leading brands and gain access to a thriving community of founders, freelancers, solopreneurs, and remote workers in Malaysia and Singapore.",
  },
};

export default function PartnerWithUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
