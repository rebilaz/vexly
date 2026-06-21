// app/outils/[slug]/page.tsx

import { notFound } from "next/navigation";

import {
  getToolPageBySlug,
  getToolSlugs,
} from "@/sanity/lib/outils";

import { ToolPageLayout } from "@/components/outils/layout/ToolPageLayout";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const tools = await getToolSlugs();

  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function Page({
  params,
}: PageProps) {
  const { slug } = await params;

  const tool = await getToolPageBySlug(slug);

  if (!tool) {
    notFound();
  }

  return <ToolPageLayout tool={tool} />;
}