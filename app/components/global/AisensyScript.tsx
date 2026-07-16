"use client";

import { useRegion } from "@/app/context/RegionContext";
import Script from "next/script";

export default function AisensyScript() {
  const { selectedCountry } = useRegion();

  if (selectedCountry?.code.toLowerCase() !== "united arab emirates") {
    return null;
  }

  return (
    <Script
      src="https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js"
      id="aisensy-wa-widget"
      widget-id="aabjbj"
      strategy="afterInteractive"
    />
  );
}
