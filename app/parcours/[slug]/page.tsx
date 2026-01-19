import { notFound } from "next/navigation";
import type { Metadata } from "next";

import NodeLayout from "@/components/ressources/parcours/hub/noeud/NodeLayout";
import NodeHeader from "@/components/ressources/parcours/hub/noeud/NodeHeader";
import NodeBody from "@/components/ressources/parcours/hub/noeud/NodeBody";
import NodeChoices from "@/components/ressources/parcours/hub/noeud/NodeChoices";
import ParcoursBreadcrumb from "@/components/ressources/parcours/hub/noeud/ParcoursBreadcrumb";

import { getAllNodeSlugs, getNodeBySlug } from "@/lib/parcours/nodes";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  return getAllNodeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const node = getNodeBySlug(slug);

  if (!node) {
    return {
      title: "Page introuvable",
      robots: { index: false, follow: false },
    };
  }

  const canonical = node.canonical_url ?? `/parcours/${slug}`;

  return {
    title: node.title,
    description: node.description,
    keywords: node.keywords,
    alternates: { canonical },
    openGraph: {
      title: node.title,
      description: node.description,
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: node.title,
      description: node.description,
    },
  };
}

export default async function Page(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const node = getNodeBySlug(slug);
  if (!node) notFound();

  const choices = node.choices ?? [];

  return (
    <NodeLayout
      hero={
        <ParcoursBreadcrumb
          crumbs={[
            { label: "Parcours", href: "/parcours" },
            { label: node.title ?? slug },
          ]}
        />

      }
    >
      <NodeHeader
        title={node.title ?? "Parcours"}
        problem={node.problem}
        question={node.question}
        shock={node.shock}
        example={node.example}
      />

      <NodeBody content={node.content} />

      {choices.length > 0 && <NodeChoices choices={choices} />}
    </NodeLayout>
  );
}
