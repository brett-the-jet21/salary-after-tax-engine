"use client";
import { useEffect } from "react";

export default function AdSlot({ slot, style = {}, format = "auto" }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", minHeight: 90, ...style }}
      data-ad-client="ca-pub-8025748227928688"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
