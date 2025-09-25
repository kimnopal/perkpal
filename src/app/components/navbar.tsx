"use client";

import { Navbar as NavbarType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

interface NavbarResponse {
  data: NavbarType;
}

async function getNavbarData(): Promise<NavbarType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/navbar?populate[NavItem][populate]=*&populate[Logo][populate]=*&populate[CTAButton][populate]=*`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  const data: NavbarResponse = await response.json();

  return data.data;
}

export default function Navbar() {
  const [navbar, setNavbar] = useState<NavbarType | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    getNavbarData().then(setNavbar);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll on component unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveLink = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  if (!navbar) return null;
  return (
    <header className="bg-forest-green dark:bg-forest-green/90">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between whitespace-nowrap">
        <div className="flex items-center gap-3 text-white">
          <Link href={navbar.Logo.link.href}>
            <Image
              src={process.env.NEXT_PUBLIC_APP_URL + navbar.Logo.logo.url}
              alt={navbar.Logo.logo.alternativeText}
              width={0}
              height={0}
              sizes="100vw"
              className="w-32 h-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          {navbar.NavItem?.map((item, index) => {
            const isActive = isActiveLink(item.link.href);
            return (
              <Link
                key={index}
                className={`transition-colors ${
                  isActive ? "text-primary font-semibold" : "hover:text-primary"
                }`}
                href={item.link.href}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col items-center justify-center w-6 h-6 text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
        {/* Desktop Submit Button */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            className="px-6 py-3 rounded-lg text-base font-bold bg-primary text-background-dark hover:bg-primary/90 transition-transform transform"
            href={navbar.CTAButton.link.href}
          >
            {navbar.CTAButton.title}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-forest-green z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
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
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-primary transition-colors"
              aria-label="Close mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 py-6">
            <div className="space-y-1">
              {navbar.NavItem?.map((item, index) => {
                const isActive = isActiveLink(item.link.href);
                return (
                  <Link
                    key={index}
                    href={item.link.href}
                    className={`block px-6 py-3 transition-colors border-l-4 ${
                      isActive
                        ? "text-primary bg-white/10 border-primary font-semibold"
                        : "text-white hover:text-primary hover:bg-white/10 border-transparent hover:border-primary"
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Mobile Submit Button */}
          <div className="p-6 border-t border-white/20">
            <Link
              href={navbar.CTAButton.link.href}
              className="block w-full px-6 py-3 rounded-lg text-center font-bold bg-primary text-background-dark hover:bg-primary/90 transition-colors"
              onClick={toggleMobileMenu}
            >
              {navbar.CTAButton.title}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
