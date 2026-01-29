"use client";

import { useEffect } from "react";

export default function AdSlot({
  client = "ca-pub-8025748227928688",
  slot = "5511951512",
  format = "auto",
  responsive = true,
}: {
  client?: string;
  slot?: string;
  format?: string;
  responsive?: boolean;
}) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", minHeight: 90 }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}
