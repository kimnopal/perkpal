import { Footer as FooterType } from "@/types";
import Image from "next/image";
import React from "react";

interface FooterResponse {
  data: FooterType;
}

const getFooterData = async (): Promise<FooterType> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/footer?populate[icon]=true&populate[FooterNav][populate][NavItem][populate]=*&populate[NavIcon][populate]=*`;
  const response = await fetch(url, {
    cache: "no-store",
  });

  const data: FooterResponse = await response.json();

  return data.data;
};

export default async function Footer() {
  const footer = await getFooterData();

  return (
    <footer className="bg-luxury-green text-white py-12 md:py-16 px-4 md:px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={process.env.NEXT_PUBLIC_APP_URL + footer?.icon?.url}
                alt={footer?.icon?.alternativeText ?? "Footer Image"}
                width={0}
                height={0}
                sizes="100vw"
                className="w-36 h-auto"
              />
            </div>
            <p className="text-white/80 pr-8">{footer?.description}</p>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footer?.FooterNav?.map((nav, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-white mb-4">
                  {nav.nav_header}
                </h3>
                <ul className="space-y-2">
                  {nav.NavItem?.map((item, index) => (
                    <li key={index}>
                      <a
                        className="text-white/80 hover:text-yellow-400 transition-colors"
                        href={item.link.href}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="my-8 flex justify-center items-center">
          <div className="flex items-center space-x-6">
            {footer?.NavIcon?.map((icon, index) => (
              <a
                key={index}
                className="text-white/80 hover:text-yellow-400 transition-colors"
                href={icon?.link.href}
              >
                <div
                  className="size-6"
                  dangerouslySetInnerHTML={{ __html: icon.icon }}
                />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 flex flex-col items-center justify-between">
          <p className="text-sm text-white/60 text-center mb-4">
            {footer?.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
