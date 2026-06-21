import { NextResponse } from "next/server";

import { submitToIndexNow } from "@/lib/indexnow";
import { getToolSlugs } from "@/sanity/lib/outils";

export const runtime = "nodejs";

type IndexNowPayload = {
  all?: boolean;
  urls?: string[];
  url?: string;
  slug?: string;
  _type?: string;
};

export async function POST(request: Request) {
  const expectedSecret =
    process.env.INDEXNOW_WEBHOOK_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      {
        error:
          "La variable INDEXNOW_WEBHOOK_SECRET est manquante.",
      },
      { status: 500 },
    );
  }

  const authorization =
    request.headers.get("authorization");

  if (authorization !== `Bearer ${expectedSecret}`) {
    return NextResponse.json(
      { error: "Non autorisé." },
      { status: 401 },
    );
  }

  let payload: IndexNowPayload;

  try {
    payload = (await request.json()) as IndexNowPayload;
  } catch {
    return NextResponse.json(
      { error: "Corps JSON invalide." },
      { status: 400 },
    );
  }

  const urls: string[] = [];

  // Envoi initial de toutes les pages outils.
  if (payload.all === true) {
    const tools = await getToolSlugs();

    urls.push(
      ...tools.map(
        ({ slug }) =>
          `/outils/${encodeURIComponent(slug)}`,
      ),
    );
  }

  if (Array.isArray(payload.urls)) {
    urls.push(...payload.urls);
  }

  if (payload.url) {
    urls.push(payload.url);
  }

  // Utilisé automatiquement par le webhook Sanity.
  if (
    payload._type === "toolPage" &&
    payload.slug
  ) {
    urls.push(
      `/outils/${encodeURIComponent(payload.slug)}`,
    );
  }

  if (urls.length === 0) {
    return NextResponse.json(
      { error: "Aucune URL à envoyer." },
      { status: 400 },
    );
  }

  try {
    const result = await submitToIndexNow(urls);

    return NextResponse.json({
      success: true,
      count: result.urls.length,
      indexNowStatus: result.status,
      submittedUrls: result.urls,
    });
  } catch (error) {
    console.error("[IndexNow]", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erreur inconnue.",
      },
      { status: 502 },
    );
  }
}