import React from "react";
import { cache } from "react";

const CachedStructuredData = cache(() => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ウチカツ(UCIKATU)",
    description:
      "不動産の専門家が創った不動産SNS。不動産業者様は「無料」で物件掲載、一括査定、不動産相談が受けられる画期的なサービス。",
    url: "https://ucikatu.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ucikatu.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "ドリームプランニング",
      address: {
        "@type": "PostalAddress",
        addressLocality: "横浜",
        addressCountry: "JP",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD構造化データの出力に必要
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
});

export const StructuredData = CachedStructuredData;
