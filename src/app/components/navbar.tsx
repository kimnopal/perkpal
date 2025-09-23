import { Navbar as NavbarType } from "@/types";
import Link from "next/link";
import React from "react";

interface NavbarResponse {
  data: NavbarType;
}

async function getNavbarData(): Promise<NavbarType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/navbar?populate[NavItem][populate]=*`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  const data: NavbarResponse = await response.json();

  return data.data;
}

export default async function Navbar() {
  const navbar = await getNavbarData();
  return (
    <header className="bg-forest-green dark:bg-forest-green/90">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between whitespace-nowrap">
        <div className="flex items-center gap-3 text-white">
          <svg
            className="size-6 text-primary"
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
              fill="currentColor"
            ></path>
          </svg>
          <h2 className="text-xl font-bold">PerkPal</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          {navbar.NavItem?.map((item, index) => (
            <Link
              key={index}
              className="hover:text-primary transition-colors"
              href={item.link.href}
            >
              {item.title}
            </Link>
          ))}
          {/* <Link className="hover:text-primary transition-colors" href="/">
            Home
          </Link>
          <Link className="hover:text-primary transition-colors" href="/perks">
            Perks
          </Link>
          <Link
            className="hover:text-primary transition-colors"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="hover:text-primary transition-colors"
            href="/journals"
          >
            Journal
          </Link>
          <Link className="hover:text-primary transition-colors" href="/about">
            About Us
          </Link> */}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            className="px-6 py-3 rounded-lg text-base font-bold bg-primary text-background-dark hover:bg-primary/90 transition-transform transform"
            href="/submit-perk"
          >
            Submit a Perk
          </Link>
          {/* <Link
            className="px-6 py-3 rounded-lg text-base font-bold bg-white/20 text-white hover:bg-white/30 transition-colors"
            href="#latest-perks"
          >
            Sign In
          </Link> */}
        </div>
      </div>
    </header>
  );
}
