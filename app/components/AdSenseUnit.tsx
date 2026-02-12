"use client";

import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

type AdSenseUnitProps = {
  client: string;
  slot: string;
  style?: React.CSSProperties;
};

export default function AdSenseUnit({ client, slot, style }: AdSenseUnitProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div style={{ margin: "28px 0", textAlign: "center", ...(style || {}) }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
