"use client";

import React, { useEffect, useMemo, useState } from "react";

/**
 * Safe AdSlot:
 * - NEVER renders until after hydration
 * - Requires "publisher content" to exist on the page (prevents AdSense policy violation)
 * - Skips not-found / error-y screens by checking for main content anchor
 */
export default function AdSlot({ className = "", style = {}, requireContentId = "publisher-content" }) {
  const [ok, setOk] = useState(false);

  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    if (!isBrowser) return;

    // Require publisher content to exist (you should include an element with id="publisher-content"
    // near the top of your main article/content).
    const content = document.getElementById(requireContentId);

    // Also require at least some text in main
    const main = document.querySelector("main");
    const mainText = (main?.textContent || "").replace(/\s+/g, " ").trim();

    const hasPublisherContent = !!content;
    const hasRealText = mainText.length >= 200;

    // If either is missing, NO ADS.
    if (!hasPublisherContent || !hasRealText) {
      setOk(false);
      return;
    }

    setOk(true);

    // Push ads only when we're safe
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // swallow
    }
  }, [isBrowser, requireContentId]);

  if (!ok) return null;

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
