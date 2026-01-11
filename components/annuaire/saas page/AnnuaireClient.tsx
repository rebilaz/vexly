// components/annuaire/saas page/AnnuaireClient.tsx
"use client";

import React from "react";
import type { Listing } from "@/lib/marketplace";

import SaasLaunchCard from "@/components/annuaire/saas page/SaaSLaunchCard";
import { SimilarCarousel } from "@/components/annuaire/saas page/SimilarCarousel";
import { TrafficChart } from "@/components/annuaire/saas page/TrafficChart";

type Point = { label: string; value: number; fullLabel?: string };

export function AnnuaireTrafficClient({ data }: { data: Point[] }) {
    return <TrafficChart data={data} />;
}

export function AnnuaireSimilarClient({ similar }: { similar: Listing[] }) {
    return <SimilarCarousel similar={similar} />;
}

export function AnnuaireSidebarClient({ listing }: { listing: Listing }) {
    return <SaasLaunchCard listing={listing} />;
}
