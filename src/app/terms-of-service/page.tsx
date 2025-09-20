"use client";

import React, { useState } from "react";

export default function TermsOfServicePage() {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("privacy");

  const showTab = (tabName: "terms" | "privacy") => {
    setActiveTab(tabName);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
        Terms and Conditions / Privacy Policy
      </h1>

      {/* Tab Navigation */}
      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg flex space-x-2 mb-10 max-w-lg mx-auto">
        <button
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors duration-300 ${
            activeTab === "terms"
              ? "bg-accent-yellow text-gray-800 dark:text-gray-900"
              : "text-gray-600 dark:text-gray-300"
          }`}
          onClick={() => showTab("terms")}
        >
          Terms &amp; Conditions
        </button>
        <button
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors duration-300 ${
            activeTab === "privacy"
              ? "bg-accent-yellow text-gray-800 dark:text-gray-900"
              : "text-gray-600 dark:text-gray-300"
          }`}
          onClick={() => showTab("privacy")}
        >
          Privacy Policy
        </button>
      </div>

      {/* Content Container */}
      <div className="bg-white dark:bg-gray-800/50 p-10 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Terms and Conditions Tab */}
        {activeTab === "terms" && (
          <div className="prose dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-6 prose-h2:text-primary prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-800 dark:prose-h3:text-gray-200 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4 prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-li:mb-2 prose-li:leading-relaxed">
            <h2 className="border-b-2 border-primary pb-3">
              Terms and Conditions
            </h2>
            <p>
              Welcome to our website. If you continue to browse and use this
              website, you are agreeing to comply with and be bound by the
              following terms and conditions of use, which together with our
              privacy policy govern our relationship with you in relation to
              this website. If you disagree with any part of these terms and
              conditions, please do not use our website.
            </p>

            <h3 className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg">
              1. Introduction
            </h3>
            <p>
              The term &apos;us&apos; or &apos;we&apos; refers to the owner of
              the website. The term &apos;you&apos; refers to the user or viewer
              of our website. The use of this website is subject to the
              following terms of use:
            </p>
            <ul>
              <li>
                The content of the pages of this website is for your general
                information and use only. It is subject to change without
                notice.
              </li>
              <li>
                This website uses cookies to monitor browsing preferences. If
                you do allow cookies to be used, personal information may be
                stored by us for use by third parties.
              </li>
              <li>
                Neither we nor any third parties provide any warranty or
                guarantee as to the accuracy, timeliness, performance,
                completeness or suitability of the information and materials
                found or offered on this website for any particular purpose. You
                acknowledge that such information and materials may contain
                inaccuracies or errors and we expressly exclude liability for
                any such inaccuracies or errors to the fullest extent permitted
                by law.
              </li>
            </ul>

            <h3 className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg">
              2. User Obligations
            </h3>
            <p>
              Your use of any information or materials on this website is
              entirely at your own risk, for which we shall not be liable. It
              shall be your own responsibility to ensure that any products,
              services or information available through this website meet your
              specific requirements.
            </p>

            <h3 className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg">
              3. Intellectual Property
            </h3>
            <p>
              This website contains material which is owned by or licensed to
              us. This material includes, but is not limited to, the design,
              layout, look, appearance and graphics. Reproduction is prohibited
              other than in accordance with the copyright notice, which forms
              part of these terms and conditions.
            </p>

            <h3 className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg">
              4. Limitation of Liability
            </h3>
            <p>
              In no event will we be liable for any loss or damage including
              without limitation, indirect or consequential loss or damage, or
              any loss or damage whatsoever arising from loss of data or profits
              arising out of, or in connection with, the use of this website.
            </p>

            <h3 className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg">
              5. Governing Law
            </h3>
            <p>
              Your use of this website and any dispute arising out of such use
              of the website is subject to the laws of our country.
            </p>
          </div>
        )}

        {/* Privacy Policy Tab */}
        {activeTab === "privacy" && (
          <div className="prose dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-6 prose-h2:text-primary prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-800 dark:prose-h3:text-gray-200 prose-h4:text-lg prose-h4:font-medium prose-h4:mt-6 prose-h4:mb-3 prose-h4:text-gray-700 dark:prose-h4:text-gray-300 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4 prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-li:mb-2 prose-li:leading-relaxed prose-strong:text-gray-900 dark:prose-strong:text-white">
            <h2 className="border-b-2 border-primary pb-3">Privacy Policy</h2>

            <h3 className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg">
              1. Privacy Policy
            </h3>
            <p>
              PerkPal values your privacy and is committed to protecting your
              personal data. This Privacy Policy outlines how we collect, use,
              store, and disclose your information when you use our website and
              services.
            </p>

            <h3 className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg">
              2. Information We Collect
            </h3>
            <p>
              We collect personal data to provide and improve our services. The
              types of data we collect include:
            </p>

            <h4 className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded">
              a. Personal Information
            </h4>
            <ul>
              <li>
                Name, email address, and phone number (submitted via contact
                forms).
              </li>
              <li>
                Business details (company name, type of business, and service
                requirements).
              </li>
            </ul>

            <h4 className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded">
              b. Usage Data
            </h4>
            <p>
              We may also collect information on how the Service is accessed and
              used (&quot;Usage Data&quot;). This Usage Data may include
              information such as your computer&apos;s Internet Protocol address
              (e.g. IP address), browser type, browser version, the pages of our
              Service that you visit, the time and date of your visit, the time
              spent on those pages, unique device identifiers and other
              diagnostic data.
            </p>

            <h3 className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg">
              3. How We Use Your Information
            </h3>
            <p>We use the collected data for various purposes:</p>
            <ul>
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>
                To allow you to participate in interactive features of our
                Service when you choose to do so
              </li>
              <li>To provide customer support</li>
              <li>
                To gather analysis or valuable information so that we can
                improve our Service
              </li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>

            <h3 className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg">
              4. Data Security
            </h3>
            <p>
              The security of your data is important to us, but remember that no
              method of transmission over the Internet, or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your Personal Data, we cannot
              guarantee its absolute security.
            </p>

            <h3 className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg">
              5. Your Data Protection Rights
            </h3>
            <p>
              You have certain data protection rights. We aim to take reasonable
              steps to allow you to correct, amend, delete, or limit the use of
              your Personal Data. If you wish to be informed what Personal Data
              we hold about you and if you want it to be removed from our
              systems, please contact us.
            </p>

            <h3 className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg">
              6. Contact Information
            </h3>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at privacy@perkpal.com.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
