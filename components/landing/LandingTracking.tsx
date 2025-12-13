// components/landing/LandingTracking.tsx
"use client";

import { useEffect } from "react";
import { setupPageTracking } from "@/lib/tracking";

export default function LandingTracking() {
  useEffect(() => {
    setupPageTracking();
  }, []);
  return null;
}
