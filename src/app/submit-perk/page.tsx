import React from "react";
import { Metadata } from "next";
import PerkSubmissionForm from "../components/perk-submission-form";

export const metadata: Metadata = {
  title: "Submit Perk",
  description:
    "Submit your exclusive perk to our platform and reach a highly engaged community of founders, freelancers, solopreneurs, and remote workers.",
  openGraph: {
    title: "Submit Perk - PerkPal",
    description:
      "Submit your exclusive perk to our platform and reach a highly engaged community of founders, freelancers, solopreneurs, and remote workers.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Submit Perk - PerkPal",
    description:
      "Submit your exclusive perk to our platform and reach a highly engaged community of founders, freelancers, solopreneurs, and remote workers.",
  },
};

export default function SubmitPerkPage() {
  return <PerkSubmissionForm />;
}
